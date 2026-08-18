import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "About", description: "About Saurabh and the research direction behind this site." };

export default function AboutPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main className="about-main page-shell">
        <section className="about-intro">
          <h1>About</h1>
          <p className="about-lead">
            I&apos;m Saurabh, a software engineer with an applied machine-learning
            background. I&apos;m interested in the point where an elegant model
            meets an inconvenient machine.
          </p>
          <p>
            I&apos;m currently building deeper experience in language-model
            training, post-training, evaluation, and inference systems.
          </p>
        </section>

        <section className="about-section">
          <h2>What I&apos;m working toward</h2>
          <p>
            My goal is to become fluent across the full experimental path:
            implementing model primitives, profiling GPU workloads,
            distributing training, constructing data, shaping behavior,
            evaluating changes, and serving models efficiently.
          </p>
          <p>
            This site is a record of that work. I publish finished projects as
            technical articles with the implementation details, results, and
            failures left intact.
          </p>
        </section>

        <section className="about-section">
          <h2>How I work</h2>
          <p>
            I prefer moving from theory to a minimal implementation, then into
            a production codebase, followed by a controlled experiment. The
            useful result is often not simply that something improved, but
            knowing which constraint dominated and why.
          </p>
          <p>
            Earlier work spans applied machine learning and computer vision,
            including the TrashNet object-detection project for automated
            recycling.
          </p>
        </section>

        <section className="about-section about-contact">
          <h2>Elsewhere</h2>
          <p>
            <a href="https://github.com/jsaurabh">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/jsaurabh95">LinkedIn ↗</a>
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
