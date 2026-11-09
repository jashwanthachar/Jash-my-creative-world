# JASH — My Creative World

An immersive personal portfolio built around a cinematic floating-world
backdrop, an endlessly draggable half-ellipse orbit, and a warm gold-and-navy
visual identity.

**GitHub repository:** [Jash-my-creative-world](https://github.com/jashwanthachar/Jash-my-creative-world)

## Project vision

**JASH — My Creative World** is a personal portfolio designed to feel like
entering a different creative world. The home page's orbit links to separate
About, Skills, Projects, Contact, and Socials pages. The same orbit appears on
each page for quick navigation.

## Features

- **Cinematic setting:** A fixed fantasy floating-city background with a dark
  atmospheric overlay.
- **Draggable orbital navigation:** Five destinations move around a responsive
  shallow half-ellipse traced by three fine gold curves. The arc is horizontal
  on mobile and vertical on laptop/desktop. Drag to rotate; selecting a
  destination smoothly rotates the orbit before opening its page.
- **Separate destination pages:** About Me, Skills, My Projects, Contact, and
  Socials are independent HTML pages, each with a return-to-home link.
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
  opens into image galleries, with the uploaded renders presented in a
  luxury-inspired responsive layout. Its diploma certificate and marks sheet
  are also viewable in the CAD records area.
- **Social presence:** Six platform cards showcase LinkedIn, GitHub,
  Instagram, YouTube, X, and Threads. All six cards link to the profile URLs
  provided for the project.
- **Responsive presentation:** The layout adapts to smaller screens, switches
  to the mobile floating-world background, and changes multi-column content
  layouts to fit narrow viewports.
- **Accessibility details:** Navigation uses native in-page links with visible
  focus states, and motion respects reduced-motion preferences. Without
  JavaScript, the headings and chapter links remain available.

## Technology

| Technology | Use |
| --- | --- |
| HTML5 | Page structure, landmarks, and page navigation |
| CSS3 | Visual styling, half-ellipse orbital paths, transitions, and responsive rules |
| Vanilla JavaScript | Orbital interaction, destination content, skills, projects, and galleries |
| Google Fonts (Manrope) | Typography, loaded from Google Fonts |

The project has no JavaScript framework, package manager, or build step.

## Project structure

```text
JASH-CREATIVE-WORLD/
├── assets/
│   ├── audio/
│   │   └── .gitkeep
│   ├── icons/
│   │   ├── favicon.svg
│   │   ├── socials/
│   │   │   ├── github.svg
│   │   │   ├── instagram.svg
│   │   │   ├── linkedin.svg
│   │   │   ├── threads.svg
│   │   │   ├── x.svg
│   │   │   └── youtube.svg
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
│       │   ├── .gitkeep
│       │   ├── BANGLE.jpeg
│       │   ├── CAD-CERTIFICATE.jpeg
│       │   ├── CAD-MARKS-SHEET.jpeg
│       │   ├── JHUMKA.jpeg
│       │   ├── NECKLACE.jpeg
│       │   ├── PENDENT.jpeg
│       │   └── RING.jpeg
│       ├── events/
│       │   ├── .gitkeep
│       │   └── Buildathon-Certificate.pdf
│       ├── sk-jewels/
│       │   └── .gitkeep
│       ├── background-world1.png
│       ├── background-world1.jpg
│       ├── background-world2.jpg
│       └── background-world2.png
├── assets/certificates/
│   └── .gitkeep
├── css/
│   └── style.css
├── js/
│   └── script.js
├── .gitignore
├── about.html
├── contact.html
├── index.html
├── projects.html
├── skills.html
├── socials.html
└── README.md
```

The optimized JPEG backgrounds are used on larger screens and screens up to
767 pixels wide; each is about 0.5 MB. The original PNG files remain unchanged.
Technology logo SVGs are stored locally and sourced from
[Devicon](https://github.com/devicons/devicon). Social platform marks are
stored locally using Bootstrap Icons and Simple Icons. The CAD and Buildathon
certificate records are project assets; the site does not currently include
screenshots.

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

The core portfolio shell, draggable half-ellipse navigation,
About Me experience, Skills showcase, Contact form prototype, and My Projects
pages are implemented. The Contact form validates input in the browser but
does not transmit submissions.
Some project imagery, event records, and certificate information remain
placeholders until verified details and assets are added. CAD render images,
the diploma certificate, and its marks sheet are included in the CAD gallery.
Socials currently includes six platform cards; Instagram, YouTube, X, and
Threads profile links were provided and are now functional along with LinkedIn
and GitHub.

## Roadmap

- Add verified skill topics, practical work, and certificate records.
- Add project imagery, source/demo links, and confirmed event details.
- Connect a backend or form service for Contact submissions.
- Continue refining the social profiles and portfolio content.
- Continue refining transitions, animation, and responsive behavior.
