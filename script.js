// Плавная анимация появления элементов
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.direction-card, .about__grid, .gallery-teaser__item, .cta__inner, .service-card, .advantage, .portfolio-card');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 100) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};
// Форма заявки
const btn = document.getElementById('floatingButton');
const formPopup = document.getElementById('floatingForm');
const closeBtn = document.querySelector('.close-form');

if (btn && formPopup) {
    btn.addEventListener('click', () => formPopup.classList.toggle('active'));
    if (closeBtn) closeBtn.addEventListener('click', () => formPopup.classList.remove('active'));
    
    const floatingForm = document.getElementById('mainFloatingForm');
    floatingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const service = floatingForm.service.value;
        let actionUrl = '';
        if (service === 'studio') actionUrl = 'https://formspree.io/f/xdaydekl';
        else if (service === 'banan') actionUrl = 'https://formspree.io/f/meevzaow';
        else { alert('Выберите направление'); return; }
        if (!floatingForm.agreement.checked) { alert('Подтвердите согласие'); return; }
        this.action = actionUrl;
        this.submit();
    });
};
// Анимация счётчиков при появлении
const statNumbers = document.querySelectorAll('.stat-number');
const animateNumbers = () => {
    statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        if(!el.classList.contains('animated') && el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('animated');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if(current >= target) {
                    el.innerText = target;
                    clearInterval(timer);
                } else {
                    el.innerText = Math.floor(current);
                }
            }, 20);
        }
    });
};
window.addEventListener('scroll', animateNumbers);
window.addEventListener('load', animateNumbers);

// Изначально скрываем элементы
document.querySelectorAll('.direction-card, .about__grid, .gallery-teaser__item, .cta__inner, .service-card, .advantage, .portfolio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Мобильное меню (работает на всех страницах)
const mobileBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');
if(mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    // Закрываем меню при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}
