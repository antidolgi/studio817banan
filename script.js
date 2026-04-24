// ========== ПЛАВАЮЩАЯ ФОРМА (РАБОТАЕТ ГАРАНТИРОВАННО) ==========
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('floatingButton');
    const formPopup = document.getElementById('floatingForm');
    const closeBtn = document.querySelector('.close-form');

    if (btn && formPopup) {
        // Открыть форму
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            formPopup.style.display = 'flex';
        });
        // Закрыть по крестику
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                formPopup.style.display = 'none';
            });
        }
        // Закрыть при клике вне формы
        window.addEventListener('click', function(e) {
            if (e.target === formPopup) {
                formPopup.style.display = 'none';
            }
        });
    }

    // Умное переключение текста в поле message
    const serviceSelect = document.querySelector('#mainFloatingForm select[name="service"]');
    const messageField = document.querySelector('#mainFloatingForm textarea[name="message"]');
    if (serviceSelect && messageField) {
        serviceSelect.addEventListener('change', function() {
            if (this.value === 'banan') {
                messageField.placeholder = 'Опишите задачу: какой сайт нужен (лендинг, магазин, портал), бюджет, сроки...';
            } else {
                messageField.placeholder = 'Дата, время, пожелания по съёмке...';
            }
        });
        serviceSelect.dispatchEvent(new Event('change'));
    }

    // Отправка формы через fetch
    const mainForm = document.getElementById('mainFloatingForm');
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const service = this.service.value;
            let actionUrl = '';
            if (service === 'studio') actionUrl = 'https://formspree.io/f/xdaydekl';
            else if (service === 'banan') actionUrl = 'https://formspree.io/f/meevzaow';
            else { alert('Выберите направление'); return; }
            
            const captcha = this.captcha.value.trim();
            if (captcha !== '5') { alert('Неверный ответ на капчу'); return; }
            if (!this.agreement.checked) { alert('Подтвердите согласие'); return; }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Отправка...';
            submitBtn.disabled = true;

            fetch(actionUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.name.value,
                    phone: this.phone.value,
                    service: service,
                    message: this.message.value
                })
            }).then(() => {
                alert('✅ Заявка принята! Мы свяжемся с вами в ближайшее время.');
                this.reset();
                formPopup.style.display = 'none';
            }).catch(() => {
                alert('❌ Ошибка отправки. Пожалуйста, позвоните нам: +7-995-788-66-68');
            }).finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Автоматическое появление формы через 20 секунд
    setTimeout(() => {
        if (formPopup && formPopup.style.display !== 'flex') {
            formPopup.style.display = 'flex';
            setTimeout(() => {
                if (formPopup.style.display === 'flex') formPopup.style.display = 'none';
            }, 7000);
        }
    }, 20000);
});

// ========== АНИМАЦИИ (оставляем как есть) ==========
document.addEventListener('DOMContentLoaded', function() {
    // Счётчики
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateNumbers = () => {
        statNumbers.forEach(el => {
            let target = parseInt(el.getAttribute('data-target'));
            if (isNaN(target)) target = 0;
            if (!el.classList.contains('animated') && el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('animated');
                let current = 0;
                const step = target / 50;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
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

    // Плавное появление
    const elements = document.querySelectorAll('.direction-card, .about__grid, .gallery-teaser__item, .cta__inner, .service-card, .advantage, .portfolio-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    const animateOnScroll = () => {
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Мобильное меню
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => nav.classList.toggle('active'));
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => nav.classList.remove('active'));
        });
    }
});
