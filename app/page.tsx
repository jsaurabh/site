import Link from "next/link";
import { BrowserLabPreview } from "./components/BrowserLabPreview";
import { ProjectCard } from "./components/ProjectCard";
import { ResearchConsole } from "./components/ResearchConsole";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { researchProjects, writing } from "./site-data";

export default function Home() {
  const featured = researchProjects.filter((project) => project.featured);

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <section className="hero page-shell">
          <div className="hero-copy">
            <span className="eyebrow">Independent research engineering · 2026</span>
            <h1>I build language-model systems—and study where they break.</h1>
            <p className="hero-dek">Training, post-training, evaluation, and inference explored through implementation, controlled experiments, and clear technical writing.</p>
            <div className="hero-actions">
              <Link className="button button-dark" href="/research">Explore research <span>↗</span></Link>
              <Link className="button button-quiet" href="/lab">Enter the lab <span>→</span></Link>
            </div>
          </div>
          <aside className="now-card">
            <div className="now-card-head"><span>NOW / 01</span><span className="pulse">active</span></div>
            <p className="now-label">Current investigation</p>
            <h2>Building a decoder-only Transformer from first principles.</h2>
            <div className="now-progress"><span style={{ width: "28%" }} /></div>
            <dl>
              <div><dt>Course spine</dt><dd>Stanford CS336</dd></div>
              <div><dt>Phase</dt><dd>Model foundations</dd></div>
              <div><dt>Next artifact</dt><dd>Technical report</dd></div>
            </dl>
            <Link href="/research/transformer-from-scratch">Follow the work <span>↗</span></Link>
          </aside>
        </section>

        <section className="console-wrap page-shell">
          <ResearchConsole />
        </section>

        <section className="section page-shell" id="featured">
          <div className="section-heading">
            <div><span className="eyebrow">Selected research</span><h2>Work designed to produce evidence.</h2></div>
            <p>Each project starts with a question and ends with code, measurements, failure analysis, and a reproducible report.</p>
          </div>
          <div className="project-grid featured-grid">
            {featured.map((project) => <ProjectCard project={project} key={project.slug} />)}
          </div>
          <div className="section-cta"><Link className="text-link large" href="/research">View the complete research roadmap <span>↗</span></Link></div>
        </section>

        <section className="focus-band">
          <div className="page-shell focus-grid">
            <div>
              <span className="eyebrow light">Research position</span>
              <h2>Implementation is the method. Measurement is the argument.</h2>
            </div>
            <div className="principles">
              <article><span>01</span><h3>Build the primitive</h3><p>Understand an idea deeply enough to implement its essential mechanism.</p></article>
              <article><span>02</span><h3>Read production code</h3><p>Trace the path from the clean abstraction to the constraints of a real system.</p></article>
              <article><span>03</span><h3>Run the control</h3><p>Change one thing, quantify uncertainty, and inspect behavior—not only a score.</p></article>
            </div>
          </div>
        </section>

        <section className="section page-shell">
          <div className="section-heading">
            <div><span className="eyebrow">Interactive lab</span><h2>Research you can operate.</h2></div>
            <p>Small tools turn static findings into explorable systems: models, visualizations, calculators, and benchmark simulators.</p>
          </div>
          <BrowserLabPreview />
          <div className="section-cta"><Link className="text-link large" href="/lab">See all lab prototypes <span>↗</span></Link></div>
        </section>

        <section className="section writing-section page-shell">
          <div className="section-heading compact-heading">
            <div><span className="eyebrow">Writing</span><h2>Notes from the workbench.</h2></div>
            <Link className="text-link" href="/writing">All writing <span>↗</span></Link>
          </div>
          <div className="writing-list">
            {writing.map((item) => (
              <article key={item.title}>
                <div><span>{item.date}</span><span>{item.type}</span></div>
                <h3><Link href="/writing">{item.title}</Link></h3>
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
