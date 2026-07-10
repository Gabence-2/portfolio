const projects = {
  // Project data is kept in one place so the cards and modal stay easy to update.
  checkout: {
    tag: "Product Experience",
    title: "Checkout Flow Revamp",
    description:
      "A focused redesign of an e-commerce checkout flow, created to reduce friction and help customers complete purchases with more confidence.",
    points: [
      "Simplified the journey into clearer steps for mobile and desktop users.",
      "Improved visual hierarchy around totals, shipping choices, and payment actions.",
      "Designed the experience around measurable conversion improvement."
    ]
  },
  dashboard: {
    tag: "Data Product",
    title: "Campaign Analytics Dashboard",
    description:
      "A practical reporting interface for a retail campaign team that needed faster insight into spend, engagement, and channel performance.",
    points: [
      "Turned campaign data into scannable cards, charts, and action-focused summaries.",
      "Supported quick decisions during an active marketing campaign.",
      "Balanced technical accuracy with a clean interface for non-technical teammates."
    ]
  }
};

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector("#modal-title");
const modalTag = document.querySelector("#modal-tag");
const modalDescription = document.querySelector("#modal-description");
const modalPoints = document.querySelector("#modal-points");
const modalClose = document.querySelector(".modal-close");
const projectButtons = document.querySelectorAll("[data-project]");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

let lastFocusedElement = null;

function toggleMenu() {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  navMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

function openProject(projectKey) {
  // Fill the accessible modal with the selected project's case-file details.
  const project = projects[projectKey];
  if (!project) return;

  lastFocusedElement = document.activeElement;
  modalTag.textContent = project.tag;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalPoints.innerHTML = "";

  project.points.forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    modalPoints.appendChild(item);
  });

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeProject() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function updateActiveNav() {
  // Highlight the chapter link that matches the reader's current scroll position.
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

navToggle.addEventListener("click", toggleMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);

projectButtons.forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

modalClose.addEventListener("click", closeProject);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeProject();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeProject();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks. Your message is ready to send once this form is connected to an email or backend service.";
  contactForm.reset();
});
