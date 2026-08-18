import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { writing } from "../site-data";

export const metadata: Metadata = { title: "Writing", description: "Long-form technical writing and selected earlier work." };

export default function WritingPage() {
  return (
    <div id="top"><SiteHeader /><main>
      <header className="page-intro page-shell"><span className="eyebrow">Writing / Essays and case studies</span><h1>Long-form arguments from technical work.</h1><p>Finished essays, research explanations, and selected earlier projects. Working observations live separately in Notes.</p></header>
      <section className="section page-shell"><div className="writing-list writing-list-page">{writing.map((item, index) => <article key={item.title}><div><span>{item.date}</span><span>{item.type}</span></div><span className="writing-number">0{index + 1}</span><h2>{item.title}</h2><p>{item.dek}</p><span className="row-arrow">↗</span></article>)}</div></section>
      <section className="archive-note page-shell"><span className="eyebrow">Migration note</span><p>The strongest material from the previous site will be edited and preserved here. Existing public URLs can redirect to their new canonical homes.</p></section>
    </main><SiteFooter /></div>
  );
}
