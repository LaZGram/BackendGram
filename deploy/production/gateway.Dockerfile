FROM node:20.15-alpine

WORKDIR /usr/app

COPY package*.json .

# COPY ./prisma ./prisma

# RUN npx prisma generate

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]