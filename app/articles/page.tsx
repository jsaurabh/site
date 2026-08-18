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
          <h2>Hello and welcome to my blog. You'll find all my posts and links to projects below. Happy reading!.</h2>
        </header>

        <section className="section page-shell articles-index">
          <div className="writing-list writing-list-page">
            {writing.map((item, index) => (
              <article key={item.title}>
                <div><span>{item.date}</span><span>{item.type}</span></div>
                <span className="writing-number">0{index + 1}</span>
                <h2><a href={`/articles/${item.slug}`} target="_top">{item.title}</a></h2>
                <p>{item.dek}</p>
                <span className="row-arrow">→</span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
