
console.log("Welcome to JASH Creative World!");
console.log("Our immersive portfolio journey begins.");

// ======================================
// JASH — ORBITAL PORTFOLIO NAVIGATION
// ======================================

const orbitItems = [...document.querySelectorAll(".orbit-item")];
const orbitContainer = document.querySelector(".orbit-container");
const pageContent = document.getElementById("destination-content");
const currentPage = document.body.dataset.page;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const horizontalOrbitPositions = [
    { x: 7, y: 32 },
    { x: 28, y: 44 },
    { x: 50, y: 48 },
    { x: 72, y: 44 },
    { x: 93, y: 32 }
];
const verticalOrbitPositions = [
    { x: 22, y: 12 },
    { x: 42, y: 31 },
    { x: 49, y: 50 },
    { x: 42, y: 69 },
    { x: 22, y: 88 }
];
const horizontalOrbitPaths = [
    "M 2 28 C 25 58, 75 58, 98 28",
    "M 4 31 C 27 55, 73 55, 96 31",
    "M 6 34 C 29 52, 71 52, 94 34"
];
const verticalOrbitPaths = [
    "M 20 10 C 38 12, 60 28, 60 50 C 60 72, 38 88, 20 90",
    "M 22 11 C 39 14, 57 29, 57 50 C 57 71, 39 86, 22 89",
    "M 24 12 C 40 16, 54 30, 54 50 C 54 70, 40 84, 24 88"
];

const activeDestination = currentPage === "home" ? "about" : currentPage;
const activeIndex = Math.max(
    0,
    orbitItems.findIndex(item => item.dataset.destination === activeDestination)
);

let rotation = 2 - activeIndex;
let isDragging = false;
let startX = 0;
let startRotation = 0;
let moved = false;
let suppressClick = false;
let startedOnLink = false;

function wrapIndex(index, length) {
    return ((index % length) + length) % length;
}

function renderOrbit() {
    if (!orbitContainer) return;

    const vertical = window.matchMedia("(min-width: 960px)").matches;
    const positions = vertical ? verticalOrbitPositions : horizontalOrbitPositions;
    const pathData = vertical ? verticalOrbitPaths : horizontalOrbitPaths;

    orbitContainer.querySelectorAll(".orbit-path").forEach((path, index) => {
        path.setAttribute("d", pathData[index]);
    });

    orbitItems.forEach((item, index) => {
        const slot = wrapIndex(index + rotation, positions.length);
        const fromIndex = Math.floor(slot);
        const progress = slot - fromIndex;
        const from = positions[fromIndex];
        const to = positions[(fromIndex + 1) % positions.length];
        let x;
        let y;

        if (fromIndex === positions.length - 1) {
            const inverse = 1 - progress;
            const firstControl = vertical ? { x: 5, y: 100 } : { x: 100, y: 16 };
            const secondControl = vertical ? { x: 5, y: 0 } : { x: 0, y: 16 };
            x = inverse ** 3 * from.x
                + 3 * inverse ** 2 * progress * firstControl.x
                + 3 * inverse * progress ** 2 * secondControl.x
                + progress ** 3 * to.x;
            y = inverse ** 3 * from.y
                + 3 * inverse ** 2 * progress * firstControl.y
                + 3 * inverse * progress ** 2 * secondControl.y
                + progress ** 3 * to.y;
        } else {
            const previous = positions[wrapIndex(fromIndex - 1, positions.length)];
            const next = positions[(fromIndex + 2) % positions.length];
            const progressSquared = progress ** 2;
            const progressCubed = progressSquared * progress;
            x = 0.5 * (
                2 * from.x
                + (-previous.x + to.x) * progress
                + (2 * previous.x - 5 * from.x + 4 * to.x - next.x) * progressSquared
                + (-previous.x + 3 * from.x - 3 * to.x + next.x) * progressCubed
            );
            y = 0.5 * (
                2 * from.y
                + (-previous.y + to.y) * progress
                + (2 * previous.y - 5 * from.y + 4 * to.y - next.y) * progressSquared
                + (-previous.y + 3 * from.y - 3 * to.y + next.y) * progressCubed
            );
        }

        item.style.left = `${x}%`;
        item.style.top = `${y}%`;
    });
}

orbitItems.forEach(item => {
    const isCurrent = item.dataset.destination === currentPage;
    const isSelected = item.dataset.destination === activeDestination;

    if (isCurrent) item.setAttribute("aria-current", "page");
    item.dataset.active = String(isSelected);
});

orbitContainer?.addEventListener("pointerdown", event => {
    if (event.button !== undefined && event.button !== 0) return;

    isDragging = true;
    moved = false;
    suppressClick = false;
    startedOnLink = Boolean(event.target.closest(".orbit-item"));
    startX = event.clientX;
    startRotation = rotation;
    orbitContainer.classList.add("dragging");
});

window.addEventListener("pointermove", event => {
    if (!isDragging) return;

    const difference = event.clientX - startX;
    if (Math.abs(difference) > 4) moved = true;

    rotation = startRotation - difference * orbitItems.length / orbitContainer.clientWidth;
    renderOrbit();
});

function stopDragging() {
    if (!isDragging) return;

    isDragging = false;
    orbitContainer.classList.remove("dragging");

    suppressClick = moved && startedOnLink;
}

window.addEventListener("pointerup", stopDragging);
window.addEventListener("pointercancel", stopDragging);
orbitContainer?.addEventListener("click", event => {
    if (!suppressClick || event.detail === 0) return;

    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
});
window.addEventListener("resize", renderOrbit);
renderOrbit();

orbitItems.forEach((item, index) => {
    item.addEventListener("click", event => {
        if (suppressClick) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick = false;
            return;
        }

        if (
            event.defaultPrevented
            || event.button !== 0
            || event.metaKey
            || event.ctrlKey
            || event.shiftKey
            || event.altKey
        ) return;

        event.preventDefault();
        orbitItems.forEach(orbitItem => {
            orbitItem.dataset.active = String(orbitItem === item);
        });

        if (item.dataset.destination === currentPage && pageContent) {
            pageContent.scrollIntoView({
                behavior: reducedMotion.matches ? "auto" : "smooth",
                block: "start"
            });
            return;
        }

        const baseRotation = 2 - index;
        const targetRotation = baseRotation
            + Math.round((rotation - baseRotation) / orbitItems.length) * orbitItems.length;
        const initialRotation = rotation;
        const rotationChange = targetRotation - initialRotation;
        const startTime = performance.now();
        const duration = reducedMotion.matches ? 0 : 560;

        function animateSelection(now) {
            const progress = duration === 0
                ? 1
                : Math.min((now - startTime) / duration, 1);
            const easedProgress = 1 - (1 - progress) ** 3;

            rotation = initialRotation + rotationChange * easedProgress;
            renderOrbit();

            if (progress < 1) {
                requestAnimationFrame(animateSelection);
                return;
            }

            window.location.href = item.href;
        }

        requestAnimationFrame(animateSelection);
    });
});

const skills = [
    {
        id: "html",
        name: "HTML",
        logo: "assets/icons/skills/html.svg",
        status: "Learning",
        description: "Structures web pages with meaningful, accessible content.",
        topics: [],
        projects: []
    },
    {
        id: "css",
        name: "CSS",
        logo: "assets/icons/skills/css.svg",
        status: "Learning",
        description: "Styles interfaces, layouts, and responsive experiences.",
        topics: [],
        projects: []
    },
    {
        id: "javascript",
        name: "JavaScript",
        logo: "assets/icons/skills/javascript.svg",
        status: "Learning",
        description: "Adds behavior and interaction to web experiences.",
        topics: [],
        projects: []
    },
    {
        id: "python",
        name: "Python",
        logo: "assets/icons/skills/python.svg",
        status: "Learning",
        description: "A general-purpose language for scripting and software.",
        topics: [],
        projects: []
    },
    {
        id: "c",
        name: "C Programming",
        logo: "assets/icons/skills/c.svg",
        status: "Learning",
        description: "A foundational language for structured programming.",
        topics: [],
        projects: []
    },
    {
        id: "java",
        name: "Java",
        logo: "assets/icons/skills/java.svg",
        status: "Learning",
        description: "An object-oriented language for application development.",
        topics: [],
        projects: []
    },
    {
        id: "sql",
        name: "SQL / Databases",
        logo: "assets/icons/skills/mysql.svg",
        status: "Learning",
        description: "Works with structured data in relational databases.",
        topics: [],
        projects: []
    },
    {
        id: "jewellery-cad",
        name: "Jewellery CAD / Rhinoceros 3D",
        logo: "",
        status: "Learning",
        description: "An ongoing journey in jewellery modelling and design using Rhinoceros 3D (Rhino 8).",
        topics: [
            "Jewellery 3D modelling",
            "Ring design",
            "Necklace and earring modelling",
            "Stone placement concepts",
            "Jewellery detailing",
            "3D rendering and design presentation"
        ],
        projects: []
    }
];

const certificates = [
    {
        title: "Diploma in Computer Aided Jewellery Designing",
        issuer: "Solitaire Diamond Institute",
        skillId: "jewellery-cad",
        completionDate: "October 2026",
        image: "assets/images/cad/CAD-CERTIFICATE.jpeg",
        pdf: "",
        verificationUrl: ""
    }
];

function renderSkillCards() {
    return skills.map(skill => `
        <button
            class="skill-card"
            type="button"
            data-skill-id="${skill.id}"
            aria-label="View ${skill.name} skill details"
        >
            <span class="skill-card-top">
                ${skill.logo
                    ? `<img class="skill-logo" src="${skill.logo}" alt="" loading="lazy" decoding="async">`
                    : `<span class="skill-logo skill-logo-placeholder" aria-hidden="true">CAD</span>`}
                <span class="skill-card-arrow" aria-hidden="true">↗</span>
            </span>
            <span class="skill-card-name">${skill.name}</span>
            <span class="skill-status">${skill.status}</span>
            <span class="skill-card-description">${skill.description}</span>
            <span class="skill-card-action">Explore skill</span>
        </button>
    `).join("");
}

function renderCertificateEntries(skillId = null) {
    const matchingCertificates = certificates.filter(certificate =>
        !skillId || certificate.skillId === skillId
    );

    if (matchingCertificates.length === 0) {
        return `
            <article class="certificate-placeholder">
                <p class="skill-section-kicker">CERTIFICATE RECORD</p>
                <h4>Details to be added</h4>
                <dl class="certificate-fields">
                    <div><dt>Title</dt><dd>Add the certificate title</dd></div>
                    <div><dt>Issuer</dt><dd>Add the issuing organization</dd></div>
                    <div><dt>Related skill</dt><dd>Select a related skill</dd></div>
                    <div><dt>Completed</dt><dd>Add the completion date</dd></div>
                    <div>
                        <dt>Certificate file</dt>
                        <dd>Add an image or PDF under assets/certificates/</dd>
                    </div>
                    <div>
                        <dt>Verification</dt>
                        <dd>Add a verification URL when available</dd>
                    </div>
                </dl>
            </article>
        `;
    }

    return matchingCertificates.map(certificate => {
        const relatedSkill = skills.find(skill => skill.id === certificate.skillId);
        const certificateFile = certificate.image || certificate.pdf;
        const certificateFileLabel = certificate.image
            ? "View certificate image"
            : "Open certificate PDF";

        return `
            <article class="certificate-entry">
                <p class="skill-section-kicker">CERTIFICATE RECORD</p>
                <h4>${certificate.title || "Certificate title to be added"}</h4>
                <dl class="certificate-fields">
                    <div>
                        <dt>Issuer</dt>
                        <dd>${certificate.issuer || "Add issuing organization"}</dd>
                    </div>
                    <div>
                        <dt>Related skill</dt>
                        <dd>${relatedSkill?.name || "Select a related skill"}</dd>
                    </div>
                    <div>
                        <dt>Completed</dt>
                        <dd>${certificate.completionDate || "Add completion date"}</dd>
                    </div>
                </dl>
                <div class="certificate-links">
                    ${certificateFile
                        ? `<a href="${certificateFile}" target="_blank" rel="noopener noreferrer">${certificateFileLabel}</a>`
                        : `<span>Certificate image or PDF not added</span>`}
                    ${certificate.verificationUrl
                        ? `<a href="${certificate.verificationUrl}" target="_blank" rel="noopener noreferrer">Verify certificate</a>`
                        : `<span>Verification URL not provided</span>`}
                </div>
                ${certificate.image
                    ? `<img class="certificate-image" src="${certificate.image}" alt="${certificate.title || "Certificate"}" loading="lazy" decoding="async">`
                    : ""}
            </article>
        `;
    }).join("");
}

function renderSkillList(title, items, emptyMessage) {
    const itemMarkup = items.length
        ? `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`
        : `<p class="skill-detail-placeholder">${emptyMessage}</p>`;

    return `
        <section class="skill-detail-section">
            <h4>${title}</h4>
            ${itemMarkup}
        </section>
    `;
}

function renderSkillsOverview() {
    return `
        <div class="skills-experience">
            <header class="skills-intro">
                <p class="skill-section-kicker">A FOUNDATION IN PROGRESS</p>
                <h3>Tools I’m learning to build with.</h3>
                <p>
                    Explore my current technologies, learning notes, practical
                    work, and certificate records. Open a skill to see its
                    details.
                </p>
            </header>

            <section class="skills-catalog" aria-label="Technology skills">
                <div class="skills-grid">
                    ${renderSkillCards()}
                </div>
            </section>

            <section class="skills-certifications" aria-labelledby="certifications-title">
                <div class="skills-section-heading">
                    <p class="skill-section-kicker">PROOF OF LEARNING</p>
                    <h3 id="certifications-title">Certifications</h3>
                    <p>
                        Certificate details will be added when the title,
                        issuer, and supporting information are available.
                    </p>
                </div>
                <div class="certificate-list">
                    ${renderCertificateEntries()}
                </div>
            </section>
        </div>
    `;
}

function renderSkillDetails(skill) {
    return `
        <div class="skill-detail-view">
            <button
                class="skill-back-button"
                type="button"
                data-back-to-skills="${skill.id}"
            >
                <span aria-hidden="true">←</span> Back to all skills
            </button>

            <header class="skill-detail-heading">
                ${skill.logo
                    ? `<img class="skill-logo" src="${skill.logo}" alt="" loading="lazy" decoding="async">`
                    : `<span class="skill-logo skill-logo-placeholder" aria-hidden="true">CAD</span>`}
                <div>
                    <p class="skill-status">${skill.status}</p>
                    <h3>${skill.name}</h3>
                </div>
            </header>

            <p class="skill-detail-intro">${skill.description}</p>

            <div class="skill-detail-grid">
                ${renderSkillList(
                    "Topics & concepts",
                    skill.topics,
                    "Add the topics and concepts you have studied for this skill."
                )}
                ${renderSkillList(
                    "Practical projects",
                    skill.projects,
                    "Add a project name and your contribution when ready."
                )}
            </div>

            <section class="skill-detail-certifications">
                <p class="skill-section-kicker">MILESTONES</p>
                <h4>Certificates & achievements</h4>
                <div class="certificate-list">
                    ${renderCertificateEntries(skill.id)}
                </div>
            </section>
        </div>
    `;
}

const softwareProjects = [
    {
        id: "junctionlens",
        name: "JunctionLens",
        fullTitle: "Incident-Aware Traffic Decision Support",
        description: "A traffic and road management decision-support simulator focused on analysing junction bottlenecks and incidents.",
        technologies: [],
        status: "Project details to be added",
        coverImage: "",
        githubUrl: "",
        liveDemoUrl: ""
    },
    {
        id: "speed",
        name: "S.P.E.E.D.",
        fullTitle: "Smart Personalized Engineering Education & Development System",
        description: "My Java-based engineering learning and productivity project.",
        technologies: ["Java"],
        status: "Project details to be added",
        coverImage: "",
        githubUrl: "",
        liveDemoUrl: ""
    },
    {
        id: "water-quality",
        name: "Community Project — Water Quality System",
        fullTitle: "Water Quality Monitoring, Reporting & Local Information Access",
        description: "A community project focused on water quality monitoring, reporting and local information access.",
        technologies: [],
        status: "Project details to be added",
        coverImage: "",
        githubUrl: "",
        liveDemoUrl: ""
    },
    {
        id: "knew-career-lens",
        name: "Knew — Career Lens Project",
        fullTitle: "Career Lens",
        description: "A project associated with my participation in Knew.",
        technologies: [],
        status: "Project details to be added",
        coverImage: "",
        githubUrl: "",
        liveDemoUrl: ""
    }
];

const skJewelsSections = [
    {
        id: "brand",
        number: "01",
        title: "Brand & Identity",
        description: "SK JEWELS — Pavagada SK Jewellery. A jewellery brand identity shaped around a premium black-and-gold visual direction.",
        highlights: [
            "Brand presentation",
            "Logo and visual identity",
            "Premium black-and-gold direction"
        ],
        images: []
    },
    {
        id: "website",
        number: "02",
        title: "Website Development",
        description: "Jewellery website design and development, including the homepage, hero section, product presentation and responsive UI.",
        highlights: [
            "Homepage and hero section",
            "Product presentation",
            "Responsive UI design"
        ],
        images: [],
        projectUrl: ""
    },
    {
        id: "products",
        number: "03",
        title: "Jewellery Product Presentation",
        description: "Presentation of 925 sterling silver and gold-polished silver jewellery, including necklaces, earrings, bracelets and other designs.",
        highlights: [
            "925 sterling silver",
            "Gold-polished silver",
            "Necklaces, earrings, bracelets and more",
            "Product photography and visual presentation"
        ],
        images: []
    },
    {
        id: "creatives",
        number: "04",
        title: "Digital Marketing & AI Creatives",
        description: "A creative direction for jewellery promotion across social platforms and campaign concepts.",
        highlights: [
            "Instagram promotional posters",
            "AI-generated jewellery model visuals",
            "Jewellery advertising concepts",
            "Social media creatives and promotional campaigns"
        ],
        images: []
    }
];

const cadCategories = [
    { id: "rings", title: "Rings" },
    { id: "necklaces", title: "Necklaces" },
    { id: "earrings-jhumkas", title: "Earrings & Jhumkas" },
    { id: "bracelets", title: "Bracelets" },
    { id: "other", title: "Other Jewellery Designs" }
];

const cadDesigns = [
    {
        id: "ring",
        category: "rings",
        name: "Ring",
        description: "A rendered ring design created in Rhinoceros 3D.",
        software: "Rhinoceros 3D (Rhino 8)",
        details: "",
        images: [
            {
                src: "assets/images/cad/RING.jpeg",
                alt: "Rendered ring design with a green centre stone"
            }
        ]
    },
    {
        id: "necklace",
        category: "necklaces",
        name: "Necklace",
        description: "A rendered necklace design created in Rhinoceros 3D.",
        software: "Rhinoceros 3D (Rhino 8)",
        details: "",
        images: [
            {
                src: "assets/images/cad/NECKLACE.jpeg",
                alt: "Rendered gold necklace design"
            }
        ]
    },
    {
        id: "jhumka",
        category: "earrings-jhumkas",
        name: "Jhumka Earrings",
        description: "A rendered pair of jhumka earrings created in Rhinoceros 3D.",
        software: "Rhinoceros 3D (Rhino 8)",
        details: "",
        images: [
            {
                src: "assets/images/cad/JHUMKA.jpeg",
                alt: "Rendered pair of gold jhumka earrings"
            }
        ]
    },
    {
        id: "bangle",
        category: "bracelets",
        name: "Bangle",
        description: "A rendered bangle design created in Rhinoceros 3D.",
        software: "Rhinoceros 3D (Rhino 8)",
        details: "",
        images: [
            {
                src: "assets/images/cad/BANGLE.jpeg",
                alt: "Rendered gold bangle design"
            }
        ]
    },
    {
        id: "pendant",
        category: "other",
        name: "Pendant",
        description: "A rendered pendant design created in Rhinoceros 3D.",
        software: "Rhinoceros 3D (Rhino 8)",
        details: "",
        images: [
            {
                src: "assets/images/cad/PENDENT.jpeg",
                alt: "Rendered gold pendant design with gemstone details"
            }
        ]
    }
];

const cadDocuments = [
    {
        id: "cad-certificate",
        title: "Diploma in Computer Aided Jewellery Designing",
        kind: "Certificate",
        src: "assets/images/cad/CAD-CERTIFICATE.jpeg",
        alt: "Diploma certificate from Solitaire Diamond Institute"
    },
    {
        id: "cad-marks-sheet",
        title: "Computer Aided Jewellery Designing",
        kind: "Marks Sheet",
        src: "assets/images/cad/CAD-MARKS-SHEET.jpeg",
        alt: "Marks sheet for the Computer Aided Jewellery Designing diploma"
    }
];

const attendedEvents = [
    {
        id: "buildathon",
        name: "BUILDATHON",
        category: "Hackathon / Technical Event",
        description: "A technical event entry. Participation details, project information and event materials can be added here.",
        participation: "",
        projectName: "",
        date: "",
        organizer: "",
        images: [],
        certificateImage: "",
        certificatePdf: "assets/images/events/Buildathon-Certificate.pdf",
        certificateTitle: "Buildathon Certificate"
    },
    {
        id: "codeverse",
        name: "CODEVERSE",
        category: "Technical Event",
        description: "A technical event entry. Description, participation details and event materials can be added here.",
        participation: "",
        date: "",
        organizer: "",
        images: [],
        certificateImage: "",
        certificatePdf: "",
        certificateTitle: ""
    },
    {
        id: "knew-career-lens",
        name: "KNEW — CAREER LENS PROJECT",
        category: "Project / Event Participation",
        description: "Career Lens project information and participation details can be added here.",
        participation: "",
        projectName: "Career Lens",
        date: "",
        organizer: "",
        images: [],
        certificateImage: "",
        certificatePdf: "",
        certificateTitle: ""
    },
    {
        id: "sambhram-conference",
        name: "SAMBHRAM INTERNATIONAL CONFERENCE",
        category: "International Conference / Paper Presentation",
        description: "Conference and presentation details for the paper listed below can be added here.",
        paperTitle: "Are AI Health Chatbots Ready for Indian Languages.",
        participation: "",
        date: "",
        organizer: "",
        paperUrl: "",
        images: [],
        certificateImage: "",
        certificatePdf: "",
        certificateTitle: ""
    }
];

const projectSections = [
    {
        id: "software",
        number: "01",
        title: "Software & Engineering Projects",
        description: "Software, engineering, and community-focused work."
    },
    {
        id: "sk-jewels",
        number: "02",
        title: "SK JEWELS — My Main Project",
        description: "Jewellery branding, web development, product presentation, and creative work."
    },
    {
        id: "cad",
        number: "03",
        title: "CAD Jewellery Works",
        description: "A luxury gallery of original jewellery designs modelled in Rhinoceros 3D (Rhino 8)."
    },
    {
        id: "events",
        number: "04",
        title: "Attended Events & Experiences",
        description: "Technical events, project participation, and an academic conference."
    }
];

function renderMedia(image, label, className = "project-media") {
    return image
        ? `<img class="${className}" src="${image}" alt="${label}" loading="lazy" decoding="async">`
        : `
            <div class="${className} project-media-placeholder" role="img" aria-label="${label} image to be added">
                <span class="media-placeholder-mark" aria-hidden="true">✦</span>
                <span>Image to be added</span>
            </div>
        `;
}

function renderProjectLinks(project) {
    const links = [];

    if (project.githubUrl) {
        links.push(`<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a>`);
    }

    if (project.liveDemoUrl) {
        links.push(`<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`);
    }

    return links.length
        ? `<div class="project-links">${links.join("")}</div>`
        : `<p class="project-link-placeholder">Repository and live demo links can be added when available.</p>`;
}

function renderProjectsOverview() {
    return `
        <div class="projects-experience">
            <header class="projects-intro">
                <p class="projects-kicker">SELECTED WORK &amp; EXPERIENCES</p>
                <h3>Ideas made tangible.</h3>
                <p>
                    A collection of software, jewellery, design, and event
                    experiences. Choose a chapter to explore.
                </p>
            </header>
            <nav class="project-chapter-list" aria-label="Project categories">
                ${projectSections.map(section => `
                    <button
                        class="project-chapter project-chapter-${section.id}"
                        type="button"
                        data-project-section="${section.id}"
                    >
                        <span class="project-chapter-number">${section.number}</span>
                        <span class="project-chapter-copy">
                            <span class="project-chapter-title">${section.title}</span>
                            <span class="project-chapter-description">${section.description}</span>
                        </span>
                        <span class="project-chapter-arrow" aria-hidden="true">↗</span>
                    </button>
                `).join("")}
            </nav>
        </div>
    `;
}

function renderProjectBackButton(view = "overview", itemId = "") {
    return `
        <button class="project-back-button" type="button" data-project-back="${view}" data-project-id="${itemId}">
            <span aria-hidden="true">←</span> Back to My Projects
        </button>
    `;
}

function renderSoftwareProjects() {
    return `
        <div class="project-subview">
            ${renderProjectBackButton()}
            <header class="project-subview-heading">
                <p class="projects-kicker">01 / SOFTWARE &amp; ENGINEERING</p>
                <h3>Projects with purpose.</h3>
            </header>
            <div class="software-project-grid">
                ${softwareProjects.map(project => `
                    <article class="software-project-card">
                        ${renderMedia(project.coverImage, `${project.name} cover`)}
                        <div class="software-project-copy">
                            <p class="project-status">${project.status}</p>
                            <h4>${project.name}</h4>
                            <p class="project-full-title">${project.fullTitle}</p>
                            <p class="project-description">${project.description}</p>
                            <p class="project-technologies">
                                <span>Technologies</span>
                                ${project.technologies.length
                                    ? project.technologies.join(" · ")
                                    : "Details to be added"}
                            </p>
                            <button class="text-action" type="button" data-open-project="${project.id}">
                                View project details <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </article>
                `).join("")}
            </div>
        </div>
    `;
}

function renderSoftwareProjectDetails(project) {
    return `
        <div class="project-subview project-detail-view">
            ${renderProjectBackButton("software", project.id)}
            <header class="project-subview-heading">
                <p class="projects-kicker">SOFTWARE &amp; ENGINEERING</p>
                <h3>${project.name}</h3>
                <p class="project-full-title">${project.fullTitle}</p>
            </header>
            ${renderMedia(project.coverImage, `${project.name} project cover`, "project-detail-media")}
            <p class="project-description">${project.description}</p>
            <dl class="project-detail-facts">
                <div><dt>Status</dt><dd>${project.status}</dd></div>
                <div>
                    <dt>Technologies</dt>
                    <dd>${project.technologies.length ? project.technologies.join(" · ") : "To be confirmed"}</dd>
                </div>
            </dl>
            ${renderProjectLinks(project)}
        </div>
    `;
}

function renderJewelsSection(section) {
    const gallery = section.images.length
        ? `
            <div class="jewels-gallery">
                ${section.images.map((image, index) => `
                    <button
                        class="jewels-gallery-item"
                        type="button"
                        data-gallery-open="jewels"
                        data-gallery-id="${section.id}"
                        data-gallery-index="${index}"
                        aria-label="View ${section.title} image ${index + 1}"
                    >
                        ${renderMedia(image.src, image.alt || section.title)}
                    </button>
                `).join("")}
            </div>
        `
        : `
            <div class="jewels-gallery-placeholder">
                ${renderMedia("", `${section.title} showcase`)}
                <p>Add your original SK JEWELS images to <code>assets/images/sk-jewels/</code>, then list them in this section's <code>images</code> array.</p>
            </div>
        `;

    return `
        <section class="jewels-section jewels-section-${section.id}">
            <div class="jewels-section-copy">
                <p class="jewels-section-number">${section.number} / SK JEWELS</p>
                <h4>${section.title}</h4>
                <p>${section.description}</p>
                <ul>${section.highlights.map(item => `<li>${item}</li>`).join("")}</ul>
                ${section.projectUrl
                    ? `<a class="project-inline-link" href="${section.projectUrl}" target="_blank" rel="noopener noreferrer">Visit project ↗</a>`
                    : ""}
            </div>
            ${gallery}
        </section>
    `;
}

function renderSkJewels() {
    return `
        <div class="project-subview sk-jewels-view">
            ${renderProjectBackButton()}
            <header class="jewels-hero">
                <p class="jewels-wordmark">SK <span>JEWELS</span></p>
                <p class="jewels-location">PAVAGADA SK JEWELLERY</p>
                <p class="jewels-summary">
                    A main creative and practical project bringing together
                    jewellery branding, website development, product
                    presentation, digital marketing, and AI-assisted creative work.
                </p>
            </header>
            <div class="jewels-sections">
                ${skJewelsSections.map(renderJewelsSection).join("")}
            </div>
        </div>
    `;
}

function renderCadGallery() {
    return `
        <div class="project-subview cad-gallery-view">
            ${renderProjectBackButton()}
            <header class="cad-gallery-intro">
                <p class="projects-kicker">03 / THE DESIGN ATELIER · RHINOCEROS 3D</p>
                <h3>CAD Jewellery Works</h3>
                <p>
                    A study in form, light and fine detail. Explore a selection
                    of original jewellery designs modelled in Rhino 8.
                </p>
                <span class="cad-gallery-rule" aria-hidden="true"></span>
            </header>
            <section class="cad-documents" aria-labelledby="cad-documents-title">
                <header class="cad-documents-heading">
                    <p class="projects-kicker">CREDENTIALS &amp; RECORDS</p>
                    <h3 id="cad-documents-title">A record of the craft.</h3>
                    <p>Certificate and course marks from the CAD jewellery design diploma.</p>
                </header>
                <div class="cad-document-grid">
                    ${cadDocuments.map(document => `
                        <button
                            class="cad-document-card"
                            type="button"
                            data-gallery-open="cad-document"
                            data-gallery-id="${document.id}"
                            data-gallery-index="0"
                            aria-label="View ${document.kind}: ${document.title}"
                        >
                            <span class="cad-document-image">
                                ${renderMedia(document.src, document.alt)}
                            </span>
                            <span class="cad-document-copy">
                                <span class="cad-document-kind">${document.kind}</span>
                                <span class="cad-document-title">${document.title}</span>
                                <span class="cad-document-action">View record <span aria-hidden="true">↗</span></span>
                            </span>
                        </button>
                    `).join("")}
                </div>
            </section>
            ${cadCategories.map(category => {
                const designs = cadDesigns.filter(design => design.category === category.id);

                return `
                    <section class="cad-category">
                        <div class="cad-category-heading">
                            <p class="jewels-section-number">CAD / ${category.title.toUpperCase()}</p>
                            <h4>${category.title}</h4>
                        </div>
                        ${designs.length
                            ? `
                                <div class="cad-design-grid">
                                    ${designs.map(design => `
                                        <button
                                            class="cad-design-card"
                                            type="button"
                                            data-cad-design-id="${design.id}"
                                            aria-label="Explore ${design.name} CAD design"
                                        >
                                            ${renderMedia(design.images[0]?.src, design.images[0]?.alt || design.name)}
                                            <span class="cad-design-meta">
                                                <span class="cad-design-name">${design.name}</span>
                                                <span class="cad-design-open" aria-hidden="true">↗</span>
                                            </span>
                                            <span class="cad-design-description">${design.description}</span>
                                        </button>
                                    `).join("")}
                                </div>
                            `
                            : `<p class="cad-empty-note">Original ${category.title.toLowerCase()} renders to be added.</p>`}
                    </section>
                `;
            }).join("")}
            <p class="cad-software-note">Designed in Rhinoceros 3D (Rhino 8).</p>
        </div>
    `;
}

function renderCadDesignDetails(design) {
    return `
        <div class="project-subview cad-detail-view">
            ${renderProjectBackButton("cad", design.id)}
            <header class="project-subview-heading">
                <p class="projects-kicker">RHINOCEROS 3D · RHINO 8</p>
                <h3>${design.name}</h3>
                <p>${design.description}</p>
            </header>
            <dl class="project-detail-facts">
                <div><dt>Category</dt><dd>${cadCategories.find(item => item.id === design.category)?.title || "Jewellery design"}</dd></div>
                <div><dt>CAD software</dt><dd>${design.software || "Rhinoceros 3D (Rhino 8)"}</dd></div>
                ${design.details ? `<div><dt>Design details</dt><dd>${design.details}</dd></div>` : ""}
            </dl>
            ${design.images.length
                ? `
                    <div class="cad-design-gallery">
                        ${design.images.map((image, index) => `
                            <button
                                class="cad-gallery-image"
                                type="button"
                                data-gallery-open="cad"
                                data-gallery-id="${design.id}"
                                data-gallery-index="${index}"
                                aria-label="View ${design.name} image ${index + 1}"
                            >
                                ${renderMedia(image.src, image.alt || design.name)}
                            </button>
                        `).join("")}
                    </div>
                `
                : `<div class="cad-empty-render">${renderMedia("", `${design.name} render`)}</div>`}
        </div>
    `;
}

function renderEventCards() {
    return `
        <div class="event-card-grid">
            ${attendedEvents.map(event => `
                <article class="event-card">
                    ${renderMedia(event.images[0]?.src, `${event.name} event`)}
                    <div class="event-card-copy">
                        <p class="event-category">${event.category}</p>
                        <h4>${event.name}</h4>
                        <p>${event.description}</p>
                        <p class="event-certificate-status">
                            ${event.certificateImage || event.certificatePdf
                                ? "Certificate available"
                                : "Certificate coming soon"}
                        </p>
                        <button class="text-action" type="button" data-event-id="${event.id}">
                            View details <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </article>
            `).join("")}
        </div>
    `;
}

function renderEvents() {
    return `
        <div class="project-subview events-view">
            ${renderProjectBackButton()}
            <header class="project-subview-heading">
                <p class="projects-kicker">04 / ATTENDED EVENTS &amp; EXPERIENCES</p>
                <h3>Learning beyond the screen.</h3>
                <p>
                    Technical events, project participation, and an academic
                    conference. Event details and original records can be added
                    as they become available.
                </p>
            </header>
            ${renderEventCards()}
        </div>
    `;
}

function renderEventDetails(event) {
    const certificatePreview = event.certificateImage
        ? `
            <button
                class="event-certificate-preview"
                type="button"
                data-gallery-open="event-certificate"
                data-gallery-id="${event.id}"
                data-gallery-index="0"
                aria-label="View ${event.certificateTitle || event.name} certificate"
            >
                ${renderMedia(event.certificateImage, event.certificateTitle || `${event.name} certificate`)}
                <span>View certificate</span>
            </button>
        `
        : `
            <div class="event-certificate-placeholder">
                <span class="media-placeholder-mark" aria-hidden="true">✦</span>
                <strong>Certificate coming soon</strong>
                <span>Add the certificate image under <code>assets/images/events/</code>.</span>
            </div>
        `;

    return `
        <div class="project-subview event-detail-view">
            ${renderProjectBackButton("events", event.id)}
            <header class="project-subview-heading">
                <p class="event-category">${event.category}</p>
                <h3>${event.name}</h3>
                ${event.paperTitle ? `<p class="event-paper-title">“${event.paperTitle}”</p>` : ""}
                <p>${event.description}</p>
            </header>
            <dl class="project-detail-facts event-detail-facts">
                <div><dt>Date</dt><dd>${event.date || "To be added"}</dd></div>
                <div><dt>Organizing institution</dt><dd>${event.organizer || "To be added"}</dd></div>
                ${event.projectName ? `<div><dt>Project</dt><dd>${event.projectName}</dd></div>` : ""}
                <div class="fact-full"><dt>Participation details</dt><dd>${event.participation || "Details to be added"}</dd></div>
            </dl>
            ${event.images.length
                ? `
                    <div class="event-photo-gallery">
                        ${event.images.map((image, index) => `
                            <button
                                class="event-photo"
                                type="button"
                                data-gallery-open="event-photo"
                                data-gallery-id="${event.id}"
                                data-gallery-index="${index}"
                                aria-label="View ${event.name} photo ${index + 1}"
                            >
                                ${renderMedia(image.src, image.alt || `${event.name} event photo`)}
                            </button>
                        `).join("")}
                    </div>
                `
                : ""}
            ${event.paperUrl
                ? `<a class="project-inline-link" href="${event.paperUrl}" target="_blank" rel="noopener noreferrer">View paper or presentation ↗</a>`
                : ""}
            <section class="event-certificate-section">
                <p class="projects-kicker">EVENT RECORD</p>
                <h4>${event.certificateTitle || "Participation certificate"}</h4>
                ${certificatePreview}
                ${event.certificatePdf
                    ? `<a class="project-inline-link" href="${event.certificatePdf}" target="_blank" rel="noopener noreferrer">Open certificate PDF ↗</a>`
                    : ""}
            </section>
        </div>
    `;
}

function getGalleryImages(type, id) {
    if (type === "cad") {
        return cadDesigns.find(design => design.id === id)?.images || [];
    }

    if (type === "cad-document") {
        const document = cadDocuments.find(item => item.id === id);
        return document ? [{ src: document.src, alt: document.alt }] : [];
    }

    if (type === "jewels") {
        return skJewelsSections.find(section => section.id === id)?.images || [];
    }

    const event = attendedEvents.find(item => item.id === id);

    if (type === "event-certificate" && event?.certificateImage) {
        return [{
            src: event.certificateImage,
            alt: event.certificateTitle || `${event.name} certificate`
        }];
    }

    return event?.images || [];
}

function renderGalleryViewer(type, id, index) {
    const images = getGalleryImages(type, id);
    const image = images[index];

    if (!image) return "";

    return `
        <div class="project-subview image-viewer">
            <button
                class="project-back-button"
                type="button"
                data-gallery-back="${type}"
                data-gallery-id="${id}"
            >
                <span aria-hidden="true">←</span> Back to details
            </button>
            <div class="image-viewer-stage">
                <img src="${image.src}" alt="${image.alt || "Project gallery image"}" decoding="async">
                ${images.length > 1
                    ? `
                        <div class="image-viewer-controls">
                            <button type="button" data-gallery-step="-1" data-gallery-type="${type}" data-gallery-id="${id}" data-gallery-index="${index}" aria-label="Previous image">←</button>
                            <span>${index + 1} / ${images.length}</span>
                            <button type="button" data-gallery-step="1" data-gallery-type="${type}" data-gallery-id="${id}" data-gallery-index="${index}" aria-label="Next image">→</button>
                        </div>
                    `
                    : ""}
            </div>
            <p class="image-viewer-caption">${image.alt || "Project image"}</p>
        </div>
    `;
}

function renderProjectView(sectionId) {
    if (sectionId === "software") return renderSoftwareProjects();
    if (sectionId === "sk-jewels") return renderSkJewels();
    if (sectionId === "cad") return renderCadGallery();
    if (sectionId === "events") return renderEvents();
    return renderProjectsOverview();
}

const socialProfiles = [
    {
        name: "LinkedIn",
        description: "Professional networking and career journey.",
        logo: "assets/icons/socials/linkedin.svg",
        url: "https://www.linkedin.com/in/jashwanthachar-t-s?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    },
    {
        name: "GitHub",
        description: "My coding projects and development journey.",
        logo: "assets/icons/socials/github.svg",
        url: "https://github.com/jashwanthachar"
    },
    {
        name: "Instagram",
        description: "Creative work, AI-generated visuals and jewellery content.",
        logo: "assets/icons/socials/instagram.svg",
        url: "https://www.instagram.com/jashwanth_achar?exln=dnpsZm5qaWFrZHNh"
    },
    {
        name: "YouTube",
        description: "Tech with Jash — technology, learning and development content.",
        logo: "assets/icons/socials/youtube.svg",
        url: "https://www.youtube.com/@TechWithJash-j6x"
    },
    {
        name: "X",
        description: "Short updates and conversations.",
        logo: "assets/icons/socials/x.svg",
        url: "https://x.com/Jashwanth_achar"
    },
    {
        name: "Threads",
        description: "Conversations and updates.",
        logo: "assets/icons/socials/threads.svg",
        url: "https://www.threads.com/@jashwanth_achar"
    }
];

function renderSocialCards() {
    return socialProfiles.map(profile => {
        const cardContent = `
            <span class="social-card-heading">
                <img class="social-card-logo" src="${profile.logo}" alt="" loading="lazy" decoding="async">
                <span class="social-card-arrow" aria-hidden="true">${profile.url ? "↗" : "○"}</span>
            </span>
            <span class="social-card-name">${profile.name}</span>
            <span class="social-card-description">${profile.description}</span>
            <span class="social-card-action">
                ${profile.url ? `Visit ${profile.name} profile` : "Profile link to be added"}
            </span>
        `;

        return profile.url
            ? `
                <a
                    class="social-card"
                    href="${profile.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit ${profile.name} profile (opens in a new tab)"
                >
                    ${cardContent}
                </a>
            `
            : `
                <article class="social-card social-card-unavailable" aria-label="${profile.name} profile link to be added">
                    ${cardContent}
                </article>
            `;
    }).join("");
}

function renderSocials() {
    return `
        <div class="socials-experience">
            <header class="socials-intro">
                <p class="socials-kicker">MY DIGITAL PRESENCE</p>
                <h3>FIND ME ACROSS THE DIGITAL WORLD.</h3>
                <p>Let's connect, collaborate and create something meaningful.</p>
            </header>
            <div class="socials-grid" aria-label="Social profiles">
                ${renderSocialCards()}
            </div>
        </div>
    `;
}

const destinationPages = {
    about: {
        body: `
            <div class="about-experience">
                <header class="about-intro">
                    <p class="about-kicker">THE PERSON BEHIND THE IDEAS</p>
                    <p class="about-lede">
                        I'm Jashwanthachar — a Computer Science Engineering
                        student who loves exploring where thoughtful software
                        and creative ideas meet.
                    </p>
                    <p class="about-copy">
                        I enjoy learning by making: understanding a problem,
                        imagining a useful experience, then building toward it
                        one step at a time.
                    </p>
                </header>

                <div class="about-detail-grid">
                    <section class="about-section about-journey">
                        <p class="about-section-number">01 / THE JOURNEY</p>
                        <h3>Curiosity, shaped into craft.</h3>
                        <p>
                            My Computer Science Engineering journey is teaching
                            me how ideas become systems. Each new concept is a
                            chance to ask better questions, strengthen my
                            foundations and make something more useful.
                        </p>
                    </section>

                    <section class="about-section about-interests">
                        <p class="about-section-number">02 / WHAT INSPIRES ME</p>
                        <h3>Technology with imagination.</h3>
                        <ul class="about-interest-list">
                            <li>Software engineering</li>
                            <li>Artificial intelligence</li>
                            <li>Creative technology</li>
                            <li>UI/UX and digital experiences</li>
                        </ul>
                    </section>
                </div>

                <section class="about-section about-skills">
                    <p class="about-section-number">03 / TOOLS I’M LEARNING</p>
                    <h3>A growing technical toolkit.</h3>
                    <ul class="about-skill-list" aria-label="Technical skills">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>Python</li>
                        <li>Java</li>
                        <li>Databases</li>
                        <li>Git</li>
                    </ul>
                </section>

                <section class="about-section about-projects">
                    <p class="about-section-number">04 / SELECTED PROJECTS</p>
                    <h3>Ideas I’m exploring.</h3>
                    <div class="about-project-grid">
                        <article class="about-project">
                            <span class="about-project-index">01</span>
                            <h4>S.P.E.E.D.</h4>
                            <p class="about-project-name">
                                Smart Personalized Engineering Education &amp;
                                Development System
                            </p>
                            <p>
                                An education-focused system concept centered
                                on more personalized engineering learning and
                                development.
                            </p>
                        </article>

                        <article class="about-project">
                            <span class="about-project-index">02</span>
                            <h4>JunctionLens</h4>
                            <p class="about-project-name">
                                Incident-Aware Traffic Decision Support
                            </p>
                            <p>
                                A traffic decision-support concept focused on
                                bringing incident awareness into the picture.
                            </p>
                        </article>

                        <article class="about-project">
                            <span class="about-project-index">03</span>
                            <h4>Smart Irrigation</h4>
                            <p class="about-project-name">
                                IoT-Based Smart Irrigation System
                            </p>
                            <p>
                                An exploration of connected technology for
                                smarter irrigation.
                            </p>
                        </article>
                    </div>
                </section>

                <section class="about-ambition">
                    <p class="about-section-number">05 / WHAT’S AHEAD</p>
                    <h3>Building toward what’s next.</h3>
                    <p>
                        My ambition is to become a skilled software engineer
                        and AI engineer — creating technology that is
                        considered, capable and meaningful to the people who
                        use it.
                    </p>
                </section>
            </div>
        `
    },

    skills: {
        body: renderSkillsOverview()
    },

    contact: {
        body: `
            <div class="contact-experience">
                <header class="contact-intro">
                    <p class="contact-kicker">OPEN TO IDEAS &amp; COLLABORATION</p>
                    <h3>LET'S CONNECT.</h3>
                    <p>
                        Have an idea, opportunity, or project in mind?
                        I'd love to hear from you.
                    </p>
                </header>

                <section class="contact-methods" aria-label="Contact methods">
                    <div class="contact-method">
                        <span class="contact-method-label">Email</span>
                        <a
                            class="contact-method-value contact-method-link"
                            href="mailto:jashwanthachar@gmail.com"
                        >
                            jashwanthachar@gmail.com
                        </a>
                    </div>
                    <div class="contact-method">
                        <span class="contact-method-label">Phone</span>
                        <a
                            class="contact-method-value contact-method-link"
                            href="tel:+916363723106"
                        >
                            +91 6363723106
                        </a>
                    </div>
                    <div class="contact-method">
                        <span class="contact-method-label">LinkedIn</span>
                        <a
                            class="contact-method-value contact-method-link"
                            href="https://www.linkedin.com/in/jashwanthachar-t-s?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_android"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View LinkedIn profile
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                    <div class="contact-method">
                        <span class="contact-method-label">GitHub</span>
                        <a
                            class="contact-method-value contact-method-link"
                            href="https://github.com/jashwanthachar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View GitHub profile
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </section>

                <form class="contact-form" id="contact-form">
                    <div class="contact-form-heading">
                        <p class="contact-kicker">START A CONVERSATION</p>
                        <h4>Send a message</h4>
                    </div>

                    <div class="contact-form-grid">
                        <div class="contact-field">
                            <label for="contact-name">Name</label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                autocomplete="name"
                                required
                            >
                        </div>

                        <div class="contact-field">
                            <label for="contact-email">Email</label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                            >
                        </div>

                        <div class="contact-field contact-field-full">
                            <label for="contact-subject">Subject</label>
                            <input
                                id="contact-subject"
                                name="subject"
                                type="text"
                                minlength="3"
                                required
                            >
                        </div>

                        <div class="contact-field contact-field-full">
                            <label for="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows="5"
                                minlength="10"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div class="contact-form-footer">
                        <button class="contact-submit" type="submit">
                            Send Message <span aria-hidden="true">→</span>
                        </button>
                        <p class="contact-form-note" id="contact-form-note">
                            This form is a frontend prototype. Messages are not
                            sent or stored.
                        </p>
                    </div>

                    <p
                        class="contact-form-status"
                        id="contact-form-status"
                        role="status"
                        aria-live="polite"
                    ></p>
                </form>
            </div>
        `
    },

    projects: {
        body: renderProjectsOverview()
    },

    socials: {
        body: renderSocials()
    }
};

if (pageContent && destinationPages[currentPage]) {
    pageContent.innerHTML = destinationPages[currentPage].body;
}

if (location.hash === "#open-destination") {
    const scrollToDestination = () => {
        window.setTimeout(() => {
            document.getElementById("destination-page")?.scrollIntoView({
                behavior: reducedMotion.matches ? "auto" : "smooth",
                block: "start"
            });
        }, 80);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", scrollToDestination, { once: true });
    } else {
        scrollToDestination();
    }
}

pageContent?.addEventListener("click", event => {
    const sectionContent = event.target.closest(".destination-content");
    if (!sectionContent) return;

    const skillButton = event.target.closest("[data-skill-id]");

    if (skillButton && currentPage === "skills") {
        const skill = skills.find(item => item.id === skillButton.dataset.skillId);

        if (!skill) return;

        sectionContent.innerHTML = renderSkillDetails(skill);
        sectionContent.querySelector("[data-back-to-skills]").focus();
        return;
    }

    const backButton = event.target.closest("[data-back-to-skills]");

    if (backButton) {
        const skill = skills.find(item => item.id === backButton.dataset.backToSkills);

        if (!skill) return;

        sectionContent.innerHTML = renderSkillsOverview();

        const skillCard = [...sectionContent.querySelectorAll("[data-skill-id]")]
            .find(button => button.dataset.skillId === skill.id);

        skillCard?.focus();
        return;
    }

    if (currentPage !== "projects") return;

    const projectSectionButton = event.target.closest("[data-project-section]");

    if (projectSectionButton) {
        sectionContent.innerHTML = renderProjectView(projectSectionButton.dataset.projectSection);
        sectionContent.querySelector(".project-back-button")?.focus();
        return;
    }

    const projectBackButton = event.target.closest("[data-project-back]");

    if (projectBackButton) {
        const view = projectBackButton.dataset.projectBack;
        const itemId = projectBackButton.dataset.projectId;

        sectionContent.innerHTML = renderProjectView(view);

        const focusTarget = itemId
            ? sectionContent.querySelector(`[data-open-project="${itemId}"], [data-cad-design-id="${itemId}"], [data-event-id="${itemId}"]`)
            : sectionContent.querySelector(".project-back-button");

        focusTarget?.focus();
        return;
    }

    const softwareProjectButton = event.target.closest("[data-open-project]");

    if (softwareProjectButton) {
        const project = softwareProjects.find(item => item.id === softwareProjectButton.dataset.openProject);

        if (!project) return;

        sectionContent.innerHTML = renderSoftwareProjectDetails(project);
        sectionContent.querySelector(".project-back-button")?.focus();
        return;
    }

    const cadDesignButton = event.target.closest("[data-cad-design-id]");

    if (cadDesignButton) {
        const design = cadDesigns.find(item => item.id === cadDesignButton.dataset.cadDesignId);

        if (!design) return;

        sectionContent.innerHTML = renderCadDesignDetails(design);
        sectionContent.querySelector(".project-back-button")?.focus();
        return;
    }

    const eventButton = event.target.closest("[data-event-id]");

    if (eventButton) {
        const selectedEvent = attendedEvents.find(item => item.id === eventButton.dataset.eventId);

        if (!selectedEvent) return;

        sectionContent.innerHTML = renderEventDetails(selectedEvent);
        sectionContent.querySelector(".project-back-button")?.focus();
        return;
    }

    const galleryButton = event.target.closest("[data-gallery-open]");

    if (galleryButton) {
        const type = galleryButton.dataset.galleryOpen;
        const id = galleryButton.dataset.galleryId;
        const index = Number(galleryButton.dataset.galleryIndex);
        const image = getGalleryImages(type, id)[index];

        if (!image) return;

        sectionContent.innerHTML = renderGalleryViewer(type, id, index);
        sectionContent.querySelector(".project-back-button")?.focus();
        return;
    }

    const galleryBackButton = event.target.closest("[data-gallery-back]");

    if (galleryBackButton) {
        const type = galleryBackButton.dataset.galleryBack;
        const id = galleryBackButton.dataset.galleryId;

        if (type === "cad") {
            const design = cadDesigns.find(item => item.id === id);
            if (!design) return;
            sectionContent.innerHTML = renderCadDesignDetails(design);
        } else if (type === "cad-document") {
            sectionContent.innerHTML = renderCadGallery();
        } else if (type === "jewels") {
            sectionContent.innerHTML = renderSkJewels();
        } else {
            const selectedEvent = attendedEvents.find(item => item.id === id);
            if (!selectedEvent) return;
            sectionContent.innerHTML = renderEventDetails(selectedEvent);
        }

        sectionContent.querySelector(
            `[data-gallery-open="${type}"][data-gallery-id="${id}"]`
        )?.focus();
        return;
    }

    const galleryStepButton = event.target.closest("[data-gallery-step]");

    if (galleryStepButton) {
        const type = galleryStepButton.dataset.galleryType;
        const id = galleryStepButton.dataset.galleryId;
        const images = getGalleryImages(type, id);

        if (!images.length) return;

        const currentIndex = Number(galleryStepButton.dataset.galleryIndex);
        const direction = Number(galleryStepButton.dataset.galleryStep);
        const nextIndex = (currentIndex + direction + images.length) % images.length;

        sectionContent.innerHTML = renderGalleryViewer(type, id, nextIndex);
        sectionContent.querySelector(`[data-gallery-step="-${direction}"]`)?.focus();
    }
});

pageContent?.addEventListener("submit", event => {
    if (!event.target.matches("#contact-form")) return;

    event.preventDefault();

    const formStatus = event.target.querySelector("#contact-form-status");
    formStatus.textContent =
        "Your details are valid, but this form is not connected to a message service. Nothing was sent.";
});
