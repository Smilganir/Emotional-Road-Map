# מפת הניווט הפנימי שלי (Emotional Road Map)

Vite + React + TypeScript mindfulness “road map” for kids (Hebrew, RTL): illustrated Israel route, journal notes per stop, PDF export.

**Live site:** [smilganir.github.io/Emotional-Road-Map](https://smilganir.github.io/Emotional-Road-Map/)

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build   # production build to dist/
npm run preview # serve dist locally
```

## Publish on GitHub Pages

1. Create a **new repository** on GitHub (any name, e.g. `Emotional-Road-Map`). Do not add a README if you already have this project.
2. In the repo: **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.
3. Add the remote and push the `main` branch:

```bash
git remote add origin https://github.com/<YOUR_USER>/<YOUR_REPO>.git
git branch -M main
git push -u origin main
```

4. After the **Deploy to GitHub Pages** workflow finishes, open:

`https://<YOUR_USER>.github.io/<YOUR_REPO>/`

The workflow sets `BASE_PATH` to `/<repository-name>/` so assets load correctly on GitHub Pages.

### Repository name matters

The build uses `github.event.repository.name` for the Vite `base` URL. If you rename the repo, the next deploy will update the base path automatically.
