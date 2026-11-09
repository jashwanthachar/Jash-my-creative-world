# JASH — My Creative World

An immersive personal portfolio built around a cinematic floating-world
backdrop, a draggable orbital navigation, and a warm gold-and-navy visual
identity.

**GitHub repository:** [Jash-my-creative-world](https://github.com/jashwanthachar/Jash-my-creative-world)

## Project vision

**JASH — My Creative World** is a personal portfolio experiment designed to
feel like entering a different creative world rather than browsing a
conventional portfolio page. It introduces Jash and provides one interactive
place to explore personal interests, projects, and future portfolio
destinations.

## Features

- **Cinematic setting:** A fixed fantasy floating-city background with a dark
  atmospheric overlay.
- **Interactive orbital navigation:** Drag the orbit horizontally to rotate
  its five destinations; select a destination by clicking or tapping.
- **Five destinations:** About Me, Skills, Contact, My Projects, and Socials
  use the existing shared destination panel.
- **About Me experience:** An introduction, Computer Science Engineering
  journey, interests, technical skills, selected projects, and future
  ambition.
- **Skills showcase:** Seven technology cards use local Devicon logos and open
  into detail views for learning notes, practical projects, and certificates.
  Certificate details are intentionally placeholders until verified
  information is available.
- **Contact experience:** Contact methods and a client-validated form are
  available in the Contact destination, including email, phone, LinkedIn, and
  GitHub links. The form is a frontend prototype and does not send or store
  submissions until a backend or form service is configured.
- **My Projects experience:** Four sections organize software projects,
  SK JEWELS, jewellery CAD work, and attended events. Project and event details
  are data-driven; missing images, dates, organizers, certificates, and links
  are shown as placeholders rather than invented.
- **Jewellery design showcase:** CAD work is grouped by design category and
  supports image galleries when project images are added locally.
- **Responsive presentation:** The layout adapts to smaller screens, switches
  to the mobile floating-world background, and changes multi-column content
  layouts to fit narrow viewports.
- **Accessibility details:** Destination selection updates pressed states;
  the panel can be closed with Escape, returns focus to the selected
  destination, and respects reduced-motion preferences.

## Technology

| Technology | Use |
| --- | --- |
| HTML5 | Page structure and navigation destinations |
| CSS3 | Visual styling, orbital layout, transitions, and responsive rules |
| Vanilla JavaScript | Orbit dragging, destination selection, and panel content |
| Google Fonts (Manrope) | Typography, loaded from Google Fonts |

The project has no JavaScript framework, package manager, or build step.

## Project structure

```text
JASH-CREATIVE-WORLD/
├── assets/
│   ├── audio/
│   │   └── .gitkeep
│   ├── icons/
│   │   └── skills/
│   │       ├── c.svg
│   │       ├── css.svg
│   │       ├── html.svg
│   │       ├── java.svg
│   │       ├── javascript.svg
│   │       ├── mysql.svg
│   │       └── python.svg
│   └── images/
│       ├── .gitkeep
│       ├── cad/
│       │   └── .gitkeep
│       ├── events/
│       │   └── .gitkeep
│       ├── sk-jewels/
│       │   └── .gitkeep
│       ├── background-world1.png
│       └── background-world2.png
├── assets/certificates/
│   └── .gitkeep
├── css/
│   └── style.css
├── js/
│   └── script.js
├── .gitignore
├── index.html
└── README.md
```

`background-world1.png` is used for larger screens and
`background-world2.png` for screens up to 767 pixels wide. Technology logo
SVGs are stored locally and sourced from
[Devicon](https://github.com/devicons/devicon). The project does not currently
include screenshots or certificate files.

## Run locally

1. Clone the repository and open its project folder in Visual Studio Code:

   ```powershell
   git clone https://github.com/jashwanthachar/Jash-my-creative-world.git
   cd Jash-my-creative-world
   ```

2. If you do not already have it, install the **Live Server** extension in
   VS Code.
3. In the Explorer, right-click `index.html` and choose **Open with Live
   Server**.
4. The site opens in your browser. Save file changes and refresh if needed.

Because this is a static site, there is no dependency installation or build
command.

## Contributing and suggestions

Ideas, bug reports, and improvements are welcome. Open an issue in the GitHub
repository to describe a suggestion or problem. For code contributions, fork
the repository, create a focused branch, test your changes locally with Live
Server, and submit a pull request with a concise explanation of the change.

Please keep the project’s immersive visual direction, avoid adding
unnecessary dependencies, and do not include private credentials or personal
information that should not be public.

## Current development status

The core portfolio shell, orbital interaction, shared destination panel,
About Me experience, Skills showcase, Contact form prototype, and My Projects
sections are implemented. The Contact form does not transmit submissions.
Some project imagery, event records, and certificate information remain
placeholders until verified details and assets are added. Socials currently
contains introductory placeholder content.

## Roadmap

- Add verified skill topics, practical work, and certificate records.
- Add project imagery, source/demo links, and confirmed event details.
- Connect a backend or form service for Contact submissions.
- Add confirmed social profile information.
- Continue refining transitions, animation, and responsive behavior.
