import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { articles } from "../../article-data";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article
    ? { title: article.title, description: article.dek }
    : { title: "Article" };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <div id="top">
      <SiteHeader />
      <main>
        <article className="legacy-article page-shell">
          <header className="article-header">
            <Link className="article-back" href="/articles">← Articles</Link>
            <p className="article-meta">{article.date} · {article.type}</p>
            <h1>{article.title}</h1>
            <p className="article-dek">{article.dek}</p>
          </header>
          <div className="article-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {article.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
