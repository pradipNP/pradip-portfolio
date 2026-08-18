# Full Stack Developer Portfolio

A futuristic, cyberpunk-themed developer portfolio built with vanilla HTML, CSS, JavaScript, Three.js, and GSAP.

## Features

- Immersive galaxy background with particles and mouse interaction
- Boot sequence loading screen with terminal animation
- Custom cursor with trails and particle burst on click
- Profile photo support with silhouette fallback
- Interactive terminal (`help`, `about`, `skills`, `projects`, `resume`, `contact`, `clear`)
- Command palette (`Ctrl+K`)
- GSAP scroll animations and magnetic buttons
- Skills matrix with category filtering
- Portfolio project showcase with modals
- Frontend-only contact form (success simulation + optional mailto)
- Fully responsive with accessibility support

## Quick Start

Open `index.html` in a modern browser, or run a local server:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`

## Project Structure

```
portfolio/
├── index.html
├── assets/
│   └── images/
│       └── profile.jpg    ← Add your profile photo here
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── particles.js
│   ├── terminal.js
│   └── animations.js
└── README.md
```

## Customization

| What | Where |
|------|-------|
| Profile photo | `assets/images/profile.jpg` |
| Skills & projects | `js/main.js` |
| Terminal responses | `js/terminal.js` |
| Hero text | `index.html` |
| Accent color | Theme panel (🎨) or `data-accent` on `<html>` |
| Contact email | `index.html` + `js/main.js` (`CONTACT_EMAIL`) |

## Tech Stack Highlighted

HTML · CSS · JavaScript · Node.js · Express.js · PostgreSQL · Git · GitHub · Docker

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Command palette |
| `↑↑↓↓←→←→BA` | Konami code easter egg |

## License

MIT — Customize freely for your own portfolio.
