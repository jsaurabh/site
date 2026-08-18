import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { researchProjects, writing } from "../site-data";

export const metadata: Metadata = {
  title: "Articles",
  description: "Research reports, technical articles, and selected earlier work.",
};

export default function ArticlesPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <header className="page-intro page-shell">
          <span className="eyebrow">Articles</span>
          <h1>The work, in detail.</h1>
          <p>
            Research reports, technical explanations, and selected earlier
            projects. Planned work is labeled clearly until results exist.
          </p>
        </header>

        <section className="section page-shell research-index">
          <div className="archive-key"><span>INDEX</span><span>STATUS / WINDOW</span><span>RESEARCH BRIEF</span></div>
          <div className="project-grid research-grid">
            {researchProjects.map((project) => <ProjectCard project={project} compact key={project.slug} />)}
          </div>
        </section>

        <section className="section page-shell writing-section">
          <div className="section-heading compact-heading">
            <div><span className="eyebrow">Earlier work</span><h2>Case studies and notebooks.</h2></div>
          </div>
          <div className="writing-list writing-list-page">
            {writing.map((item, index) => (
              <article key={item.title}>
                <div><span>{item.date}</span><span>{item.type}</span></div>
                <span className="writing-number">0{index + 1}</span>
                <h2>{item.title}</h2>
                <p>{item.dek}</p>
                <span className="row-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
