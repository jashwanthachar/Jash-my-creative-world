
console.log("Welcome to JASH Creative World!");
console.log("Our immersive portfolio journey begins.");

// ======================================
// JASH — ORBITAL NAVIGATION ENGINE
// ======================================

const orbitContainer = document.querySelector(".orbit-container");
const orbitItems = [...document.querySelectorAll(".orbit-item")];

let rotation = -90;
let isDragging = false;
let startX = 0;
let startRotation = 0;
let moved = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

const destinations = [
    "about",
    "skills",
    "contact",
    "projects",
    "socials"
];

// Position all five destinations around an ellipse.
function renderOrbit() {
    const width = orbitContainer.clientWidth;
    const height = orbitContainer.clientHeight;

    const radiusX = width * 0.40;
    const radiusY = height * 0.34;

    const centerX = width / 2;
    const centerY = height / 2;

    orbitItems.forEach((item, index) => {
        const angle =
            (rotation + index * (360 / orbitItems.length))
            * Math.PI / 180;

        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY + Math.sin(angle) * radiusY;

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
    });
}

const destinationPanel = document.getElementById("destination-panel");
const panelTitle = document.getElementById("panel-title");
const panelBody = document.getElementById("panel-body");
const closePanelButton = document.getElementById("panel-close");

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
        title: "To be added",
        issuer: "To be added",
        skillId: "jewellery-cad",
        completionDate: "To be added",
        image: "",
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
                    ? `<img class="skill-logo" src="${skill.logo}" alt="">`
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
                    ? `<img class="certificate-image" src="${certificate.image}" alt="${certificate.title || "Certificate"}">`
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
                    ? `<img class="skill-logo" src="${skill.logo}" alt="">`
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

const cadDesigns = [];

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
        certificatePdf: "",
        certificateTitle: ""
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
        description: "Jewellery design and 3D modelling work using Rhinoceros 3D (Rhino 8)."
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
        ? `<img class="${className}" src="${image}" alt="${label}">`
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
            <header class="project-subview-heading">
                <p class="projects-kicker">03 / RHINOCEROS 3D · RHINO 8</p>
                <h3>CAD Jewellery Works</h3>
                <p>
                    A growing jewellery design and 3D modelling practice.
                    Original renders will appear here as they are added.
                </p>
            </header>
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
                                        >
                                            ${renderMedia(design.images[0]?.src, design.name)}
                                            <span class="cad-design-name">${design.name}</span>
                                            <span class="cad-design-description">${design.description}</span>
                                            <span class="text-action">View design <span aria-hidden="true">→</span></span>
                                        </button>
                                    `).join("")}
                                </div>
                            `
                            : `<p class="cad-empty-note">Original ${category.title.toLowerCase()} renders to be added.</p>`}
                    </section>
                `;
            }).join("")}
            <p class="cad-software-note">CAD software: Rhinoceros 3D (Rhino 8)</p>
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
                <img src="${image.src}" alt="${image.alt || "Project gallery image"}">
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

const panelContent = {
    about: {
        title: "About Me",
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
        title: "Skills",
        body: renderSkillsOverview()
    },

    contact: {
        title: "Contact",
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
        title: "My Projects",
        body: renderProjectsOverview()
    },

    socials: {
        title: "Socials",
        body: `
            <h3>Find Me Online</h3>
            <p>Connect with me through my social platforms.</p>
            <p>LinkedIn · Instagram · YouTube</p>
        `
    }
};

let previousFocus = null;

function selectDestination(item) {
    const destination = item.dataset.destination;
    const content = panelContent[destination];

    if (!content) return;

    orbitItems.forEach(button => {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
    });

    item.classList.add("active");
    item.setAttribute("aria-pressed", "true");

    panelTitle.textContent = content.title;
    panelBody.innerHTML = content.body;

    previousFocus = item;

    destinationPanel.classList.add("is-open");
    destinationPanel.classList.toggle("is-about", destination === "about");
    destinationPanel.classList.toggle("is-skills", destination === "skills");
    destinationPanel.classList.toggle("is-contact", destination === "contact");
    destinationPanel.classList.toggle("is-projects", destination === "projects");
    destinationPanel.setAttribute("aria-hidden", "false");
    destinationPanel.inert = false;

    closePanelButton.focus();

    console.log("Opened:", destination);
}

function closeDestinationPanel() {
    destinationPanel.classList.remove("is-open");
    destinationPanel.classList.remove("is-about");
    destinationPanel.classList.remove("is-skills");
    destinationPanel.classList.remove("is-contact");
    destinationPanel.classList.remove("is-projects");
    destinationPanel.setAttribute("aria-hidden", "true");
    destinationPanel.inert = true;

    if (previousFocus) {
        previousFocus.focus();
    }
}

closePanelButton.addEventListener("click", closeDestinationPanel);

panelBody.addEventListener("click", event => {
    const skillButton = event.target.closest("[data-skill-id]");

    if (skillButton) {
        const skill = skills.find(item => item.id === skillButton.dataset.skillId);

        if (!skill) return;

        panelTitle.textContent = skill.name;
        panelBody.innerHTML = renderSkillDetails(skill);
        panelBody.querySelector("[data-back-to-skills]").focus();
        return;
    }

    const backButton = event.target.closest("[data-back-to-skills]");

    if (backButton) {
        const skill = skills.find(item => item.id === backButton.dataset.backToSkills);

        if (!skill) return;

        panelTitle.textContent = "Skills";
        panelBody.innerHTML = renderSkillsOverview();

        const skillCard = [...panelBody.querySelectorAll("[data-skill-id]")]
            .find(button => button.dataset.skillId === skill.id);

        skillCard?.focus();
        return;
    }

    const projectSectionButton = event.target.closest("[data-project-section]");

    if (projectSectionButton) {
        panelBody.innerHTML = renderProjectView(projectSectionButton.dataset.projectSection);
        panelBody.querySelector(".project-back-button")?.focus();
        return;
    }

    const projectBackButton = event.target.closest("[data-project-back]");

    if (projectBackButton) {
        const view = projectBackButton.dataset.projectBack;
        const itemId = projectBackButton.dataset.projectId;

        panelBody.innerHTML = renderProjectView(view);

        const focusTarget = itemId
            ? panelBody.querySelector(`[data-open-project="${itemId}"], [data-cad-design-id="${itemId}"], [data-event-id="${itemId}"]`)
            : panelBody.querySelector(".project-back-button");

        focusTarget?.focus();
        return;
    }

    const softwareProjectButton = event.target.closest("[data-open-project]");

    if (softwareProjectButton) {
        const project = softwareProjects.find(item => item.id === softwareProjectButton.dataset.openProject);

        if (!project) return;

        panelBody.innerHTML = renderSoftwareProjectDetails(project);
        panelBody.querySelector(".project-back-button")?.focus();
        return;
    }

    const cadDesignButton = event.target.closest("[data-cad-design-id]");

    if (cadDesignButton) {
        const design = cadDesigns.find(item => item.id === cadDesignButton.dataset.cadDesignId);

        if (!design) return;

        panelBody.innerHTML = renderCadDesignDetails(design);
        panelBody.querySelector(".project-back-button")?.focus();
        return;
    }

    const eventButton = event.target.closest("[data-event-id]");

    if (eventButton) {
        const selectedEvent = attendedEvents.find(item => item.id === eventButton.dataset.eventId);

        if (!selectedEvent) return;

        panelBody.innerHTML = renderEventDetails(selectedEvent);
        panelBody.querySelector(".project-back-button")?.focus();
        return;
    }

    const galleryButton = event.target.closest("[data-gallery-open]");

    if (galleryButton) {
        const type = galleryButton.dataset.galleryOpen;
        const id = galleryButton.dataset.galleryId;
        const index = Number(galleryButton.dataset.galleryIndex);
        const image = getGalleryImages(type, id)[index];

        if (!image) return;

        panelBody.innerHTML = renderGalleryViewer(type, id, index);
        panelBody.querySelector(".project-back-button")?.focus();
        return;
    }

    const galleryBackButton = event.target.closest("[data-gallery-back]");

    if (galleryBackButton) {
        const type = galleryBackButton.dataset.galleryBack;
        const id = galleryBackButton.dataset.galleryId;

        if (type === "cad") {
            const design = cadDesigns.find(item => item.id === id);
            if (!design) return;
            panelBody.innerHTML = renderCadDesignDetails(design);
        } else if (type === "jewels") {
            panelBody.innerHTML = renderSkJewels();
        } else {
            const selectedEvent = attendedEvents.find(item => item.id === id);
            if (!selectedEvent) return;
            panelBody.innerHTML = renderEventDetails(selectedEvent);
        }

        panelBody.querySelector(
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

        panelBody.innerHTML = renderGalleryViewer(type, id, nextIndex);
        panelBody.querySelector(`[data-gallery-step="-${direction}"]`)?.focus();
    }
});

panelBody.addEventListener("submit", event => {
    if (!event.target.matches("#contact-form")) return;

    event.preventDefault();

    const formStatus = event.target.querySelector("#contact-form-status");
    formStatus.textContent =
        "Your details are valid, but this form is not connected to a message service. Nothing was sent.";
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        destinationPanel.classList.contains("is-open")) {
        closeDestinationPanel();
    }
});

// Pointer interaction: mouse and touch.
orbitContainer.addEventListener("pointerdown", event => {
    if (event.target.closest(".orbit-item")) {
        // Let button clicks select destinations.
        return;
    }

    isDragging = true;
    moved = false;
    startX = event.clientX;
    startRotation = rotation;

    orbitContainer.classList.add("dragging");
    orbitContainer.setPointerCapture(event.pointerId);
});

orbitContainer.addEventListener("pointermove", event => {
    if (!isDragging) return;

    const difference = event.clientX - startX;

    if (Math.abs(difference) > 4) {
        moved = true;
    }

    rotation = startRotation + difference * 0.55;
    renderOrbit();
});

function stopDragging() {
    if (!isDragging) return;

    isDragging = false;
    moved = false;
    orbitContainer.classList.remove("dragging");
}

orbitContainer.addEventListener("pointerup", stopDragging);
orbitContainer.addEventListener("pointercancel", stopDragging);

// Select destinations.
orbitItems.forEach(item => {
    item.setAttribute("aria-pressed", "false");

    item.addEventListener("click", event => {
        if (moved) {
            event.preventDefault();
            moved = false;
            return;
        }

        selectDestination(item);
    });
});

// Responsive repositioning.
window.addEventListener("resize", renderOrbit);

// Initial setup.
renderOrbit();

console.log("JASH orbital navigation initialized!");
