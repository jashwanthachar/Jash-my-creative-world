
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
    "links",
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
    }
];

const certificates = [];

function renderSkillCards() {
    return skills.map(skill => `
        <button
            class="skill-card"
            type="button"
            data-skill-id="${skill.id}"
            aria-label="View ${skill.name} skill details"
        >
            <span class="skill-card-top">
                <img class="skill-logo" src="${skill.logo}" alt="">
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
                <img class="skill-logo" src="${skill.logo}" alt="">
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

    links: {
        title: "My Links",
        body: `
            <h3>Explore My Work</h3>
            <p>My projects, development journey and professional portfolio.</p>
            <p>GitHub and project links will be added here.</p>
        `
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

    if (!backButton) return;

    const skill = skills.find(item => item.id === backButton.dataset.backToSkills);

    if (!skill) return;

    panelTitle.textContent = "Skills";
    panelBody.innerHTML = renderSkillsOverview();

    const skillCard = [...panelBody.querySelectorAll("[data-skill-id]")]
        .find(button => button.dataset.skillId === skill.id);

    skillCard?.focus();
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
