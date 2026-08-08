/* ============================================
   SPACE EXPLORER — SCRIPT
   Starfield animation, navbar, scroll effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- STARFIELD BACKGROUND ---------- */
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let shootingStars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createStars(count) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        color: Math.random() > 0.85 ? '62,198,255' : '244,247,255'
      });
    }
    return arr;
  }

  stars = createStars(Math.min(260, Math.floor((width * height) / 6000)));

  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * width * 0.8,
      y: Math.random() * height * 0.3,
      length: Math.random() * 120 + 80,
      speed: Math.random() * 10 + 8,
      angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
      opacity: 1
    });
  }

  setInterval(() => {
    if (Math.random() > 0.35) createShootingStar();
  }, 3000);

  function drawStars() {
    ctx.clearRect(0, 0, width, height);

    // twinkling / drifting stars
    stars.forEach(star => {
      star.twinklePhase += star.twinkleSpeed;
      const alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.35;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${star.color}, ${Math.max(0, Math.min(1, alpha))})`;
      ctx.shadowBlur = star.radius * 3;
      ctx.shadowColor = `rgba(${star.color}, 0.8)`;
      ctx.fill();

      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;
    });

    ctx.shadowBlur = 0;

    // shooting stars
    shootingStars.forEach((s, index) => {
      const dx = Math.cos(s.angle) * s.length;
      const dy = Math.sin(s.angle) * s.length;

      const gradient = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy);
      gradient.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - dx, s.y - dy);
      ctx.stroke();

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity -= 0.012;

      if (s.opacity <= 0 || s.x > width + 100 || s.y > height + 100) {
        shootingStars.splice(index, 1);
      }
    });

    requestAnimationFrame(drawStars);
  }
  drawStars();

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---------- MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  /* ---------- SCROLL FADE-IN ANIMATIONS ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  /* ---------- PLANET CAROUSEL ---------- */
  const planets = [
    {
      name: 'Mercury',
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
      alt: 'Mercury, the smallest and innermost planet of the solar system',
      desc: 'The smallest planet and closest to the Sun, with a scorched, cratered surface and extreme temperature swings between day and night.',
      distance: '57.9M km', diameter: '4,879 km', moons: '0', day: '59 Earth days',
      link: 'https://solarsystem.nasa.gov/planets/mercury/overview/'
    },
    {
      name: 'Venus',
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
      alt: 'Venus, shrouded in thick yellowish clouds',
      desc: "Earth's fiery twin, wrapped in toxic clouds and blistering heat — the hottest planet in our solar system.",
      distance: '108.2M km', diameter: '12,104 km', moons: '0', day: '243 Earth days',
      link: 'https://solarsystem.nasa.gov/planets/venus/overview/'
    },
    {
      name: 'Earth',
      img: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
      alt: 'Earth, the blue marble, our home planet',
      desc: 'Our home — the only known planet to harbor life, covered in vast oceans and a life-sustaining atmosphere.',
      distance: '149.6M km', diameter: '12,742 km', moons: '1', day: '24 hours',
      link: 'https://solarsystem.nasa.gov/planets/earth/overview/'
    },
    {
      name: 'Mars',
      img: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
      alt: 'Mars, the red planet, with its rust-colored surface',
      desc: "The Red Planet, home to the tallest volcano in the solar system and the target of humanity's next giant leap.",
      distance: '227.9M km', diameter: '6,779 km', moons: '2', day: '24.6 hours',
      link: 'https://solarsystem.nasa.gov/planets/mars/overview/'
    },
    {
      name: 'Jupiter',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
      alt: 'Jupiter, the largest planet, with its famous Great Red Spot',
      desc: 'The largest planet in our solar system, a swirling giant of gas famous for its Great Red Spot storm.',
      distance: '778.5M km', diameter: '139,820 km', moons: '95', day: '9.9 hours',
      link: 'https://solarsystem.nasa.gov/planets/jupiter/overview/'
    },
    {
      name: 'Saturn',
      img: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
      alt: 'Saturn, encircled by its iconic ring system',
      desc: 'Famous for its spectacular ring system made of ice and rock, Saturn is a jewel of the solar system.',
      distance: '1.43B km', diameter: '116,460 km', moons: '146', day: '10.7 hours',
      link: 'https://solarsystem.nasa.gov/planets/saturn/overview/'
    },
    {
      name: 'Uranus',
      img: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
      alt: 'Uranus, an ice giant with a pale blue-green hue',
      desc: 'An ice giant that spins on its side, wrapped in a pale blue-green haze of methane clouds.',
      distance: '2.87B km', diameter: '50,724 km', moons: '27', day: '17.2 hours',
      link: 'https://solarsystem.nasa.gov/planets/uranus/overview/'
    },
    {
      name: 'Neptune',
      img: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg',
      alt: 'Neptune, a deep blue ice giant',
      desc: 'The most distant planet, a deep blue world with the fastest winds ever recorded in the solar system.',
      distance: '4.50B km', diameter: '49,244 km', moons: '14', day: '16.1 hours',
      link: 'https://solarsystem.nasa.gov/planets/neptune/overview/'
    }
  ];

  const stage = document.getElementById('carouselStage');
  const dotsWrap = document.getElementById('carouselDots');
  const detailsPanel = document.getElementById('planetDetails');
  const prevBtn = document.getElementById('prevPlanet');
  const nextBtn = document.getElementById('nextPlanet');

  let activeIndex = 0;
  let autoplayTimer = null;

  if (stage && detailsPanel) {

    // build orb elements
    const orbEls = planets.map((planet, i) => {
      const orb = document.createElement('div');
      orb.className = 'planet-orb';
      orb.innerHTML = `<img src="${planet.img}" alt="${planet.alt}" width="110" height="110">`;
      orb.addEventListener('click', () => goToPlanet(i));
      stage.appendChild(orb);
      return orb;
    });

    // build dot indicators
    const dotEls = planets.map((planet, i) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to ${planet.name}`);
      dot.addEventListener('click', () => goToPlanet(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function positionOrbs() {
      const spacing = window.innerWidth < 600 ? 90 : 150;
      orbEls.forEach((orb, i) => {
        const diff = i - activeIndex;
        const abs = Math.abs(diff);

        if (abs > 3) {
          orb.style.opacity = '0';
          orb.style.pointerEvents = 'none';
          return;
        }

        const scale = diff === 0 ? 1.5 : 1 - abs * 0.18;
        const opacity = diff === 0 ? 1 : 1 - abs * 0.28;

        orb.style.opacity = String(Math.max(opacity, 0.15));
        orb.style.pointerEvents = 'auto';
        orb.style.zIndex = String(10 - abs);
        orb.style.transform =
          `translate(-50%, -50%) translateX(${diff * spacing}px) scale(${scale})`;
        orb.classList.toggle('active', diff === 0);
      });
    }

    function renderDetails() {
      const p = planets[activeIndex];
      detailsPanel.innerHTML = `
        <h3>${p.name}</h3>
        <p class="planet-desc-text">${p.desc}</p>
        <div class="planet-props">
          <div class="prop"><span class="prop-label">Distance from Sun</span><span class="prop-value">${p.distance}</span></div>
          <div class="prop"><span class="prop-label">Diameter</span><span class="prop-value">${p.diameter}</span></div>
          <div class="prop"><span class="prop-label">Moons</span><span class="prop-value">${p.moons}</span></div>
          <div class="prop"><span class="prop-label">Day Length</span><span class="prop-value">${p.day}</span></div>
        </div>
        <a href="${p.link}" target="_blank" rel="noopener" class="btn btn-glow">Learn More</a>
      `;
    }

    function renderDots() {
      dotEls.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }

    function goToPlanet(index) {
      activeIndex = (index + planets.length) % planets.length;
      positionOrbs();
      renderDetails();
      renderDots();
      resetAutoplay();
    }

    function nextPlanet() { goToPlanet(activeIndex + 1); }
    function prevPlanet() { goToPlanet(activeIndex - 1); }

    function resetAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(nextPlanet, 4500);
    }

    prevBtn.addEventListener('click', prevPlanet);
    nextBtn.addEventListener('click', nextPlanet);
    window.addEventListener('resize', positionOrbs);

    // initial render
    positionOrbs();
    renderDetails();
    renderDots();
    resetAutoplay();
  }

  /* ---------- HERO ASTRONAUT PARALLAX ---------- */
  const astronaut = document.getElementById('astronautImg');
  const hero = document.querySelector('.hero');

  if (astronaut && hero) {
    hero.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const moveX = (e.clientX - innerWidth / 2) / 40;
      const moveY = (e.clientY - innerHeight / 2) / 40;
      astronaut.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      astronaut.style.transform = 'translate(0px, 0px)';
    });
  }

});