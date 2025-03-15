# Расширение для Chrome: Взаимодействие с профилем VK

Расширение позволяет копировать из профиля VK следующую информацию:  
- **ФИО**  
- **Ссылка на страницу VK**  
- **Образование**  
- **Номер телефона**  

---

## Как запустить расширение

### 1. Получение токена для работы с API VK
- Создайте **Standalone-приложение** в VK:  
  Перейдите в [управление приложениями](https://vk.com/apps?act=manage) и создайте новое приложение.  
- Или используйте сервис [vkhost.github.io](https://vkhost.github.io/) для получения токена.  
- Сохраните полученный **сервисный ключ** (access token).

### 2. Настройка конфигурации
- Создайте файл `config.yaml`.  
- Вставьте в него ваш сервисный ключ в следующем формате:  
  ```yaml
  accessToken: 'ваш_сервисный_ключ'
  ```

### 3. Настройка базы данных
- Отредактируйте файл `db.js`, указав параметры подключения к вашей базе данных.

### 4. Установка и запуск backend
- Перейдите в директорию `back`:  
  ```bash
  cd back
  ```
- Выполните команду для создания базы данных:  
  ```bash
  npm run cdb
  ```
- Запустите сервер:  
  ```bash
  npm start
  ```

### 5. Сборка frontend
- Перейдите в директорию `front`:  
  ```bash
  cd front
  ```
- Выполните сборку расширения:  
  ```bash
  npm run build
  ```

### 6. Установка расширения в Chrome
- Откройте Chrome и перейдите в раздел **"Расширения"** (`chrome://extensions/`).
- Включите режим разработчика.
- Нажмите **"Загрузить распакованное расширение"** и выберите папку `dist`, полученную после сборки.

### 7. Использование
- Перейдите на страницу профиля кандидата в VK.
- Откройте расширение.
- Нажмите кнопку в интерфейсе расширения — данные будут отправлены на сервер.

---

## Комментарий
- Использование через **официальный API VK** возвращает данные на **латинице**.  
- Использование через [vkhost.github.io](https://vkhost.github.io/) возвращает данные на **кириллице**.

---
