# Dinesh Senthil Kumar — React Portfolio

A complete React + Vite portfolio with a charcoal/copper theme, warm light mode, scroll-triggered content reveals, staggered project cards, subtle photo parallax, project filters, accessible project dialogs, and a working FormSubmit integration.

## Start locally

Install Node.js 20.19+ or a newer supported LTS version. Extract this folder, open a terminal here, and run:

```bash
npm ci
npm run dev
```

Open the localhost URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

Deploy the generated `dist` directory to your static hosting provider. The ZIP contains source and a ready-built `dist` copy. The application does not need a Node server after building.

## Project structure

- `src/main.jsx` — React entry point and stylesheet imports.
- `src/App.jsx` — page sections, theme preference, navigation, filtering and project dialog.
- `src/data/portfolio.js` — profile settings, email, future portfolio URLs and project descriptions.
- `src/components/ContactForm.jsx` — validation, submission, loading/error/success states.
- `src/components/ProjectArt.jsx` — original CSS-based illustrative project visuals.
- `src/hooks/useScrollMotion.js` — IntersectionObserver reveals, scroll progress and requestAnimationFrame photo parallax.
- `src/style.css` — base responsive layout and project illustrations.
- `src/theme.css` — current palette, motion, visual refinements and mobile overrides.
- `public/dinesh-portrait.png` — transparent portrait used in the hero.
- `public/dinesh-outdoors.jpeg` — outdoor photograph in the About section.
- `index.html`, `vite.config.js`, `package.json`, `package-lock.json` — build and development configuration.

## Make it yours

Edit `src/data/portfolio.js` to change project text, contact email and portfolio links. Set `nextPortfolio` and `angularPortfolio` to your deployed URLs; empty values show Coming soon. Update photos in `public` and their paths in the source. Theme tokens are at the top of `src/theme.css`. Dark mode is the default; visitor selection is saved in localStorage.

Motion is progressively enhanced, works without an animation dependency, and respects `prefers-reduced-motion`. Scroll events are passive and visual updates use requestAnimationFrame. Content is visible if IntersectionObserver is unavailable; focused content is revealed for keyboard users.

## Contact form: activation required

The form posts to FormSubmit and forwards submissions to the email in `profile.email`. FormSubmit sent an activation email to dineshsenthil02@gmail.com during setup. Click its Activate Form link before relying on delivery, then submit a real test and check the inbox/spam folder. Activation has not been independently confirmed.

When moving to another domain, FormSubmit may request confirmation again. No email API keys or account credentials are included. A successful API response indicates acceptance, not verified inbox delivery. On network/API errors, typed text is retained and visitors can email directly. The UI discloses FormSubmit processing. Production spam protection and provider terms/limits are controlled by FormSubmit.

## Notes

Google Fonts is used for DM Sans and Manrope, with system fallbacks when offline. Form delivery requires internet access. Project illustrations are concepts, not employer product screenshots. Descriptions reflect the supplied resume. No node_modules, repository history, hosting credentials or workspace-only configuration are included in the downloadable package.
