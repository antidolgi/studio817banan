// Ждём полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Плавающая кнопка и форма
    const floatingBtn = document.getElementById('floatingButton');
    const floatingForm = document.getElementById('floatingForm');
    const closeFormBtn = document.querySelector('.close-form');
    // Умное переключение текста в зависимости от выбора услуги
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
    // Запускаем сразу, чтобы установить правильный placeholder
    serviceSelect.dispatchEvent(new Event('change'));
}

    if (floatingBtn && floatingForm) {
        // Открыть форму по клику
        floatingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            floatingForm.style.display = 'flex';
        });
        // Закрыть форму по крестику
        if (closeFormBtn) {
            closeFormBtn.addEventListener('click', function() {
                floatingForm.style.display = 'none';
            });
        }
        // Закрыть форму при клике вне её (на фон)
        window.addEventListener('click', function(e) {
            if (e.target === floatingForm) {
                floatingForm.style.display = 'none';
            }
        });
    }

    // Обработка отправки формы
    const mainForm = document.getElementById('mainFloatingForm');
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const service = this.service.value;
    let actionUrl = '';
    if (service === 'studio') actionUrl = 'https://formspree.io/f/xdaydekl';
    else if (service === 'banan') actionUrl = 'https://formspree.io/f/meevzaow';
    else { alert('Выберите направление'); return; }
    
    const captchaValue = this.captcha.value.trim();
    if (captchaValue !== '5') {
        alert('Неверный ответ на капчу');
        return;
    }
    if (!this.agreement.checked) {
        alert('Подтвердите согласие на обработку персональных данных');
        return;
    }

    // Показываем спиннер и отправляем через fetch
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
        // Успешно
        showNotification('✅ Заявка принята! Ожидайте звонка в ближайшее время.');
        this.reset();
        floatingFormPopup.style.display = 'none';
    }).catch(() => {
        showNotification('❌ Ошибка отправки. Попробуйте позвонить по телефону.+7-995-788-666-8', 'error');
    }).finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
});

function showNotification(text, type = 'success') {
    const notif = document.createElement('div');
    notif.innerText = text;
    notif.style.cssText = `position: fixed; bottom: 20px; left: 20px; background: ${type === 'success' ? '#4caf50' : '#f44336'}; color: white; padding: 12px 24px; border-radius: 40px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-weight: bold;`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 5000);
}

    // Автоматическое появление формы через 10 секунд (только если не открыта)
    setTimeout(function() {
        if (floatingForm && floatingForm.style.display !== 'flex') {
            floatingForm.style.display = 'flex';
            // Скрыть автоматически через 7 секунд
            setTimeout(function() {
                if (floatingForm.style.display === 'flex') {
                    floatingForm.style.display = 'none';
                }
            }, 7000);
        }
    }, 20000);
});

// Анимация счётчиков и появления элементов (оставляем как есть, но обернём для надёжности)
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateNumbers = () => {
        statNumbers.forEach(el => {
            let target = parseInt(el.getAttribute('data-target'));
            if (isNaN(target)) target = 0;
            if (!el.classList.contains('animated') && el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('animated');
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
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

    // Плавное появление элементов
    const elements = document.querySelectorAll('.direction-card, .about__grid, .gallery-teaser__item, .cta__inner, .service-card, .advantage, .portfolio-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    const animateOnScroll = () => {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
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
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
});
