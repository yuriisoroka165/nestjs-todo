# 1. Базовий образ Node.js
FROM node:22

# 2. Створюємо робочу директорію
WORKDIR /nodejs-todo

# 3. Копіюємо package.json та package-lock.json
COPY package*.json ./

# 4. Встановлюємо залежності
RUN npm install

# 5. Копіюємо весь код
COPY . .

# 6. Будуємо TypeScript
RUN npm run build

# 7. Відкриваємо порт
EXPOSE 3000

# 8. Команда для запуску
CMD ["node", "dist/src/main.js"]
