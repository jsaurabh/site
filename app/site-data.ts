export type ResearchProject = {
  index: string;
  slug: string;
  title: string;
  dek: string;
  status: string;
  timeframe: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  tone: "acid" | "blue" | "coral" | "ink";
  featured?: boolean;
};

export const researchProjects: ResearchProject[] = [
  {
    index: "01",
    slug: "transformer-from-scratch",
    title: "A small language model, built from first principles",
    dek: "Tokenizer, modern decoder architecture, optimizer, training loop, and the instrumentation needed to understand when training goes wrong.",
    status: "In progress",
    timeframe: "Weeks 01–04",
    tags: ["PyTorch", "Pretraining", "Optimization"],
    metric: "50–150M",
    metricLabel: "target parameters",
    tone: "acid",
    featured: true,
  },
  {
    index: "02",
    slug: "efficient-distributed-training",
    title: "From one GPU to a distributed training stack",
    dek: "Profiling, Triton kernels, DDP, FSDP2, and tensor parallelism—measured as a systems problem rather than a configuration exercise.",
    status: "Planned",
    timeframe: "Weeks 05–09",
    tags: ["Triton", "FSDP2", "GPU systems"],
    metric: "1 → 8",
    metricLabel: "GPU scaling study",
    tone: "blue",
    featured: true,
  },
  {
    index: "03",
    slug: "small-model-scaling-and-data",
    title: "Scaling laws and data quality in small language models",
    dek: "A controlled family of training runs used to fit a scaling curve, predict a held-out run, and isolate what changes when the corpus changes.",
    status: "Planned",
    timeframe: "Weeks 10–12",
    tags: ["Scaling laws", "Data", "Ablations"],
    metric: "4 sizes",
    metricLabel: "controlled model family",
    tone: "coral",
    featured: true,
  },
  {
    index: "04",
    slug: "evaluation-harness",
    title: "Evaluation infrastructure that explains score movement",
    dek: "Task schemas, deterministic and model-based graders, uncertainty estimates, prompt sensitivity, and a behavior-level failure taxonomy.",
    status: "Planned",
    timeframe: "Weeks 13–14",
    tags: ["Evaluation", "Statistics", "Reliability"],
    metric: "CI + taxonomy",
    metricLabel: "beyond aggregate scores",
    tone: "ink",
  },
  {
    index: "05",
    slug: "post-training-reasoning-models",
    title: "From base model to SFT, DPO, and verifiable rewards",
    dek: "A before-and-after study of post-training objectives, reward design, reasoning behavior, KL drift, and reward hacking.",
    status: "Planned",
    timeframe: "Weeks 15–18",
    tags: ["SFT", "DPO", "RLVR"],
    metric: "Base → RL",
    metricLabel: "full behavior comparison",
    tone: "acid",
  },
  {
    index: "06",
    slug: "llm-serving-benchmarks",
    title: "What governs latency and throughput in LLM serving?",
    dek: "KV-cache sizing, prefill versus decode, continuous batching, prefix caching, quantization, and the shape of the serving tradeoff frontier.",
    status: "Planned",
    timeframe: "Weeks 19–20",
    tags: ["vLLM", "Inference", "Benchmarking"],
    metric: "p50 / p99",
    metricLabel: "latency under load",
    tone: "blue",
  },
  {
    index: "07",
    slug: "tool-use-rlvr",
    title: "Tool-using language models with verifiable rewards",
    dek: "A capstone environment where models search, inspect, calculate, retrieve, and answer—then learn from outcomes that can be automatically checked.",
    status: "Capstone",
    timeframe: "Weeks 21–24",
    tags: ["Agents", "RLVR", "Tool use"],
    metric: "7 ablations",
    metricLabel: "planned research matrix",
    tone: "coral",
  },
];

export const writing = [
  {
    date: "Jun 23, 2020",
    type: "Case study",
    title: "TrashNet: smart trash detection for better recycling",
    dek: "Building and deploying EfficientDet and SSD MobileNet models for an applied object-detection system.",
  },
  {
    date: "Apr 29, 2020",
    type: "Notebook",
    title: "A content-filtering recommender from first principles",
    dek: "Data wrangling, feature construction, and similarity-based recommendations on TMDB5000.",
  },
  {
    date: "Forthcoming",
    type: "Research note",
    title: "What broken language-model training looks like",
    dek: "A visual field guide to unstable learning rates, bad initialization, and misleadingly healthy loss curves.",
  },
];

export const notes = [
  { id: "N-014", topic: "Optimization", title: "Why AdamW is not Adam plus L2 regularization", read: "7 min", status: "Draft" },
  { id: "N-013", topic: "Architecture", title: "RMSNorm, residual streams, and where scale lives", read: "5 min", status: "Draft" },
  { id: "N-012", topic: "Tokenization", title: "Token fertility is a data-distribution measurement", read: "9 min", status: "Planned" },
  { id: "N-011", topic: "Systems", title: "A practical memory ledger for decoder-only training", read: "11 min", status: "Planned" },
  { id: "N-010", topic: "Reading", title: "Attention Is All You Need, reread as a systems paper", read: "8 min", status: "Planned" },
];
