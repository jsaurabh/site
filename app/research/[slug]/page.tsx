import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { researchProjects } from "../../site-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return researchProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = researchProjects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.dek } : { title: "Research brief" };
}

export default async function ResearchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = researchProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const isActive = project.status === "In progress";

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <article className="report page-shell">
          <header className={`report-hero tone-${project.tone}`}>
            <div className="report-meta"><span>RESEARCH / {project.index}</span><span>{project.status} · {project.timeframe}</span></div>
            <h1>{project.title}</h1>
            <p>{project.dek}</p>
            <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="report-links">
              <span className="disabled-link">Code · forthcoming</span>
              <span className="disabled-link">Runs · forthcoming</span>
              <span className="disabled-link">Report PDF · forthcoming</span>
            </div>
          </header>
          <div className="report-layout">
            <aside className="report-toc">
              <span>ON THIS PAGE</span>
              <a href="#abstract">Abstract</a><a href="#question">Question</a><a href="#method">Method</a><a href="#experiments">Experiments</a><a href="#results">Results</a><a href="#limits">Limitations</a>
            </aside>
            <div className="report-body">
              <div className="report-notice"><strong>{isActive ? "Working report" : "Planned study"}</strong><p>{isActive ? "This page will accumulate evidence as the implementation and training runs progress." : "This is a publishing-structure preview. Results will replace placeholder sections only after the experiment is run."}</p></div>
              <section id="abstract"><span className="section-number">00</span><h2>Abstract</h2><p>This research brief defines the question, experimental controls, expected measurements, and reporting standard before results exist. The completed artifact will lead with the observed result and retain negative findings.</p></section>
              <section id="question"><span className="section-number">01</span><h2>Research question</h2><p>What can a controlled implementation reveal about the system that a library-level usage example cannot? The exact hypothesis and acceptance criteria will be frozen before the final run.</p><blockquote>Placeholder hypothesis: changing one bounded systems or modeling variable should produce a measurable behavior change larger than run-to-run variance.</blockquote></section>
              <section id="method"><span className="section-number">02</span><h2>Method</h2><div className="method-grid"><div><strong>Implementation</strong><p>Minimal first-principles code, tested against a trusted reference.</p></div><div><strong>Instrumentation</strong><p>Loss, throughput, memory, utilization, and behavior-level outputs.</p></div><div><strong>Controls</strong><p>Fixed seeds, frozen data splits, comparable budgets, and explicit baselines.</p></div><div><strong>Reproduction</strong><p>Tagged code, exact configurations, environment, and run manifests.</p></div></div></section>
              <section id="experiments"><span className="section-number">03</span><h2>Experiment matrix</h2><div className="experiment-table"><div><span>RUN</span><span>CHANGE</span><span>PRIMARY MEASURE</span><span>STATUS</span></div><div><span>A0</span><span>Reference baseline</span><span>Loss / throughput</span><span>Queued</span></div><div><span>A1</span><span>Primary intervention</span><span>Δ behavior</span><span>Queued</span></div><div><span>A2</span><span>Ablation</span><span>Effect size</span><span>Queued</span></div></div></section>
              <section id="results"><span className="section-number">04</span><h2>Results</h2><div className="results-placeholder"><span>RESULTS RESERVED</span><p>No synthetic success metrics. Charts, tables, and failure examples will appear here after the study runs.</p></div></section>
              <section id="limits"><span className="section-number">05</span><h2>Limitations and next experiments</h2><p>This section will distinguish what the evidence supports from what it merely suggests, document failure modes, and identify the smallest useful follow-up experiment.</p></section>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
