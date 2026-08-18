# Saurabh — Research Engineering

A personal research portfolio for language-model systems work. The site combines
long-form project reports and technical writing in a single editorial
experience.

## Routes

- `/` — introduction and featured work
- `/research` — portfolio archive and 24-week research roadmap
- `/research/[slug]` — repeatable technical-report pages
- `/writing` — essays and technical explainers
- `/about` — background and working principles
- `/resume` — printable résumé preview

## Hosting

The intended production path is GitHub → Cloudflare Pages → `jsaurabh.dev`.
Cloudflare Pages is the default because it is free for this personal site and
supports automatic deployments from GitHub. If the site later needs server-side
behavior that Pages cannot handle cleanly, it can migrate to Cloudflare Workers
Builds without changing the GitHub source of truth. The site should remain
independent of OpenAI-hosted deployment services.

## Development

```bash
npm ci
npm run dev
npm run build
npm test
```
