import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { researchProjects } from "./site-data";

export default function Home() {
  const recent = researchProjects.slice(0, 3);

  return (
    <div id="top" className="home-page">
      <SiteHeader />
      <main className="home-main page-shell">
        <section className="home-intro">
          <h1>Saurabh</h1>
          <p className="home-lead">
            I’m a software engineer interested in language-model systems: how
            they are trained, evaluated, and made useful.
          </p>
          <p>
            This is where I publish experiments, technical articles, and notes
            from the work. I’m currently building a small Transformer from
            first principles.
          </p>
        </section>

        <section className="home-articles" aria-labelledby="home-articles-title">
          <header>
            <h2 id="home-articles-title">Articles</h2>
            <Link href="/articles">View all</Link>
          </header>
          <ol>
            {recent.map((article) => (
              <li key={article.slug}>
                <Link href={`/research/${article.slug}`}>
                  <span>{article.title}</span>
                  <small>{article.status}</small>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
