FROM node:20.15-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY ./prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]