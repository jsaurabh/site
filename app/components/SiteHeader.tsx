const links = [
  ["Articles", "/articles"],
  ["About", "/about"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" target="_top" aria-label="Saurabh, home">
        <span className="wordmark-text">Saurabh</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a href={href} target="_top" key={href}>{label}</a>
        ))}
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a href={href} target="_top" key={href}>{label}</a>
          ))}
        </nav>
      </details>
    </header>
  );
}
