import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { notes } from "../site-data";

export const metadata: Metadata = { title: "Notes", description: "Short technical investigations, paper notes, and implementation observations." };

export default function NotesPage() {
  return <div id="top"><SiteHeader /><main>
    <header className="page-intro page-shell"><span className="eyebrow">Notes / Work in public</span><h1>Smaller findings that do not need to become essays.</h1><p>Implementation details, paper rereads, experiment observations, and compact explanations. Draft and planned labels are intentionally visible.</p></header>
    <section className="section page-shell notes-index"><div className="notes-header"><span>ID / TOPIC</span><span>NOTE</span><span>READ / STATUS</span></div>{notes.map((note) => <article key={note.id}><div><span>{note.id}</span><span>{note.topic}</span></div><h2>{note.title}</h2><div><span>{note.read}</span><span className="status-pill">{note.status}</span></div></article>)}</section>
  </main><SiteFooter /></div>;
}
