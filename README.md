# Fretboard

A responsive guitar fretboard explorer built with Astro, React, TypeScript, Node.js, and npm.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:4321. Use `npm run build` to type-check and generate the static site in `dist/`, `npm run preview` to preview it, and `npm test` to check the pitch calculations.

Includes 19 tuning presets (standard, half step down, Drop D/C♯/C/B/A, double drop D, DADGAD, open G/D/C/E/A, open D/G minor, DADEAD, DGDDGD, and GBDGBD), custom per-string pitches (E1–E4), sharp/flat notation, multi-note highlighting (unselected notes remain visible with darker backgrounds; clearing restores the default colors), 12/15/24 frets, and a left-handed view. Strings are displayed high to low; tuning controls run low to high. This is a visual note explorer, not a microphone tuner.

The page uses Google Fonts with local system fallbacks. No API keys or backend are needed.

Scale highlighting supports all 12 roots with major, natural minor, harmonic minor, melodic minor (ascending), Dorian, Phrygian, Lydian, Mixolydian, Locrian, major/minor pentatonic, and minor blues scales. Melodic minor uses the ascending form (also used in jazz); for the classical descending form, choose Natural minor. Choose Custom notes to keep and edit a selection; clicking any note also switches to Custom. Clear returns to showing all notes. Scale labels follow the global sharp/flat preference (enharmonic pitch labels).

Alternate tuning pitches run low to high: DADEAD = D2 A2 D3 E3 A3 D4; DGDDGD = D2 G2 D3 D3 G3 D4 (middle strings in unison); GBDGBD = G2 B2 D3 G3 B3 D4.

## GitHub Pages

1. Push this project, including `.github/workflows/deploy.yml` and `package-lock.json`, to your GitHub repository.
2. In the repository, open **Settings → Pages → Build and deployment**, and set **Source** to **GitHub Actions**.
3. Push to the default branch, or open **Actions → Deploy to GitHub Pages → Run workflow** and select the default branch.

The workflow installs locked dependencies, runs tests and type checks, builds the static site, and deploys it. Only the default branch deploys. The deployment URL appears in the workflow environment.

For a repository named `guitar-tuning`, the usual URL is `https://<username>.github.io/guitar-tuning/`. A repository named `<username>.github.io` serves at the domain root. The workflow reads the site origin and base path from GitHub Pages automatically; no username, repository name, or personal access token needs to be added to the config. Local development continues to use `/`.

This follows the [GitHub Pages workflow setup](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [GitHub’s Astro workflow](https://github.com/actions/starter-workflows/blob/main/pages/astro.yml).
