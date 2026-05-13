// Загрузка HTML-компонентов
async function loadComponent(url, containerId) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Ошибка загрузки ${url}`);
    document.getElementById(containerId).innerHTML = await res.text();
  } catch (e) {
    console.error(e);
  }
}

async function initComponents() {
  await Promise.all([
    loadComponent('header.html', 'header-container'),
    loadComponent('footer.html', 'footer-container'),
    loadComponent('popup.html', 'popup-container')
  ]);
  initMain();
}

function initMain() {
  // Бургер-меню
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  burger?.addEventListener('click', () => nav?.classList.toggle('active'));

  // Плавный скролл для якорей
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const id = this.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Открытие попапа по классу .open-popup
  const popup = document.getElementById('popupForm');
  const closePopup = document.getElementById('closePopup');
  document.body.addEventListener('click', e => {
    if (e.target.closest('.open-popup')) {
      popup?.classList.add('active');
    }
  });
  closePopup?.addEventListener('click', () => popup?.classList.remove('active'));
  window.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('active');
  });

  // Основная форма (плавающая) — меняем action в зависимости от направления
  const mainForm = document.getElementById('mainForm');
  if (mainForm) {
    mainForm.addEventListener('submit', function(e) {
      const service = this.querySelector('select[name="service"]')?.value;
      if (service === 'studio') this.action = 'https://formspree.io/f/xdaydekl';
      else if (service === 'banan') this.action = 'https://formspree.io/f/meevzaow';
    });
  }

  // Форма на странице бананового агентства (редирект на thanks-site.html)
  const agencyForm = document.getElementById('agencyForm');
  if (agencyForm) {
    agencyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch(this.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
        .then(() => window.location.href = 'thanks-site.html')
        .catch(() => { this.submit(); window.location.href = 'thanks-site.html'; });
    });
  }

  // Фильтры галереи и портфолио
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      const container = this.closest('.gallery__filters, .portfolio__filters')?.nextElementSibling;
      if (!container) return;
      this.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      container.querySelectorAll('[data-category]').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  // Лайтбокс для галереи (атрибут data-lightbox)
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-lightbox]');
    if (link) {
      e.preventDefault();
      const src = link.getAttribute('href');
      const lb = document.createElement('div');
      lb.style = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:999';
      lb.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:16px;">`;
      lb.addEventListener('click', () => lb.remove());
      document.body.appendChild(lb);
    }
  });

  // Swiper для отзывов (если есть .reviews__slider)
  if (typeof Swiper !== 'undefined' && document.querySelector('.reviews__slider')) {
    new Swiper('.reviews__slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: { 768: { slidesPerView: 2 } }
    });
  }

  // Видео кота при наведении
  document.querySelectorAll('[data-video-hover]').forEach(el => {
    const img = el.querySelector('img');
    const video = document.createElement('video');
    video.src = el.dataset.videoHover;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:none;';
    el.style.position = 'relative';
    el.appendChild(video);
    el.addEventListener('mouseenter', () => { img.style.display = 'none'; video.style.display = 'block'; video.play(); });
    el.addEventListener('mouseleave', () => { video.pause(); video.style.display = 'none'; img.style.display = ''; });
  });
}

initComponents();
