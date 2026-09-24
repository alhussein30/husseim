# Alhussein Salah, Portfolio

A dark, premium, bilingual (English by default, plus full Arabic RTL) portfolio for a freelance front-end developer.
Built with **React + Vite, Tailwind CSS, Framer Motion** and **Firebase Firestore** for contact-form leads.

---

## 1. Run locally

Requires Node 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

## 2. Replace the placeholders

Everything you need to personalise is marked `[LIKE_THIS]`:

| What | Where |
| --- | --- |
| WhatsApp number, email, GitHub | `src/config.js` |
| "Starting from" prices (EGP) | `src/config.js` → `PRICES` |
| Your photo | `public/me.webp` + `me-480.webp` (hero, 4:5) and `public/me-about.webp` (About) |
| Domain for canonical / Open Graph URLs | `index.html` → `[YOUR_DOMAIN]` |
| Social share image | `public/og.jpg` (1200×630) |

Placeholders are shown as plain text (not links) until you replace them, so nothing on the page links to a broken URL.

All page copy (both languages) is in **`src/i18n.js`** (`ar` and `en` objects).
Project URLs, screenshots and tech chips are in **`src/data/projects.js`**.

## 3. Add Firebase (contact form → Firestore)

1. Create a project at <https://console.firebase.google.com>, then **Build → Firestore Database → Create database**.
2. **Project settings → Your apps → Web app (</>)** and copy the config values.
3. Copy `.env.example` to `.env` and fill it in:

   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

4. Paste the rules from **`firestore.rules`** into **Firestore → Rules** and publish. They let visitors *create* a lead
   (with validated fields) but never read, edit or delete anything.

Submissions land in the `leads` collection with: `name, phone, projectType, message, lang, createdAt`.
Firebase is loaded **only when the form is submitted** (using the lightweight Firestore Lite client), so it doesn't slow the first page load.

## 4. Replace the project screenshots

Screenshots live in `public/work/` as WebP:

```
jurista-store.webp            jurista-store-mobile.webp
jurista-experience.webp       jurista-experience-mobile.webp
yala-vape.webp                yala-vape-mobile.webp
```

Desktop shots are 1440×900 and phone shots are 390×844. To swap them, either export WebP files with the same names, or:

1. Drop PNG/JPG files with those base names into `public/work/_raw/`
2. Run `npm run placeholders`. They get resized and converted to WebP in `public/work/`.
3. Delete `public/work/_raw/`.

(`npm run placeholders` also regenerates `og.jpg` and `apple-touch-icon.png` if they are missing. Add `--force` to overwrite them.)

## 5. Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On <https://vercel.com/new>, import the repo. Vercel detects Vite automatically (build `npm run build`, output `dist`), so no config is needed.
3. In **Settings → Environment Variables**, add the six `VITE_FIREBASE_*` variables, then redeploy.
4. Add your custom domain under **Settings → Domains**, and update `[YOUR_DOMAIN]` in `index.html`.

---

### Project structure

```
src/
  i18n.js              all copy, ar + en
  config.js            contact details, prices, WhatsApp link helper
  data/projects.js     project URLs, screenshots, tech chips
  lib/firebase.js      lazy Firestore Lite client (saveLead)
  LanguageContext.jsx  language state, <html lang/dir>, localStorage
  components/
    Navbar  Hero  Work  ProjectCard  Services  Process
    WhyMe  About  Contact  Footer  WhatsAppFab  ui (shared bits)
```

### Notes

- **RTL/LTR:** layout uses logical utilities (`ms-/me-`, `ps-/pe-`, `start-/end-`) and `rtl:` variants, so both directions mirror correctly. The WhatsApp button sits bottom-left in Arabic and bottom-right in English.
- **Palette:** all colors are CSS variables at the top of `src/index.css` (`--c-ink`, `--c-accent`, …). Change the RGB values there to re-theme the whole site.
- **Motion:** fade-up on scroll, card hover lift and a magnetic main button. All of it respects `prefers-reduced-motion`.
- **Performance:** Framer Motion loads via `LazyMotion`, images are lazy WebP with fixed dimensions (no layout shift), and the hero headline renders without an entrance animation so it paints immediately.
