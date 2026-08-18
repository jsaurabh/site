import Link from "next/link";

const links = [
  ["Research", "/research"],
  ["Lab", "/lab"],
  ["Writing", "/writing"],
  ["Notes", "/notes"],
  ["About", "/about"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Saurabh, home">
        <span className="wordmark-mark">S</span>
        <span className="wordmark-text">Saurabh</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
