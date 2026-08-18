import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="footer-note">© 2026 Saurabh</p>
      <nav className="footer-links" aria-label="Footer navigation">
        <a href="https://github.com/jsaurabh">GitHub</a>
        <a href="https://www.linkedin.com/in/jsaurabh95">LinkedIn</a>
        <Link href="/resume">Résumé</Link>
      </nav>
    </footer>
  );
}
