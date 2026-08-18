import Link from "next/link";

const links = [
  ["Articles", "/articles"],
  ["Notes", "/notes"],
  ["Lab", "/lab"],
  ["About", "/about"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Saurabh, home">
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
