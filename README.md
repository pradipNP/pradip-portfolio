# Pradip Kumar Prajapati — Full Stack Developer Portfolio

A futuristic, cyberpunk-themed developer portfolio built with vanilla **HTML**, **CSS**, **JavaScript**, **Three.js**, and **GSAP**.

**Live site:** [pradipkumarprajapati.pages.dev](https://pradipkumarprajapati.pages.dev/)  
**Repository:** [github.com/pradipNP/pradip-portfolio](https://github.com/pradipNP/pradip-portfolio)

---

## Features

### Visual & interaction
- Immersive **Three.js galaxy** background with nebula, stars, and mouse-reactive camera
- **Boot sequence** loader with terminal-style system logs
- **Rocket custom cursor** with exhaust trail, hand pointer, and text-beam modes
- **GSAP** scroll reveals, parallax, magnetic buttons, and animated counters
- **Theme panel** — accent colors, particle density, optional ambient sound

### Sections
- **Home** — hero typing effect, profile video/image, floating tech icons, stats
- **About** — developer journey timeline
- **Resume** — experience, education (with location tags), certifications grid, skills radar chart
- **Skills** — filterable skill orbs + constellation network canvas
- **Portfolio** — major projects carousel with detail modals and GitHub CTA
- **Contact** — live email form, social links, interactive **3D globe** (world map + Nepal highlight)

### Developer experience
- **Interactive terminal** — `help`, `about`, `skills`, `projects`, `resume`, `contact`, `clear`
- **Command palette** — `Ctrl+K` for quick navigation
- **Konami code** easter egg — `↑↑↓↓←→←→BA`
- **Support Chai modal** — UPI QR payment + social links
- Fully **responsive** with skip link and reduced-motion support

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| UI / Motion | GSAP, ScrollTrigger |
| 3D / Canvas | Three.js r128 |
| Contact | [FormSubmit.co](https://formsubmit.co) (AJAX) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |

**Skills highlighted:** Python · JavaScript · Vue.js · Node.js · Express.js · PostgreSQL · Docker · AWS Cloud · Postman · PyCharm · Machine Learning · REST APIs

---

## Featured Projects

| # | Project | Type | Live | Stack |
|---|---------|------|------|-------|
| 1 | [Shova Creation Photography](https://shovacreation.netlify.app/) | Client Project | Live | HTML, CSS, JS, EmailJS, Netlify |
| 2 | [FERILO](https://ferilo.pages.dev/) | Self Project | Live | React, Vite, Node.js, Express, PostgreSQL, JWT |
| 3 | [SAMS Nepal (OpenSAMS)](https://opensams.pages.dev/) | Self Project | Live | Vue 3, Vite, Node.js, Express, PostgreSQL |
| 4 | [Nepal Live Rates](https://nepal-live-rates.pages.dev/) | Self Project | Live | HTML, CSS, JS, Node.js, Express, Chart.js |
| 5 | [KhelZon](https://khelzon.pages.dev/) | Self Project | Live | HTML, CSS, JS, Canvas 2D, PWA |
| 6 | [Agent Racchha](https://github.com/pradipNP/agent-racchha) | Self Project | GitHub | Python, FastAPI, React, Electron, Gemini API |
| 7 | [Awaken The Lion](https://awaken-the-lion.pages.dev/) | Self Project | Live | HTML, CSS, JS, GSAP, Lenis |

Edit projects in `js/main.js` → `PROJECTS` array. Screenshots live in `assets/project/`.

---

## Project Structure

```
pradip-portfolio/
├── index.html              # Main page & all sections
├── assets/
│   ├── earth-topology.png  # Globe world map texture
│   ├── images/
│   │   ├── profile.jpg     # Profile photo fallback
│   │   └── profile.mp4     # Hero profile video
│   ├── logo/               # Tech stack icons
│   └── project/            # Project screenshots (sc, ferilo, sams, nlr, kz, ar, ll)
├── css/
│   ├── main.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js             # App logic, skills, projects, contact, modals
│   ├── particles.js        # Galaxy, globe, constellation, cursor trail
│   ├── terminal.js         # Dev terminal commands
│   └── animations.js       # GSAP animations & radar chart
├── .gitignore
└── README.md
```

---

## Customization

| What | Where |
|------|-------|
| Contact email | `js/main.js` → `CONTACT_EMAIL` |
| Social links | `js/main.js` → `SOCIAL_LINKS` |
| UPI / Chai support | `js/main.js` → `PAYMENT_CONFIG` |
| Skills & levels | `js/main.js` → `SKILLS` |
| Projects | `js/main.js` → `PROJECTS` |
| Terminal responses | `js/terminal.js` |
| Resume content | `index.html` → `#resume` section |
| Profile media | `assets/images/profile.mp4` / `profile.jpg` |
| Accent color | Theme panel (🎨) or `data-accent` on `<html>` |

### Contact form setup

The form uses **FormSubmit.co**. On first submission, check your inbox and activate the email address. Messages may land in spam initially.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Open command palette |
| `Esc` | Close modals / palette |
| `↑↑↓↓←→←→BA` | Konami easter egg |

---

## Author

**Pradip Kumar Prajapati**  
Full Stack Developer · B.Tech CSE @ KIIT University · Nepal

- GitHub: [@pradipNP](https://github.com/pradipNP)
- LinkedIn: [pradipkprajapati](https://www.linkedin.com/in/pradipkprajapati)
- Email: pradipkprajapati27@gmail.com

---

## License

This project is proprietary and intended for portfolio purposes only.

Copyright © 2026 Pradip Kumar Prajapati.
All Rights Reserved.