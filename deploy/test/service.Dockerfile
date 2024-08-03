FROM node:20.15-alpine

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

RUN [ -d "./prisma" ] && echo "Prisma folder found. Running npx prisma generate..." && npx prisma generate || echo "Prisma folder not found. Skipping npx prisma generate."
