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
- **Five destinations:** About Me, Playlist, Contact, My Links, and Socials
  use the existing shared destination panel.
- **About Me experience:** An introduction, Computer Science Engineering
  journey, interests, technical skills, selected projects, and future
  ambition.
- **Responsive presentation:** The layout adapts to smaller screens, and the
  About Me content changes to a single-column layout on narrow viewports.
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
│   │   └── .gitkeep
│   └── images/
│       ├── .gitkeep
│       ├── background-world1.png
│       └── background-world2.png
├── css/
│   └── style.css
├── js/
│   └── script.js
├── .gitignore
├── index.html
└── README.md
```

`background-world1.png` is used as the page background. The second image is
present in the repository but is not currently referenced by the website.
The project does not currently include screenshots.

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

The core portfolio shell, orbital interaction, shared destination panel, and
About Me experience are implemented. The other four destinations open their
panels, but currently contain introductory placeholder content rather than
their full planned experiences.

## Roadmap

- Build an interactive playlist experience.
- Develop the Contact destination with useful contact information.
- Add project details and confirmed professional links.
- Add confirmed social profile information.
- Continue refining transitions, animation, and responsive behavior.
