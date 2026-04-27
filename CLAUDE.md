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

## Page structure — sidebar + singleton view layout

The site uses a fixed left sidebar with icon nav. Clicking a sidebar icon swaps
which view-card is shown in the center column. Only one view is visible at a time.

### Sidebar (fixed, dark, 72px wide)
Top → bottom: theme toggle (sun/moon), Introduction, Elevator Pitch, Reflection,
Classes, language toggle (EN/VI). Tooltips appear on hover. On mobile (≤640px)
the sidebar collapses to a top bar.

### Center column — profile card on top + view card below
The profile card is ALWAYS visible: avatar (circle, accent ring, 120px) + name
"Nhan Ngoc Thach" + role "MSBA Student @ Suffolk University" + social icons
(email, LinkedIn, GitHub).

Below the profile card sits exactly ONE view card at a time:
1. **Introduction view** (default) — welcome paragraph + a "Major: Master of
   Science in Business Analytics" line.
2. **Elevator Pitch view** — inline `<video controls>` player for `elevator-pitch.mp4`
   (small frame, native fullscreen + download via the browser's controls menu).
3. **Reflection view** — TWO download links: `imp-reflection.docx` (written)
   + `imp-reflection.mp4` (video). No inline reflection text.
4. **Classes view** — single column of four class cards. Click a card to
   expand its assignments. SINGLETON: only one card open at a time.
   - **AE051** — speeches, video reflection, group project
   - **AE052** — essays + memo
   - **AE061** — annotated bibliography + research paper
   - **AE065** — resume (PDF), cover letter (DOCX), LinkedIn, interview project (PDF), final presentation (PPTX)

   Class cards are independent — multiple can be open at the same time. Opening one
   does NOT close the others.

## Design rules

1. **Dark mode is the default.** Light mode is opt-in via the toggle. Use CSS variables
   (`--bg`, `--ink`, `--surface`, `--accent`, etc.) — never hardcode colors in components.
2. **Click-to-expand everything.** Top-level sections are collapsed by default; clicking
   the header expands the body. Class cards inside the Classes section behave the same way.
3. **Videos are download links — with one exception.** The Reflection view's
   `imp-reflection.mp4` and AE051's `ae051-video-reflection.mp4` are presented as
   download links (`<a href download class="download-link">`), never `<video>` tags.
   The Elevator Pitch view IS allowed to use an inline `<video controls>` player
   (rendered inside `.video-frame`) so the user can preview it directly. The native
   browser controls already give fullscreen + download, so no custom UI is needed.
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
