# Publishing this portfolio to GitHub Pages

Follow these steps once, from your Windows computer.
Open **Git Bash** (comes with Git for Windows) or **PowerShell** and run each block.

---

## Step 0 · Clean up the broken `.git` folder

A partial `.git` folder exists from an earlier attempt. Delete it in File Explorer:

1. Open `C:\Users\0n7n0\Documents\Claude\Projects\Portfolio_University`
2. If you don't see a `.git` folder, enable **View → Hidden items** in File Explorer.
3. Right-click the `.git` folder → **Delete**.

Or from the terminal:

```bash
cd "C:/Users/0n7n0/Documents/Claude/Projects/Portfolio_University"
rm -rf .git
```

---

## Step 1 · Initialize the repo locally

```bash
cd "C:/Users/0n7n0/Documents/Claude/Projects/Portfolio_University"
git init -b main
git add .
git commit -m "Initial portfolio — IMP Final Portfolio for Nhan Ngoc Thach"
```

If git asks you to set your identity first:

```bash
git config --global user.name  "Nhan Ngoc Thach"
git config --global user.email "0n7n0t8@gmail.com"
```

Then re-run the `git commit` line.

---

## Step 2 · Create an empty repo on GitHub

1. Go to <https://github.com/new>.
2. **Repository name:** `portfolio` (or anything you like).
3. **Public** (required for free GitHub Pages).
4. **Do NOT** check "Add a README" / "Add .gitignore" / "Add license" — we already have them locally.
5. Click **Create repository**.

GitHub will show a page with a URL like `https://github.com/NhanNgocThach/portfolio.git`.
Copy that URL.

---

## Step 3 · Connect local to GitHub and push

Replace `NhanNgocThach` with your actual GitHub username:

```bash
git remote add origin https://github.com/NhanNgocThach/portfolio.git
git push -u origin main
```

A browser window will open asking you to log in to GitHub — that's normal.
Sign in, authorize, and the push completes.

> **Heads up about file sizes.** Two of your AE051 PDFs are large:
> - `ae051-demonstration-speech.pdf` ≈ 50 MB
> - `ae051-group-project.pdf` ≈ 64 MB
>
> GitHub allows files up to 100 MB per file, so these will push, but you'll
> see a warning. If future files get bigger than 100 MB (long videos), you'll
> need [Git LFS](https://git-lfs.com/) or a link to Google Drive instead.

---

## Step 4 · Turn on GitHub Pages

1. On your repo page, click **Settings** (top-right tabs).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, pick **Deploy from a branch**.
4. Under **Branch**, pick `main` and folder `/ (root)`, then click **Save**.
5. Wait ~1 minute. Refresh. You'll see:

   > Your site is live at `https://NhanNgocThach.github.io/portfolio/`

That's your shareable URL.

---

## Step 5 · Updating the site later

Any time you change a file, upload a new asset, or edit the HTML:

```bash
cd "C:/Users/0n7n0/Documents/Claude/Projects/Portfolio_University"
git add .
git commit -m "Add elevator pitch video"    # describe what changed
git push
```

GitHub Pages rebuilds automatically. New version is live in ~1 minute.

---

## Troubleshooting

**"fatal: not a git repository"** — you're not in the right folder. `cd` back to `C:/Users/0n7n0/Documents/Claude/Projects/Portfolio_University`.

**Push rejected because files too large** — a file is over 100 MB. Remove it or host on Google Drive.

**Site URL returns 404** — Pages takes a minute to build on first push. Wait, refresh. Also double-check Settings → Pages shows "Deploy from a branch: main / root".

**"Authentication failed"** — re-open the browser window GitHub pops up, or run `git config --global credential.helper manager` and try again.
