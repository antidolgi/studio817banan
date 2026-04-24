document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.getElementById('floatingButton');
    const floatingForm = document.getElementById('floatingForm');
    const closeForm = document.querySelector('.close-form');

    if (floatingBtn && floatingForm) {
        floatingBtn.onclick = function() {
            floatingForm.style.display = 'flex';
        };
        if (closeForm) {
            closeForm.onclick = function() {
                floatingForm.style.display = 'none';
            };
        }
    }

    const mainForm = document.getElementById('mainFloatingForm');
    if (mainForm) {
        mainForm.onsubmit = function(e) {
            const captcha = this.captcha.value.trim();
            if (captcha !== '5') {
                alert('Неверный ответ на капчу');
                e.preventDefault();
                return false;
            }
            if (!this.agreement.checked) {
                alert('Подтвердите согласие');
                e.preventDefault();
                return false;
            }
            // Устанавливаем action в зависимости от выбора
            const service = this.service.value;
            if (service === 'studio') this.action = 'https://formspree.io/f/xdaydekl';
            else if (service === 'banan') this.action = 'https://formspree.io/f/meevzaow';
            else {
                alert('Выберите направление');
                e.preventDefault();
                return false;
            }
            // Разрешаем отправку
            return true;
        };
    }
});
