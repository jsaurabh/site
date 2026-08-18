import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { writing } from "../site-data";

export const metadata: Metadata = {
  title: "Articles",
  description: "Technical articles and selected earlier work.",
};

export default function ArticlesPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <header className="page-intro page-shell articles-intro">
          <span className="eyebrow">Articles</span>
          <h1>Technical writing and project notes.</h1>
        </header>

        <section className="section page-shell articles-index">
          <div className="writing-list writing-list-page">
            {writing.map((item, index) => (
              <article key={item.title}>
                <div><span>{item.date}</span><span>{item.type}</span></div>
                <span className="writing-number">0{index + 1}</span>
                <h2>{item.title}</h2>
                <p>{item.dek}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
