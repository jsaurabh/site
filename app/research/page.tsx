import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { researchProjects } from "../site-data";

export const metadata: Metadata = { title: "Research", description: "A portfolio of language-model training, evaluation, post-training, and inference research." };

export default function ResearchPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <header className="page-intro page-shell">
          <span className="eyebrow">Research archive / 2026</span>
          <h1>Questions, implementations, and the evidence between them.</h1>
          <p>These artifacts follow a six-month transition from applied LLM engineering toward model research. Status labels are explicit: planned work is not presented as a completed result.</p>
          <div className="intro-ledger"><span>07 studies</span><span>03 systems areas</span><span>01 capstone</span></div>
        </header>
        <section className="section page-shell research-index">
          <div className="archive-key"><span>INDEX</span><span>STATUS / WINDOW</span><span>RESEARCH BRIEF</span></div>
          <div className="project-grid research-grid">
            {researchProjects.map((project) => <ProjectCard project={project} compact key={project.slug} />)}
          </div>
        </section>
        <section className="report-standard page-shell">
          <span className="eyebrow">Publishing standard</span>
          <h2>Every finished report earns its place.</h2>
          <div>
            <p><strong>Question</strong> A falsifiable claim or a well-bounded systems investigation.</p>
            <p><strong>Evidence</strong> Controls, uncertainty, quantitative measurements, and behavioral examples.</p>
            <p><strong>Reproduction</strong> Code, tagged configurations, environments, and enough detail to rerun the result.</p>
            <p><strong>Limits</strong> Failed experiments, boundary conditions, and what the evidence does not establish.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
