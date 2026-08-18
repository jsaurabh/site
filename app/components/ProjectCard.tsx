import type { ResearchProject } from "../site-data";

export function ProjectCard({ project, compact = false }: { project: ResearchProject; compact?: boolean }) {
  return (
    <article className={`project-card tone-${project.tone} ${compact ? "project-card-compact" : ""}`}>
      <div className="project-card-head">
        <span className="project-index">{project.index}</span>
        <span className="status-pill">{project.status}</span>
      </div>
      <div className="project-visual" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <p className="project-time">{project.timeframe}</p>
      <h3><a href={`/research/${project.slug}`} target="_top">{project.title}</a></h3>
      <p>{project.dek}</p>
      <div className="tag-row">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="project-metric">
        <strong>{project.metric}</strong>
        <span>{project.metricLabel}</span>
      </div>
      <a className="text-link" href={`/research/${project.slug}`} target="_top">Open research brief <span>↗</span></a>
    </article>
  );
}
