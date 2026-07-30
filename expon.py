from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

# --- НАСТРОЙКИ ---
login = "a.buianov@sr-dev.ru"
password = "rdxeszwaq321"

# 1. Указываем путь к вашему реальному профилю Chrome
# Обычно он находится здесь. Убедитесь, что ВСЕ окна Chrome закрыты!
chrome_profile_path = r"C:\Users\user\AppData\Local\Google\Chrome\User Data"

# --- КОД НЕ МЕНЯЕМ ---
options = Options()

# 2. Говорим Selenium использовать ваш профиль "Default"
options.add_argument(f"user-data-dir={chrome_profile_path}")
options.add_argument("--profile-directory=Default")

# Дополнительные опции для стабильности
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
# Добавляем user-agent, чтобы быть максимально похожим на обычного пользователя
options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

# 3. Создаем и запускаем драйвер
driver = webdriver.Chrome(options=options)

# 4. Открываем сайт
driver.get("https://exon.sr-dev.ru")
time.sleep(3)

# 5. Так как профиль ваш, сайт может быть уже открыт и авторизован.
#    Если нет — напишите код для авторизации, я его добавлю.