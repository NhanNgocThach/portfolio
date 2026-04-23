# File Naming Guide

Drop any of these files into the `assets/` folder with the **exact filename** shown.
The site detects them automatically — no HTML editing needed.
Just `git add . && git commit -m "..." && git push` and the site updates.

---

## Videos (`assets/`)

| What | Filename | Notes |
|---|---|---|
| Elevator Pitch (AE065, ~1 min) | `elevator-pitch.mp4` | Shown in Introduction AND AE065 sections |
| IMP Reflection (2 min) | `imp-reflection.mp4` | Shown in IMP Reflection section |
| AE051 Video Reflection | `ae051-video-reflection.mp4` | Optional — only if separate from the Informative Speech |

## Documents (`assets/`)

| Course | What | Filename |
|---|---|---|
| AE061 | Annotated Bibliography | `ae061-annotated-bibliography.pdf` |
| AE061 | Research Paper (with title page & references) | `ae061-research-paper.pdf` |
| AE065 | Resume | `ae065-resume.pdf` |
| AE065 | Cover Letter | `ae065-cover-letter.pdf` |
| AE065 | Informational Interview Request | `ae065-interview-request.pdf` |
| AE065 | Final Presentation | `ae065-final-presentation.pdf` |

> PDF is preferred for all documents (renders best in browsers).
> If you only have `.docx`, keep the same base name but change the extension
> AND let me know so I can update the link (or you can edit `index.html` to change `.pdf` → `.docx`).

---

## Text that still needs to be written in `index.html`

These can't be dropped as files — they need to be typed into the HTML.
Either edit them yourself or send me the text and I'll paste it in.

| Where | What | Current placeholder |
|---|---|---|
| Hero (top of page) | Intended Major at Suffolk | `[Intended Major]` |
| AE061 · Course Reflection | 150-word reflection | `[Draft a 150-word reflection…]` |
| IMP · Written Reflection | 500-word reflection (TNR, 12 pt, double-spaced) | `[Paste your 500-word…]` |
| AE065 · LinkedIn Profile | Profile URL | `https://www.linkedin.com/in/[your-handle]` |

---

## How the "auto-appear" works

- Every pending video uses a `<video>` tag that tries to load the expected file.
  A small JS probe hits the file with a HEAD request; if missing, the tag is
  swapped for a "coming soon" card. If present, the video just plays.
- Every pending document link has `data-doc-check` on it. The same JS probe
  flips its status badge between "Available" (green) and "Coming soon" (amber).

That's why filename matching is important — the probe looks for these exact paths.
