// Small helper functions

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function lockScroll(lock) {
  document.body.style.overflow = lock ? "hidden" : "";
}

function setYear() {
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
