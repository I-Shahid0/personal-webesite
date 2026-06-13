# ibrahimshahid.dev

Personal website for Ibrahim Shahid — AI Engineer & Full-Stack Developer. Fast, minimal, and technical: dark mode, Geist, no heavy animations.

Built with Next.js 16 (App Router, Turbopack), React 19 with the React Compiler, Tailwind CSS v4, and Biome. Every page is statically prerendered.

## Structure

- `/` — hero, featured projects, experience snapshot
- `/projects` — all projects
- `/projects/[slug]` — deep dives: problem, architecture diagram, technical decisions, challenges, stack
- `/experience` — full work history and education

## Editing content

All content lives in three files — no page edits needed for copy changes:

- `src/lib/site.ts` — name, links (GitHub/LinkedIn URLs live here), email, positioning
- `src/lib/projects.ts` — project write-ups and architecture diagrams
- `src/lib/experience.ts` — roles and education

## Development

```bash
bun install
bun dev        # http://localhost:3000
bun run build  # production build
bun run lint   # biome check
```
