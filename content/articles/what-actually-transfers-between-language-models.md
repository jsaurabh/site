What if one language model could read a long document, hand its internal memory to a different model, and let the second model continue without reading the document again?

That is the promise behind cross-model KV-cache transfer. It could let a large model perform an expensive prefill once and pass the result to a smaller or more specialized model. It could also become a communication primitive for systems made of several models. But it raises a deceptively simple question:

> When the receiving model answers correctly, did useful information actually cross the model boundary?

I spent a series of Colab experiments trying to answer that question. The short version is that text-free communication across model families is possible in a controlled setting—but matching cache tensors is a poor way to teach it, and the behavior-aware alternative still hits a sharp capacity wall.

## Starting with SwaT

[SwaT](https://arxiv.org/abs/2610.15095) learns to translate the KV cache of one language model into the cache format of another. I used its released Granite-3.3-8B-Instruct → SmolLM3-3B configuration and reproduced the training pipeline at a smaller context and Stage-2 budget.

There is an important detail in the released architecture. The mapper receives two things:

1. the sender model's KV cache; and
2. embeddings produced from the receiving model's tokenization of the original text.

The second channel is useful, but it means the handoff is not cache-only. The receiver still gets a representation derived directly from the source text. Strong downstream performance could come from the sender cache, the receiver-native text scaffold, or an interaction between them.

So before building anything new, I ran causal interventions.

For each held-out document, I evaluated three versions of each input channel:

- **Matched:** state from the correct document.
- **Deranged:** state from a different document.
- **Zero:** the channel removed entirely.

Derangement is the important control. A zero tensor is obviously out of distribution; the model may fail simply because an expected signal disappeared. A deranged cache still has realistic statistics. It is just about the wrong document.

After reduced Stage-2 training, deranging sender memory increased PG19 continuation NLL by 0.243, with a 95% paired-bootstrap interval of 0.179 to 0.307. Deranging the receiver text scaffold changed NLL by only 0.008, with an interval spanning zero. The sender cache therefore carried example-specific information on this task.

But that was not the whole story.

## Better continuation was not reliable memory

The same checkpoint performed well on average continuation likelihood, yet retrieved **0 of 64** random six-digit codes from held-out registries. Native receiver prefill retrieved 63 of 64.

This distinction matters. A learned prefix can make ordinary prose more likely without faithfully representing the facts in a particular document. It can learn something like “what a useful continuation context usually looks like” while losing the bindings needed to answer _which code belonged to which identifier_.

That result changed the project. Instead of asking only whether a translated cache improved NLL, I wanted to know whether a mapper could communicate document identity with no text-derived side channel at all.

## Removing the text scaffold

I built a smaller cache-only translator with 64 learned latent slots. The slots cross-attend directly to the flattened Granite KV state and are projected into a fixed-length SmolLM KV prefix. At inference time, the mapper receives:

- sender keys and values;
- sender positions, normalized to a continuous grid; and
- nothing derived from the original text.

It does not receive receiver token IDs, receiver embeddings, source tokens, or tokenizer alignment.

The first objective combined continuation cross-entropy with teacher-student KL divergence. It produced good-looking PG19 NLL, but matched and deranged sender caches performed almost identically. The mapper had learned a generic prefix.

An answer-weighted contrastive objective did not fix this. Zeroing the sender became harmful, but replacing it with another example's cache was not. The network had learned that a sender signal should be present, not that its content should matter.

That is why every later experiment kept the deranged-cache control. A matched-versus-zero gap is not enough to establish communication.

## A narrow proof that cache-only transfer can work

I simplified the task to find out whether the architecture was fundamentally dead.

Each document contained one identifier paired with one of ten number words, from `zero` to `nine`. The receiver had to return the correct word. Chance accuracy was 10%, and native prefill was nearly perfect. I trained with matched and pairwise-deranged sender caches, explicitly requiring the correct cache to produce a lower answer loss.

Across three training seeds, matched exact accuracy averaged **89.5%**, while deranged accuracy averaged **13.9%**. Individual matched runs reached 96.9%, 96.1%, and 75.4%.

This was the cleanest positive result in the project. The same mapper, receiver, query format, and answer set failed when I swapped in a realistic cache from the adjacent example. The source document was not available through any other channel. Information had crossed from Granite state into a usable SmolLM cache.

It was also a very small channel.

With a separate capacity checkpoint, accuracy fell from 93.8% with one fact to 52.7% with two facts and 24.2% with four. The original six-digit task remained at 0 of 64.

## The tempting idea that failed

The obvious next move was to give the mapper a denser target. Instead of training only on answers, I extracted native receiver KV tensors, compressed them to a fixed slot budget, and asked the mapper to reproduce them.

First I checked whether the target itself retained the answer. A right-aligned 128-slot native receiver cache preserved 96.9% exact accuracy on the six-digit task and 40.6% on four-fact retrieval. That made it a plausible teacher.

Training appeared to work if I looked only at tensor metrics:

- normalized KV MSE fell from 1.783 to 0.685;
- flattened KV cosine similarity rose from 0.182 to 0.864.

Behavior moved in the opposite direction. Four-fact exact accuracy collapsed to 0%. Six-digit accuracy stayed at 0 of 64. PG19 NLL worsened from 3.666 to 7.004, and matched and deranged caches were nearly indistinguishable.

The mapper had become much better at reproducing a large tensor and worse at preserving what the receiver needed from it.

That is the central negative result: **aggregate tensor similarity is not a reliable objective for cross-family state transfer.** Most coordinates in a KV cache are not equally relevant to a particular downstream computation. A low global error can hide destructive mistakes in the subspace that controls the answer.

## Training on receiver behavior instead

The next experiment supervised states closer to the behavior I cared about. I expanded the validated mapper to 128 slots and trained it using:

- cross-entropy on the teacher-forced answer;
- KL divergence from native receiver answer logits;
- hidden-state alignment at the receiver's query position, sampled from four depths; and
- a margin requiring the matched sender cache to beat a deranged cache.

Every fourth update retained the PG19 objective to avoid destroying ordinary continuation behavior. The source document and native receiver states were available only to the teacher during training; inference remained cache-only.

Before running, I set two advancement gates:

1. at least a 20-point matched-minus-deranged accuracy gap on four-fact retrieval; and
2. nonzero exact accuracy on the 64-example six-digit task.

The result was encouraging, but not a pass.

![Matched and deranged exact accuracy during behavior-aware cache training](/swat-behavior-aware-results.svg)

| Checkpoint | One fact: matched / deranged | Four facts: matched / deranged | Six-digit exact | PG19 NLL |
|---:|---:|---:|---:|---:|
| 0 | 47.7% / 15.6% | 7.0% / 3.9% | 0/64 | 3.668 |
| 500 | 64.8% / 13.3% | **23.4% / 7.8%** | 0/64 | 3.705 |
| 1,000 | **85.2% / 17.2%** | 21.1% / 10.2% | 0/64 | 3.685 |

The best four-fact checkpoint was step 500. Its paired matched-minus-deranged gap was **15.6 percentage points**, with a 95% bootstrap interval from 7.0 to 24.2 points. Answer NLL also favored the correct sender cache. Unlike dense KV regression, the behavior-aware objective preserved PG19 performance.

Still, 15.6 points was below the 20-point gate, and six-digit retrieval remained exactly zero. By step 1,000, one-fact accuracy continued improving while the four-fact causal gap narrowed. Optimizing the easy channel longer did not solve the binding problem.

## What I take away

I think these experiments support four claims, in decreasing order of confidence.

**First, cross-family cache-only communication is possible.** The one-fact experiment survived the critical deranged-cache test across three seeds. The receiver extracted information that could only have arrived through the sender state.

**Second, tensor fidelity and behavioral fidelity are different objectives.** The dense mapper dramatically improved MSE and cosine similarity while destroying retrieval. “The caches look similar” is not evidence that they compute the same thing.

**Third, behavior-aware supervision is the better direction.** Matching query states and answer logits recovered a causal multi-fact signal that dense regression lost, and it did so without sacrificing continuation behavior.

**Fourth, the current method is not a general document cache.** It works as a bounded associative communication channel. It does not yet preserve high-capacity bindings, arbitrary codes, or enough document detail to replace receiver prefill.

The next experiment I would run is more local than hidden-state matching and more structured than global KV loss: supervise attention outputs across the full query-and-answer trajectory, use variable-length or masked cache slots, and construct tasks that isolate binding capacity from language modeling. I would also replicate the best behavior-aware configuration across seeds before treating any improvement as stable.

## Reproducibility

All reported numbers come from completed runs on an NVIDIA RTX PRO 6000 Blackwell in Google Colab; no T4 was used. The repository includes the training code, deterministic evaluation sets, per-example matched/deranged/zero outputs, bootstrap analysis, notebook, and paper draft:

- [Code and raw measurements](https://github.com/jsaurabh/swat-cache-only)
- [SwaT paper](https://arxiv.org/abs/2610.15095)
- [Official SwaT implementation](https://github.com/Ar-Kareem/SwaT)

The broad result is negative, but useful: learning to translate internal state is not mainly a matter of making two large tensors numerically alike. The training signal has to follow the computation that the receiver will actually perform.
