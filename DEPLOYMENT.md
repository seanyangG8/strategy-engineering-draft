# Deploying to GitHub Pages

This project is a Vite + TanStack Router SPA, built for GitHub Pages.

## One-time setup

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow at `.github/workflows/deploy.yml` builds and deploys automatically.

## How the base path works

- If the repo is named `<user>.github.io`, the site is served at `https://<user>.github.io/` and `VITE_BASE=/`.
- Otherwise the site is served at `https://<user>.github.io/<repo>/` and `VITE_BASE=/<repo>/`.

The workflow detects this and passes `VITE_BASE` to the Vite build, which:
- Sets Vite's `base` so all asset URLs are correctly prefixed.
- Sets the TanStack Router `basepath` via `import.meta.env.BASE_URL` so links resolve to the right URL.

## Deep links and refresh

`public/404.html` implements the standard [spa-github-pages](https://github.com/rafgraph/spa-github-pages) redirect trick. Direct visits to `/<repo>/about` get rewritten and the router restores the path before mounting.

## Local development

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # production build
bun run preview  # preview the production build locally
```

To preview as if hosted at a sub-path locally:

```bash
VITE_BASE=/your-repo-name/ bun run build && bun run preview
```

## Custom domain

Add a `CNAME` file to `public/` containing your domain, then in Vite the `VITE_BASE` should be `/`. You can override the workflow's auto-detection by adding a `CNAME` step or simply editing the workflow to set `base=/`.
