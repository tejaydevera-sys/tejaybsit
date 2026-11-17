// ---- Smooth highlight of the active nav link ----
const navLinks = document.querySelectorAll('.nav nav a');
const sections = ['top', 'information', 'foods', 'contact'].map(id => document.getElementById(id));

function updateActive() {
  const y = window.scrollY + 300;
  let current = 'top';
  sections.forEach(s => { if (s && s.offsetTop <= y) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

// ---- Photo lightbox ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.hidden = false;
  lightbox.querySelector('.close').focus();
}
function closeLightbox() { lightbox.hidden = true; lightboxImg.src = ''; }

document.querySelectorAll('.thumb').forEach(btn =>
  btn.addEventListener('click', () => openLightbox(btn.dataset.src, btn.dataset.alt)));
lightbox.addEventListener('click', e => { if (e.target === lightbox || e.target.classList.contains('close')) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

// ---- Contact helper: show a message when a link is used ----
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// On desktop, tel: links do nothing, so copy the number instead.
document.getElementById('phone').addEventListener('click', e => {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return; // phones dial normally
  e.preventDefault();
  const number = e.currentTarget.getAttribute('href').replace('tel:', '');
  (navigator.clipboard ? navigator.clipboard.writeText(number) : Promise.reject())
    .then(() => showToast('Phone number copied: ' + number))
    .catch(() => showToast('Call us at ' + number));
});
document.getElementById('mail').addEventListener('click', () => showToast('Opening your email app...'));

// ---- Scale the 1440px canvas to fit smaller screens ----
function fitPage() {
  const page = document.querySelector('.page');
  page.style.zoom = Math.min(1, window.innerWidth / 1440);
}
window.addEventListener('resize', fitPage);
fitPage();
