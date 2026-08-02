import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileMenu();
  initCounters();
  initTilt();
  initGallery();
  initContactForm();
  renderYear();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-out-cubic",
  offset: 80,
});

/* ---------- Sticky header elevation ---------- */
function initHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 24;
    header.classList.toggle("bg-white/95", scrolled);
    header.classList.toggle("shadow-md", scrolled);
    header.classList.toggle("bg-white/80", !scrolled);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    iconOpen?.classList.toggle("hidden", open);
    iconClose?.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => setOpen(menu.classList.contains("hidden")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
}

/* ---------- 3D tilt: product cards container, max 10deg; disabled on mobile ---------- */
function initTilt() {
  const container = document.getElementById("productTiltContainer");
  if (!container) return;

  const MAX_TILT_Y = 8;
  const MAX_TILT_X = 4;
  let enabled = window.innerWidth >= 768;

  const onMove = (event) => {
    if (!enabled) return;
    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    container.style.transform = `perspective(1000px) rotateX(${(y * -MAX_TILT_X * 2).toFixed(2)}deg) rotateY(${(x * MAX_TILT_Y * 2).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const onResize = () => {
    enabled = window.innerWidth >= 768;
    if (!enabled) container.style.transform = "";
  };

  container.addEventListener("mousemove", onMove);
  container.addEventListener("mouseleave", onLeave);
  window.addEventListener("resize", onResize);
}

/* ---------- Certification count-up via IntersectionObserver ---------- */
function initCounters() {
  const section = document.getElementById("certifications");
  if (!section) return;

  const counters = section.querySelectorAll("[data-count]");
  counters.forEach((el) => {
    el.textContent = `${el.dataset.prefix ?? ""}0${el.dataset.suffix ?? ""}`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach((el) => animateCounter(el, parseFloat(el.dataset.count)));
        observer.disconnect();
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(section);
}

function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const decimals = Number(el.dataset.decimals ?? 0);

  const frame = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ---------- Horizontal gallery scroll ---------- */
function initGallery() {
  const track = document.getElementById("gallery-track");
  const prev = document.getElementById("gallery-prev");
  const next = document.getElementById("gallery-next");
  if (!track) return;

  prev?.addEventListener("click", () => track.scrollBy({ left: -320, behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: 320, behavior: "smooth" }));
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    success?.classList.remove("hidden");
    success?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => success?.classList.add("hidden"), 6000);
  });
}

/* ---------- Footer year ---------- */
function renderYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = String(new Date().getFullYear());
}
