const mobileStyles = document.createElement("link");
mobileStyles.rel = "stylesheet";
mobileStyles.href = "mobile.css";
document.head.appendChild(mobileStyles);

const sharedFonts = document.createElement("link");
sharedFonts.rel = "stylesheet";
sharedFonts.href =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap";
document.head.appendChild(sharedFonts);

const pageHeader = document.querySelector(
  ".site-header, .scholar-header, .services-header",
);
if (pageHeader) {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.body.classList.toggle("journal-page", currentPage === "blog.html");
  if (currentPage === "blog.html") {
    document.querySelector(".footer .brand")?.remove();
  }
  const activePage =
    currentPage === "blog.html"
      ? "blog.html"
      : currentPage === "presentation.html"
        ? "services.html"
        : currentPage;
  pageHeader.className = "scholar-header";
  pageHeader.innerHTML = `<a class="scholar-brand" href="index.html"><span class="scholar-logo">&#9643;</span><span><b>Scholar's Workbench</b><small>Research &amp; Innovation</small></span></a><nav class="scholar-nav" aria-label="Main navigation"><a class="${activePage === "index.html" ? "active" : ""}" href="index.html">Home</a><a class="${activePage === "services.html" ? "active" : ""}" href="services.html">Services</a><a class="${activePage === "blog.html" ? "active" : ""}" href="blog.html">Journals</a><a class="${activePage === "tools.html" ? "active" : ""}" href="tools.html">Tools</a><a class="${activePage === "pricing.html" ? "active" : ""}" href="pricing.html">Pricing</a><a href="blog.html">Blog</a><a class="${activePage === "about.html" ? "active" : ""}" href="about.html">About us</a></nav><div class="scholar-actions"><span class="open-status"><i></i> Call for papers</span><button class="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode">&#9790;</button></div><button class="scholar-menu" aria-label="Open menu">&#9776;</button>`;
}

const menuButton = document.querySelector(".menu-button, .scholar-menu");
const nav = document.querySelector(".desktop-nav, .scholar-nav");
const themeToggle = document.querySelector(".theme-toggle");

document
  .querySelectorAll(".scholar-nav a, .scholar-hero-buttons .outline")
  .forEach((link) => {
    if (link.textContent.trim().toLowerCase().includes("services"))
      link.href = "services.html";
  });

if (document.body.classList.contains("dark-mode")) {
  document.documentElement.dataset.theme = "dark";
}

if (themeToggle && document.body.classList.contains("dark-mode")) {
  themeToggle.textContent = "☀";
  themeToggle.setAttribute("aria-label", "Switch to light mode");
  themeToggle.setAttribute("title", "Switch to light mode");
}

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
  themeToggle.setAttribute(
    "title",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
});

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("nav-open");
  menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".desktop-nav a, .scholar-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    menuButton.textContent = "☰";
  });
});

function handleContactSubmit(event) {
  event.preventDefault();
  const note = document.querySelector("#form-note");
  if (note) {
    note.textContent = "Brief received. We will reply within 30 minutes.";
    note.style.color = "#ef664d";
  }
  event.target.reset();
  return false;
}

document.querySelectorAll("form:not(.contact-form)").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (button) button.innerHTML = "You’re on the list <span>✓</span>";
  });
});

document.querySelectorAll(".capability-grid article").forEach((card) => {
  card.addEventListener("pointerenter", () => {
    card.classList.add("bento-active");
    card.style.setProperty("--spot-opacity", "1");
  });

  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const tiltX = (x / bounds.width - 0.5) * 5;
    const tiltY = (y / bounds.height - 0.5) * -5;
    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
    card.style.setProperty("--tilt-x", `${tiltX}deg`);
    card.style.setProperty("--tilt-y", `${tiltY}deg`);
    card.style.setProperty("--magnet-x", `${(x / bounds.width - 0.5) * 3}px`);
    card.style.setProperty("--magnet-y", `${(y / bounds.height - 0.5) * 3}px`);
  });

  card.addEventListener("pointerleave", () => {
    card.classList.remove("bento-active");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--magnet-x", "0");
    card.style.setProperty("--magnet-y", "0");
    card.style.setProperty("--spot-opacity", "0");
  });

  card.addEventListener("click", (event) => {
    const bounds = card.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "bento-ripple";
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    card.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), {
      once: true,
    });
  });
});
