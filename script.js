const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const form = document.querySelector("[data-booking-form]");
const toast = document.querySelector("[data-toast]");
const year = document.querySelector("[data-year]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

year.textContent = new Date().getFullYear();

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) setMenu(false);
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.hash === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.25, 0.5] }
);

sections.forEach((section) => activeSectionObserver.observe(section));

const revealItems = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("#servico");
    select.value = link.dataset.service;
  });
});

function validateField(field, message) {
  const error = document.querySelector(`#${field.id}-error`);
  const isValid = Boolean(field.value.trim());
  field.setAttribute("aria-invalid", String(!isValid));
  if (error) error.textContent = isValid ? "" : message;
  return isValid;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements.nome;
  const service = form.elements.servico;
  const validName = validateField(name, "Informe seu nome para continuar.");
  const validService = validateField(service, "Selecione o serviço desejado.");

  if (!validName || !validService) {
    (!validName ? name : service).focus();
    return;
  }

  const details = form.elements.mensagem.value.trim();
  const message = [
    `Olá! Meu nome é ${name.value.trim()}.`,
    `Tenho interesse em ${service.value}.`,
    details ? `Mensagem: ${details}` : "Gostaria de saber os horários disponíveis.",
  ].join("\n\n");

  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  showToast("Mensagem preparada. Escolha o contato do Espaço no WhatsApp para enviar.");
});

[form.elements.nome, form.elements.servico].forEach((field) => {
  field.addEventListener("blur", () => {
    if (field === form.elements.nome) validateField(field, "Informe seu nome para continuar.");
    if (field === form.elements.servico) validateField(field, "Selecione o serviço desejado.");
  });
});
