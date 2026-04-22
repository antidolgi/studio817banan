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

// Анимация счётчиков при появлении
const statNumbers = document.querySelectorAll('.stat-number');
const animateNumbers = () => {
    statNumbers.forEach(el => {
        let target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) target = 0;
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

// Плавающая форма
const floatingBtn = document.getElementById('floatingButton');
const floatingFormPopup = document.getElementById('floatingForm');
const closeFloatingForm = document.querySelector('.close-form');

if(floatingBtn && floatingFormPopup) {
    floatingBtn.addEventListener('click', () => {
        floatingFormPopup.classList.toggle('active');
    });
    if(closeFloatingForm) {
        closeFloatingForm.addEventListener('click', () => {
            floatingFormPopup.classList.remove('active');
        });
    }
    // Обработка отправки
    const mainForm = document.getElementById('mainFloatingForm');
    if(mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const service = this.service.value;
            let actionUrl = '';
            if(service === 'studio') actionUrl = 'https://formspree.io/f/xdaydekl';
            else if(service === 'banan') actionUrl = 'https://formspree.io/f/meevzaow';
            else { alert('Выберите направление'); return; }
            
            // Проверка капчи
            const captchaValue = this.captcha.value.trim();
            if(captchaValue !== '5') {
                alert('Неверный ответ на капчу');
                return;
            }
            if(!this.agreement.checked) {
                alert('Подтвердите согласие на обработку персональных данных');
                return;
            }
            this.action = actionUrl;
            this.submit();
        });
    }
}

// Автоматическое появление формы через 10 секунд (один раз)
let formShown = false;
setTimeout(() => {
    if(!formShown && floatingBtn && floatingFormPopup && !floatingFormPopup.classList.contains('active')) {
        floatingFormPopup.classList.add('active');
        formShown = true;
        // Автоматически скрыть через 7 секунд, если пользователь не взаимодействует
        setTimeout(() => {
            if(floatingFormPopup.classList.contains('active')) {
                floatingFormPopup.classList.remove('active');
            }
        }, 7000);
    }
}, 10000);

// Мобильное меню
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
// Добавить крестик в мобильное меню, если его нет
if(mobileBtn && nav) {
    // Проверяем, есть ли уже кнопка закрытия
    if(!nav.querySelector('.close-menu-btn')) {
        const closeMenuBtn = document.createElement('span');
        closeMenuBtn.innerHTML = '✕';
        closeMenuBtn.className = 'close-menu-btn';
        closeMenuBtn.style.cssText = 'position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer;';
        nav.style.position = 'relative';
        nav.appendChild(closeMenuBtn);
        closeMenuBtn.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }
}
// Добавляем крестик закрытия в мобильное меню (только для активного состояния)
const addCloseButtonToNav = () => {
    const navMenu = document.querySelector('.nav');
    if(navMenu && !navMenu.querySelector('.close-mobile-menu')) {
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '✕';
        closeBtn.className = 'close-mobile-menu';
        closeBtn.style.cssText = 'display: none; position: absolute; top: 15px; right: 20px; font-size: 28px; cursor: pointer;';
        navMenu.style.position = 'relative';
        navMenu.appendChild(closeBtn);
        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
        // Показываем кнопку только когда меню активно и ширина экрана меньше 768px
        const observer = new MutationObserver(() => {
            if(navMenu.classList.contains('active') && window.innerWidth <= 768) {
                closeBtn.style.display = 'block';
            } else {
                closeBtn.style.display = 'none';
            }
        });
        observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
        window.addEventListener('resize', () => {
            if(navMenu.classList.contains('active') && window.innerWidth <= 768) {
                closeBtn.style.display = 'block';
            } else {
                closeBtn.style.display = 'none';
            }
        });
    }
};
addCloseButtonToNav();
}
