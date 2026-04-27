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
├── css/style.css           # all styles, dark + light theme via CSS variables
├── js/main.js              # interactions: theme, language, expand/collapse, file probes
├── assets/                 # videos, PDFs, docx — see FILES.md for naming
├── CLAUDE.md               # this file (project rules)
├── README.md               # human-facing setup notes
├── FILES.md                # filename manifest
└── GITHUB_SETUP.md         # one-time publishing guide
```

## Page structure — singleton tab layout

The site has TWO top-level views; the nav has tabs that swap between them.
Only one view is visible at a time.

1. **Hero** (always visible) — name, kicker, "Major: Master of Science in Business Analytics".
   Nav tabs: `Introduction` / `Classes`. Theme + language toggles on the right.
2. **Introduction view** (default tab)
   - Welcome paragraph
   - **Elevator Pitch** block — download link for `elevator-pitch.mp4`. No player.
   - **Reflection** block — TWO download links: `imp-reflection.docx` (written) +
     `imp-reflection.mp4` (video). No inline reflection text. No word-count or
     duration labels.
3. **Classes view**
   - 2×2 grid of four class cards. Click any card to expand its assignments.
   - SINGLETON: only one card open at a time; opening another auto-closes the first.
   - All four class cards show assignments only. No course-level reflections.
     - **AE051** — speeches, video reflection, group project
     - **AE052** — essays + memo
     - **AE061** — annotated bibliography + research paper
     - **AE065** — resume, cover letter, LinkedIn, interview project, final presentation

## Design rules

1. **Dark mode is the default.** Light mode is opt-in via the toggle. Use CSS variables
   (`--bg`, `--ink`, `--surface`, `--accent`, etc.) — never hardcode colors in components.
2. **Click-to-expand everything.** Top-level sections are collapsed by default; clicking
   the header expands the body. Class cards inside the Classes section behave the same way.
3. **No embedded video players anywhere.** Videos are presented as download links
   (`<a href download class="download-card">`) — never `<video>` tags.
4. **No labels showing time/word count.** Headings say "Reflection" not "Reflection (500 words)";
   "Elevator Pitch" not "Elevator Pitch (1 minute)"; etc.
5. **Elevator Pitch lives ONLY in its top-level section.** Never duplicate it inside AE065.
6. **Hover and transition effects throughout.** Cards lift on hover, links underline on
   hover, buttons nudge on press. Subtle, professional. Use `transition: all .25s ease`.
7. **Pending content shows gracefully** — no broken players, no 404 links visible.
   The JS probes file existence and updates status badges or swaps in placeholders.
8. **Bilingual support: English (default) + Vietnamese.** A language toggle in the top
   nav switches UI labels and descriptive prose. Essay/document content stays in its
   original language. Translations live inline in `js/main.js` (the `i18n` object).

## Naming conventions

- All asset filenames: lowercase, kebab-case, prefixed by course code.
  Example: `ae061-research-paper.docx`, `ae051-informative-speech.mp4`.
- Reflection / hero videos: `elevator-pitch.mp4`, `imp-reflection.mp4`,
  `ae051-video-reflection.mp4`.
- See `FILES.md` for the full manifest the JS probes against.

## Translation rules

When adding new UI text:

1. Add the English string in HTML using `<span data-i18n="key">English</span>`
   (or set `data-i18n` directly on the element).
2. Add the matching `key: "Vietnamese"` entry in the `i18n.vi` object inside `js/main.js`.
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
| Avatar photo | User to upload | `assets/avatar.jpg` (or `.png`) |

## Live URL

https://nhanngocthach.github.io/portfolio/
