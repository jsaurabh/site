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
            I&apos;m an applied machine learning engineer focusing on expressive, stable and efficient agents, and everything needed to make them long running and reliable in production.
          </p>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
