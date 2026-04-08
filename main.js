// ============================================
// GIRIGARI — main.js
// ============================================

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => observer.observe(el));

// Nav: add slight background on scroll
const nav = document.querySelector('nav');

// Subtle cursor trail — tiny dots that follow the cursor
// Disabled on touch devices
if (window.matchMedia('(pointer: fine)').matches) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 998;
    opacity: 0.35;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const dots = [];
  let mouse = { x: -100, y: -100 };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (Math.random() > 0.6) {
      dots.push({ x: mouse.x, y: mouse.y, alpha: 0.6, r: Math.random() * 1.5 + 0.5 });
    }
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = dots.length - 1; i >= 0; i--) {
      const d = dots[i];
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 74, 47, ${d.alpha})`;
      ctx.fill();
      d.alpha -= 0.012;
      if (d.alpha <= 0) dots.splice(i, 1);
    }
    requestAnimationFrame(draw);
  }
  draw();
}
