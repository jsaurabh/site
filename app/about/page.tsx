import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "About", description: "About Saurabh and the research direction behind this site." };

export default function AboutPage() {
  return <div id="top"><SiteHeader /><main>
    <header className="about-hero page-shell"><div><span className="eyebrow">About / Working position</span><h1>I like the point where an elegant model meets an inconvenient machine.</h1></div><aside><span>FOCUS</span><p>Language-model training</p><p>Post-training & evaluation</p><p>Inference systems</p></aside></header>
    <section className="about-body page-shell"><div className="about-lead"><span className="big-initial">S</span><p>I&apos;m Saurabh, a software engineer with an applied machine-learning background, now deliberately building deeper experience in language-model training and systems research.</p></div><div className="about-columns"><div><h2>The transition</h2><p>The goal is not to collect another layer of framework familiarity. It is to become fluent in the entire experimental path: implementing model primitives, profiling GPU workloads, distributing training, constructing data, post-training behavior, evaluating changes, and serving models efficiently.</p><p>This site is the public record of that work. Finished projects are presented as research artifacts; unresolved ideas remain visibly labeled notes or prototypes.</p></div><div><h2>How I work</h2><p>I prefer the progression from theory to a minimal implementation, then into a production codebase, followed by a controlled experiment. The useful result is often not that something improved—it is knowing which constraint dominated and why.</p><p>Earlier work spans applied ML and computer vision, including the TrashNet object-detection project for automated recycling.</p></div></div></section>
    <section className="contact-band"><div className="page-shell"><div><span className="eyebrow light">Open channel</span><h2>Interested in model systems, evals, or a strange failure mode?</h2></div><div><a href="https://github.com/jsaurabh">GitHub ↗</a><a href="https://www.linkedin.com/in/jsaurabh95">LinkedIn ↗</a></div></div></section>
  </main><SiteFooter /></div>;
}
