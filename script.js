const canvas=document.getElementById('stars');const ctx=canvas.getContext('2d');let stars=[];function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:Math.min(140,Math.floor(innerWidth/8))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.2,a:Math.random()*.55+.12,s:Math.random()*.16+.025}))}function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of stars){p.y-=p.s;if(p.y<0){p.y=innerHeight;p.x=Math.random()*innerWidth}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(169,207,255,${p.a})`;ctx.fill()}requestAnimationFrame(draw)}addEventListener('resize',resize);resize();draw();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.textContent=nav.classList.contains('open')?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.textContent='☰'}));
const glow=document.querySelector('.pointer-glow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});document.getElementById('year').textContent=new Date().getFullYear();
// === MUSTAQEEM'S INTERACTIVE 3D EFFECTS ===

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Subtle movement for the hero section
const heroArt = document.querySelector('.hero-art');

if (heroArt) {
  heroArt.addEventListener('mousemove', event => {
    if (window.innerWidth <= 768) return;

    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroArt.style.transform =
      `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });

  heroArt.addEventListener('mouseleave', () => {
    heroArt.style.transform = '';
  });
}
// ===== MUSTAQEEM'S 3D PORTFOLIO UPGRADE =====

// Interactive 3D project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 10;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Interactive movement for the hero artwork
const heroArt = document.querySelector('.hero-art');

if (heroArt) {
  heroArt.addEventListener('mousemove', event => {
    if (window.innerWidth <= 768) return;

    const rect = heroArt.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroArt.style.transform =
      `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });

  heroArt.addEventListener('mouseleave', () => {
    heroArt.style.transform = '';
  });
}
