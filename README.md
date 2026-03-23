# secretly.vip

Static “coming soon” landing page for [secretly.vip](https://secretly.vip).

## What’s here

- `index.html` — single-file site (inline CSS, Google Fonts, mail link to `support@secretly.vip`).
- `.gitignore` — ignores OS junk, editors, `node_modules`, env files, etc.
- `.gitattributes` — consistent line endings (`LF`) for text files.
- `.editorconfig` — basic spacing/encoding defaults for editors that support it.
- `LICENSE` — MIT.

## GitHub

1. Create a new repository on GitHub (empty is fine; this repo already includes `README.md` and `LICENSE`).
2. From this folder:

   ```bash
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

## GitHub Pages (optional)

In the repo: **Settings → Pages → Build and deployment → Source**: *Deploy from a branch*, branch **main**, folder **/ (root)**. The site will be served from `index.html` at the Pages URL.
