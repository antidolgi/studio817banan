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
