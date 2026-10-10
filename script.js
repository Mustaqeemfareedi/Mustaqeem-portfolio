"use strict";

/* Reveal sections smoothly as the visitor scrolls. */
document.documentElement.classList.add("js-ready");

const revealTargets = document.querySelectorAll(
  ".section-heading, .about-visual, .about-copy, .skill-card, .project-card, .contact-section > *"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("visible");
  });
}

/* Subtle mouse depth effect for project artwork. */
document.querySelectorAll(".project-art").forEach((art) => {
  art.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    const rect = art.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    art.style.setProperty("--mouse-x", `${x * 12}px`);
    art.style.setProperty("--mouse-y", `${y * 12}px`);
  });

  art.addEventListener("pointerleave", () => {
    art.style.setProperty("--mouse-x", "0px");
    art.style.setProperty("--mouse-y", "0px");
  });
});

/* Highlight the navigation link for the visible section. */
const navLinks = document.querySelectorAll(".navbar nav a");
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, {
    rootMargin: "-35% 0px -55% 0px"
  });

  sections.forEach((section) => navObserver.observe(section));
}
