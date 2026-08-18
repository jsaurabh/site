import type { Metadata } from "next";
import { BrowserLabPreview } from "../components/BrowserLabPreview";
import { ScalingExplorer } from "../components/ScalingExplorer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "Lab", description: "Interactive models, visualizations, and systems tools." };

const labCards = [
  ["03", "Attention workbench", "Inspect heads, masks, attention entropy, and activation flow across a small decoder.", "Visualization", "Prototype"],
  ["04", "KV-cache calculator", "Estimate cache memory by model shape, precision, context length, and batch size.", "Calculator", "Planned"],
  ["05", "Serving load simulator", "Explore how request arrival, batching, and sequence length affect p50 and p99 latency.", "Simulation", "Planned"],
  ["06", "Tokenizer microscope", "Compare token fertility and segmentation across corpora and tokenizer families.", "Text tool", "Planned"],
];

export default function LabPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <header className="page-intro page-shell lab-intro">
          <span className="eyebrow">The lab / Interactive systems</span>
          <h1>Don&apos;t just read the result. Change the inputs.</h1>
          <p>Interfaces for model behavior, systems tradeoffs, and research results. The first two are functional design prototypes using illustrative data.</p>
        </header>
        <div className="page-shell lab-stack">
          <BrowserLabPreview full />
          <ScalingExplorer />
        </div>
        <section className="section page-shell">
          <div className="section-heading"><div><span className="eyebrow">On the bench</span><h2>Next interactive studies.</h2></div><p>Each tool will be paired with a research note explaining its assumptions and limitations.</p></div>
          <div className="lab-card-grid">
            {labCards.map(([id, title, dek, kind, status]) => (
              <article key={id}>
                <div><span>LAB {id}</span><span>{status}</span></div>
                <span className="lab-card-kind">{kind}</span>
                <h3>{title}</h3><p>{dek}</p>
                <a href="/lab" target="_top">Read design brief <span>↗</span></a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
