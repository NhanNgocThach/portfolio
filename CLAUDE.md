# Project: IMP Final Portfolio — Nhan Ngoc Thach

A single-page portfolio website for the INTO Suffolk Integrated Master's Program,
hosted on GitHub Pages at https://nhanngocthach.github.io/portfolio/.

## Stack

- Plain HTML / CSS / vanilla JS (no build step)
- Static — works on GitHub Pages out of the box
- All assets in `assets/`

## Folder layout

```
.
├── index.html              # the portfolio page
├── css/style.css           # all styles, including theme variables
├── js/main.js              # interactions: theme, language, expand/collapse, file probes
├── assets/                 # videos, PDFs, docx — see FILES.md for naming
├── CLAUDE.md               # this file (project rules)
├── README.md               # human-facing setup notes
├── FILES.md                # filename manifest
└── GITHUB_SETUP.md         # one-time publishing guide
```

## Design rules

1. **Dark mode is default.** Light mode is opt-in via the toggle. Both must be
   readable and visually balanced. Use CSS variables (`--bg`, `--ink`, `--surface`,
   `--accent`, etc.) — never hardcode colors in components.
2. **Introduction section shows the Elevator Pitch video** (1 min, AE065).
   The pitch replaces the separate intro video per the assignment brief.
3. **Four AE classes are presented as a 2×2 grid of cards** (AE051, AE052, AE061, AE065).
   Each card collapses by default; clicking the header expands the body to show
   that course's assignments. Only the inside of the body is scrollable if needed —
   the card itself grows.
4. **Hover and transition effects throughout.** Cards lift on hover, links and
   buttons have smooth color/transform transitions (use `transition: all .2s ease`).
   Don't go overboard — subtle, professional.
5. **Bilingual support: English (default) + Vietnamese.** A language toggle in
   the top nav switches UI labels and descriptive prose. Essay/document content
   stays in its original language.
6. **Pending content shows gracefully** — no broken players, no 404 links visible.
   The JS probes file existence and swaps in "coming soon" placeholders.

## Naming conventions

- All asset filenames: lowercase, kebab-case, prefixed by course code.
  Example: `ae061-research-paper.docx`, `ae051-informative-speech.mp4`.
- Reflection / hero / intro videos: `elevator-pitch.mp4`, `imp-reflection.mp4`,
  `ae051-video-reflection.mp4`.
- See `FILES.md` for the full manifest the JS probes against.

## Translation rules

When adding new UI text:

1. Add the English string in HTML using `<span data-i18n="key">English</span>`
   (or set `data-i18n` directly on the element).
2. Add the matching `key: "Vietnamese"` entry in the `i18n` object inside
   `js/main.js`.
3. Do NOT translate proper nouns (course codes like "AE051", program name "INTO Suffolk",
   the student's name).
4. Do NOT translate the contents of essays, documents, or video transcripts.

## Editing rules for future Claude sessions

- The user is a non-developer student. Prefer drop-in file solutions over asking
  them to edit HTML by hand.
- Always confirm the user's intent with a short multiple-choice question before
  making large structural changes.
- When the user adds files to `assets/`, read the filenames first; don't assume
  they followed the naming convention. Rename if needed (use `mv`, not `rm`).
- The user's mounted folder is `/sessions/{session}/mnt/Portfolio_University/`
  on this side; on their Windows machine it's
  `C:\Users\0n7n0\Documents\Claude\Projects\Portfolio_University`.
- Do not run `git` operations from the sandbox — the virtiofs mount blocks it.
  Walk the user through `git add . && git commit -m "..." && git push` instead.

## Deferred / in-progress items

| Item | Status | Filename |
|---|---|---|
| Resume | Being revised | `ae065-resume.pdf` |
| Informational Interview Request | Not yet drafted | `ae065-interview-request.pdf` |
| Final Presentation | Not yet drafted | `ae065-final-presentation.pdf` |
| LinkedIn URL | User to provide | (text in HTML) |
| Intended Major | User to provide | (text in HTML) |

## Live URL

https://nhanngocthach.github.io/portfolio/
