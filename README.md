# GenAI Lab website - React + Vite + Tailwind CSS

A conversion of the original HTML/CSS GenAI Lab site. The design, content, section
order, colours, fonts, hover effects and animations come from the original files.

## Run it

```bash
npm install
npm run dev        # development server
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

Copy `.env.example` to `.env` only when you have a backend URL to set.

## What each file does

### Project root
| File | Purpose |
|---|---|
| `index.html` | Home page entry. Loads fonts, Font Awesome icons and `src/main.jsx`. |
| `project.html` | Project detail page entry (`project.html?id=...`). Loads `src/project-main.jsx`. |
| `vite.config.js` | Vite setup. Builds both HTML pages and proxies `/api` to `localhost:8000` (FastAPI) in development. |
| `tailwind.config.js` | Tailwind theme. Maps colour and font names to the CSS variables in `src/index.css`. |
| `postcss.config.js` | Runs Tailwind and Autoprefixer. |
| `package.json` | Scripts and dependencies (React, Vite, Tailwind only). |
| `.env.example` | Template for public settings (`VITE_API_BASE_URL`). Never put secrets in it. |
| `.gitignore` | Keeps `node_modules`, `dist` and `.env` out of git. |
| `public/gifs/` | Put the project demo GIFs here (e.g. `public/gifs/rag-knowledge-system.gif`). |

### `src/` core
| File | Purpose |
|---|---|
| `main.jsx` | Mounts the home page into `index.html`. |
| `project-main.jsx` | Mounts the project detail page into `project.html`. |
| `App.jsx` | Root component for the home page (renders `Home`). Has a comment showing how to lazy-load the future chatbot. |
| `index.css` | All styling: Tailwind layers, **theme colours (`:root` block)**, the original site styles, and the responsive rules. |
| `data/content.js` | All static text, links and image URLs (nav, team, events, projects, stories, footer...). Edit content here, not in components. |
| `services/api.js` | The only place that talks to your backend: `sendChatMessage()` (`POST /api/chat`), `submitContactMessage()` (`POST /api/contact`), plus a generic `request()` helper. |
| `assets/images/` | Folder for self-hosted images (see "Images" below). |

### `src/pages/`
| File | Purpose |
|---|---|
| `Home.jsx` | Puts all home-page sections together in the original order, plus the skip link. |
| `ProjectPage.jsx` | Project detail page. Reads `?id=` from the URL and shows details from `content.js`; shows "Project not found" for unknown ids. |

### `src/components/`
| File | Purpose |
|---|---|
| `Navbar.jsx` | Fixed top navigation. Adds the "scrolled" style on scroll and the mobile menu button. |
| `Hero.jsx` | Headline, floating image cards, scrolling ticker, intro text and the four stats. |
| `Features.jsx` | "Three pillars of our lab" grid (four cards). |
| `About.jsx` | Image gallery, description and the checklist. |
| `Partners.jsx` | Scrolling "Trusted Partners" strip. |
| `ResearchAreas.jsx` | "Research Areas" section (the nav's **Research** link points here). |
| `Contact.jsx` | "Collaborate with us" banner and the working contact form. |
| `Process.jsx` | The three-step workflow on the plum background. |
| `Publications.jsx` | Publication list and the testimonial card. |
| `Solutions.jsx` | "AI solutions for your work & study" image cards. |
| `Projects.jsx` | Project cards; each links to `project.html?id=...`. |
| `Events.jsx` | Featured event and the two smaller events. |
| `Team.jsx` | Team member cards. |
| `Collaborators.jsx` | Collaborator logo cloud. |
| `SuccessStories.jsx` | The three success-story cards (rendered inside `Collaborators`). |
| `Footer.jsx` | Footer columns and legal links. |
| `CallFab.jsx` | Floating call button. |
| `Img.jsx` | Small `<img>` wrapper: lazy loading and async decoding by default. |

## Notes on how the conversion was done

- **Section names vs. your file list:** your original site has no Gallery, Products or
  Chatbot section, so none were created. Names follow the real content
  (`ResearchAreas`, `Publications`, `Solutions`).
- **Tailwind:** installed and configured, and its theme reads the same CSS variables
  as the original. To keep the design pixel-identical, most component styling stays in
  `index.css` under the original class names instead of being rewritten as long utility
  strings. Tailwind utilities are used for new additions (skip link, screen-reader
  labels) and can be used for anything you build next (`bg-brand`, `text-ink`,
  `border-line`, `font-display`...). Converting a section fully to utilities can be
  done one section at a time.
- **Recolouring:** edit only the `:root` block at the top of `src/index.css`.
- **No router:** the site is one page with section anchors plus one project page, so
  React Router is not needed. `project.html` is a second Vite entry, which keeps the
  original `project.html?id=...` links working.

## Things added or fixed compared with the original

1. **Mobile layout (added):** the original CSS had responsive rules only for the
   collaborators, stories and project pages. A hamburger menu (under 1100px) and
   stacking rules (under 1000px / 640px) were added for the rest. Desktop is unchanged.
   Everything is in the clearly marked block at the end of `index.css`.
2. **"View all projects" link (fixed):** it pointed to `#project.html` in a new tab,
   which does nothing useful. It now points to `#projects`.
3. **Contact form:** now a real form with labels, validation, and a status message.
   It calls `POST /api/contact`, which does not exist yet, so it shows an error
   message until you build that endpoint.
4. **Accessibility:** `aria-label`s on icon-only links, empty `alt` on purely decorative
   images, `<main>` landmark, skip link, focus outlines, reduced-motion support, heading
   order fixed in the footer and project page.
5. **Icons next to text** were removed from inline colour styles (the original CSS
   already overrode them).

## Images

The original site used Unsplash URLs, and the converted site uses the same ones (all
below-the-fold images are lazy-loaded; the four hero images load immediately). To
self-host them for speed and reliability, download each image into
`src/assets/images/`, import it in `src/data/content.js`, and replace the URL. Vite
will hash and optimise the file names for you.

## Preparing for the chatbot and Supabase

- The browser must only talk to **your FastAPI server**, never directly to the LLM or
  to Supabase with a privileged key. Put keys on the server only.
- `services/api.js` already has `sendChatMessage(message)`:
  `POST /api/chat` with `{ "message": "..." }`, expecting `{ "reply": "..." }`.
- When data moves to Supabase, add one function per resource in `services/api.js`
  (e.g. `getTeamMembers`) and replace the matching array in `data/content.js`.
- In development, `/api/*` is proxied to `http://localhost:8000`, so there are no CORS
  problems while you build the backend. In production, set `VITE_API_BASE_URL` or serve
  the API from the same domain.

## Placeholder content to check before launch

These came from your original files and look like placeholders: team names, partner
and collaborator names, statistics, success-story numbers, the email address, phone
number and the `href="#"` links. Replace them with real information.

## Testing status

The code was syntax-checked and all imports were verified, but `npm install`,
`npm run build`, the browser checks and Lighthouse could not be run in the environment
where this was generated (no network access). Run the steps in "Run it", then check the
page at desktop, tablet and phone widths and run Lighthouse on `npm run preview`.
