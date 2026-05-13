// Загружает HTML-компонент и вставляет в контейнер
async function loadComponent(url, containerId) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Ошибка загрузки ${url}`);
    const html = await res.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

// После загрузки всех компонентов инициализируем основную логику
async function initComponents() {
  await Promise.all([
    loadComponent('header.html', 'header-container'),
    loadComponent('footer.html', 'footer-container'),
    loadComponent('popup.html', 'popup-container')
  ]);
  
  // Теперь, когда элементы на месте, запускаем основной скрипт
  initMain();
}

// Основная логика (та же, что была в main.js, но теперь вызывается после загрузки)
function initMain() {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  burger?.addEventListener('click', () => nav?.classList.toggle('active'));

  // плавный скролл
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // попап
  const requestBtn = document.getElementById('requestBtn');
  const popup = document.getElementById('popupForm');
  const closePopup = document.getElementById('closePopup');
  requestBtn?.addEventListener('click', () => popup?.classList.add('active'));
  closePopup?.addEventListener('click', () => popup?.classList.remove('active'));
  window.addEventListener('click', (e) => {
    if (e.target === popup) popup.classList.remove('active');
  });

  // форма
  const mainForm = document.getElementById('mainForm');
  if (mainForm) {
    mainForm.addEventListener('submit', function(e) {
      const service = this.querySelector('select[name="service"]')?.value;
      if (service === 'studio') this.action = 'https://formspree.io/f/xdaydekl';
      else if (service === 'banan') this.action = 'https://formspree.io/f/meevzaow';
    });
  }

  // фильтры
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

  // лайтбокс
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-lightbox]')) {
      e.preventDefault();
      const imgSrc = e.target.closest('[data-lightbox]').getAttribute('href');
      const lb = document.createElement('div');
      lb.style = 'position:fixed; inset:0; background:rgba(0,0,0,0.9); display:flex; align-items:center; justify-content:center; z-index:999';
      lb.innerHTML = `<img src="${imgSrc}" style="max-width:90%; max-height:90%; border-radius:16px;">`;
      lb.addEventListener('click', () => lb.remove());
      document.body.appendChild(lb);
    }
  });

  // Swiper, если есть
  if (typeof Swiper !== 'undefined' && document.querySelector('.reviews__slider')) {
    new Swiper('.reviews__slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: { 768: { slidesPerView: 2 } }
    });
  }
}

// Старт
initComponents();
