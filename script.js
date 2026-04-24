// ========== УПРОЩЁННЫЙ И НАДЁЖНЫЙ СКРИПТ ==========
document.addEventListener('DOMContentLoaded', function() {
    // 1. Плавающая форма
    const btn = document.getElementById('floatingButton');
    const form = document.getElementById('floatingForm');
    const closeSpan = document.querySelector('#floatingForm .close-form');

    if (btn && form) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            form.style.display = 'flex';   // открываем форму
        });
        if (closeSpan) {
            closeSpan.addEventListener('click', function() {
                form.style.display = 'none';
            });
        }
        // клик вне формы -> закрыть
        window.addEventListener('click', function(e) {
            if (e.target === form) form.style.display = 'none';
        });
    }

    // 2. Умный placeholder (меняется при выборе услуги)
    const serviceSelect = document.querySelector('#mainFloatingForm select[name="service"]');
    const msgField = document.querySelector('#mainFloatingForm textarea[name="message"]');
    if (serviceSelect && msgField) {
        serviceSelect.addEventListener('change', function() {
            if (this.value === 'banan') {
                msgField.placeholder = 'Опишите задачу: какой сайт нужен, бюджет, сроки...';
            } else {
                msgField.placeholder = 'Дата, время, пожелания по съёмке...';
            }
        });
        serviceSelect.dispatchEvent(new Event('change'));
    }

    // 3. Отправка формы (без ошибок)
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
                alert('✅ Заявка принята! Мы свяжемся с вами.');
                this.reset();
                form.style.display = 'none';   // правильно закрываем форму
            }).catch(() => {
                alert('❌ Ошибка отправки. Позвоните: +7-995-788-66-68');
            }).finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // 4. Автопоказ через 20 секунд
    setTimeout(() => {
        if (form && form.style.display !== 'flex') {
            form.style.display = 'flex';
            setTimeout(() => {
                if (form.style.display === 'flex') form.style.display = 'none';
            }, 7000);
        }
    }, 20000);
});

// ========== ВСЕ АНИМАЦИИ (счётчики, появление, мобильное меню) ==========
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

    // Плавное появление блоков
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
