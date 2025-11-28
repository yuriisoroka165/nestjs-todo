FROM node:22

WORKDIR /nodejs-todo

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

RUN chown -R node:node /nodejs-todo

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]
