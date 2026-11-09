
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
    "playlist",
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

    playlist: {
        title: "My Playlist",
        body: `
            <h3>My Soundtrack</h3>
            <p>A collection of music that accompanies my creative journey.</p>
            <p>Our interactive music player is coming soon.</p>
        `
    },

    contact: {
        title: "Contact",
        body: `
            <h3>Let's Connect</h3>
            <p>Have an idea, opportunity or collaboration in mind?</p>
            <p>Add your email address here when you're ready.</p>
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
    destinationPanel.setAttribute("aria-hidden", "false");
    destinationPanel.inert = false;

    closePanelButton.focus();

    console.log("Opened:", destination);
}

function closeDestinationPanel() {
    destinationPanel.classList.remove("is-open");
    destinationPanel.classList.remove("is-about");
    destinationPanel.setAttribute("aria-hidden", "true");
    destinationPanel.inert = true;

    if (previousFocus) {
        previousFocus.focus();
    }
}

closePanelButton.addEventListener("click", closeDestinationPanel);

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
