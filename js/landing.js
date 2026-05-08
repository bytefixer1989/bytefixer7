// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);
  // Show/hide nav links based on scroll
  if (scrolled) {
    navLinks.classList.remove('nav-hidden');
    navLinks.classList.add('nav-visible');
  } else {
    navLinks.classList.add('nav-hidden');
    navLinks.classList.remove('nav-visible');
  }
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Εστάλη!';
    btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== HERO INTRO SEQUENCE =====
(function() {
  const logo = document.getElementById('heroLogo');
  const title = document.getElementById('heroTitle');
  const subtitle = document.getElementById('heroSubtitle');
  if (!logo || !title) return;

  const letters = title.querySelectorAll('.letter');
  const LOGO_DELAY = 500;       // ms before logo starts
  const BURST_DURATION = 400;   // ms the logo over-exposes
  const LETTER_START = 1800;    // ms after page load to start letters
  const LETTER_GAP = 160;       // ms between each letter
  const FLASH_DURATION = 250;   // ms each letter stays over-bright
  const SUBTITLE_DELAY = 700;   // ms after last letter

  // Step 1: Light up logo with a burst flash
  setTimeout(() => {
    logo.classList.add('lit', 'burst');
    // Remove the burst overexposure after a beat
    setTimeout(() => logo.classList.remove('burst'), BURST_DURATION);
  }, LOGO_DELAY);

  // Step 2: Light up each letter one by one
  letters.forEach((letter, i) => {
    setTimeout(() => {
      letter.classList.add('lit', 'flash');
      // Remove the flash overexposure
      setTimeout(() => letter.classList.remove('flash'), FLASH_DURATION);
    }, LETTER_START + i * LETTER_GAP);
  });

  // Step 3: Fade in subtitle after all letters
  const subtitleTime = LETTER_START + letters.length * LETTER_GAP + SUBTITLE_DELAY;
  setTimeout(() => subtitle.classList.add('lit'), subtitleTime);
})();

// ===== TYPEWRITER EFFECT =====
(function() {
  const container = document.getElementById('typewriterContainer');
  if (!container) return;

  const lines = [
    { text: 'Κολλάει το PC;', classes: [] },
    { text: 'Το λάπτοπ;', classes: [] },
    { text: 'Το τάμπλετ;', classes: [] },
    { text: 'Ή μήπως το κινητό σου;', classes: [] },
    { text: 'Έσπασε η οθόνη σου;', classes: [] },
    { text: 'Μη Σκάς!!', classes: ['problem-answer'] },
    { text: 'Ο Bytefixer είναι εδώ!', classes: ['problem-hero'], brand: 'Bytefixer' },
  ];

  const CHAR_SPEED = 45;       // ms per character
  const LINE_PAUSE = 400;      // ms pause between lines
  const PUNCHLINE_PAUSE = 700; // ms extra pause before "Μη Σκάς!!"
  let started = false;

  function createCursor() {
    const cur = document.createElement('span');
    cur.className = 'cursor';
    return cur;
  }

  function typeLine(lineObj, callback) {
    const div = document.createElement('div');
    div.className = 'problem-line';
    lineObj.classes.forEach(cls => div.classList.add(cls));

    const textSpan = document.createElement('span');
    textSpan.className = 'typed-text';
    const cursor = createCursor();

    div.appendChild(textSpan);
    div.appendChild(cursor);
    container.appendChild(div);

    const chars = lineObj.text.split('');
    let i = 0;

    function typeNext() {
      if (i < chars.length) {
        textSpan.textContent += chars[i];
        i++;
        setTimeout(typeNext, CHAR_SPEED);
      } else {
        // Typing done for this line — apply brand styling if needed
        if (lineObj.brand) {
          textSpan.innerHTML = textSpan.textContent.replace(
            lineObj.brand,
            `<span class="brand-pop">${lineObj.brand}</span>`
          );
        }
        // Hide cursor on this line
        cursor.classList.add('done');
        setTimeout(callback, LINE_PAUSE);
      }
    }
    typeNext();
  }

  function typeAllLines(index) {
    if (index >= lines.length) return;

    // Extra pause before the punchline
    const extraPause = (index === 5) ? PUNCHLINE_PAUSE : 0;

    setTimeout(() => {
      typeLine(lines[index], () => typeAllLines(index + 1));
    }, extraPause);
  }

  // Start typing when the section scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        observer.disconnect();
        setTimeout(() => typeAllLines(0), 400);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.getElementById('problems'));
})();

// ===== 3D WARP SPEED LINES =====
function initWarp(canvasId) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, cx, cy;
  function resize() {
    const rect = c.parentElement.getBoundingClientRect();
    W = c.width = rect.width; H = c.height = rect.height; cx = W/2; cy = H/2;
  }
  resize(); window.addEventListener('resize', resize);

  class Star {
    constructor() { this.reset(); }
    reset() {
      this.angle = Math.random() * Math.PI * 2;
      this.dist = Math.random() * 5;
      this.speed = 0.3 + Math.random() * 1.2;
      this.length = 20 + Math.random() * 80;
      this.maxDist = Math.max(W, H) * 0.9;
      this.opacity = 0;
      this.thickness = 0.3 + Math.random() * 1.2;
    }
    update() {
      this.dist += this.speed * (1 + this.dist * 0.008);
      const p = this.dist / this.maxDist;
      this.opacity = p < 0.1 ? p / 0.1 : Math.min(1, 0.15 + p * 0.6);
      if (this.dist > this.maxDist) this.reset();
    }
    draw() {
      const cos = Math.cos(this.angle), sin = Math.sin(this.angle);
      const td = Math.max(0, this.dist - this.length * (0.5 + this.dist * 0.003));
      const x1 = cx + cos * td, y1 = cy + sin * td;
      const x2 = cx + cos * this.dist, y2 = cy + sin * this.dist;
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, `rgba(59,139,235,0)`);
      g.addColorStop(0.5, `rgba(59,139,235,${this.opacity * 0.3})`);
      g.addColorStop(1, `rgba(105,180,255,${this.opacity * 0.5})`);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = g; ctx.lineWidth = this.thickness; ctx.stroke();
    }
  }

  const stars = Array.from({length: 200}, () => { const s = new Star(); s.dist = Math.random() * Math.max(W,H) * 0.8; return s; });
  function animate() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== FLOATING PARTICLES =====
function initParticles(canvasId) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H;
  function resize() {
    const rect = c.parentElement.getBoundingClientRect();
    W = c.width = rect.width; H = c.height = rect.height;
  }
  resize(); window.addEventListener('resize', resize);

  class P {
    constructor() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.r = 1.5 + Math.random() * 4;
      this.vx = -0.2 + Math.random() * 0.4; this.vy = -0.15 + Math.random() * 0.3;
      this.op = 0.1 + Math.random() * 0.4;
      this.ps = 0.005 + Math.random() * 0.015;
      this.po = Math.random() * Math.PI * 2;
      this.cop = 0;
    }
    update(t) {
      this.x += this.vx; this.y += this.vy;
      if (this.x < -10) this.x = W + 10; if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10; if (this.y > H + 10) this.y = -10;
      this.cop = this.op * (0.5 + 0.5 * Math.sin(t * this.ps + this.po));
    }
    draw() {
      const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3);
      g.addColorStop(0, `rgba(59,139,235,${this.cop})`);
      g.addColorStop(0.4, `rgba(59,139,235,${this.cop * 0.4})`);
      g.addColorStop(1, `rgba(59,139,235,0)`);
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    }
  }

  const ps = Array.from({length: 45}, () => new P());
  let t = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H); t++;
    ps.forEach(p => { p.update(t); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// Initialize effects on both sections
initWarp('warpCanvas');
initWarp('warpCanvas2');
initParticles('particlesCanvas');
initParticles('particlesCanvas2');
