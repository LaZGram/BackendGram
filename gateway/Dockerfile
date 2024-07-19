ARG NODE_VERSION=20.15-alpine

# Builder image
FROM node:${NODE_VERSION} as builder

ENV NODE_ENV=test

WORKDIR /usr/app

COPY . .

RUN npm ci \
  && npm run build

# Runtime image
FROM node:${NODE_VERSION} as production

ENV NODE_ENV=production

WORKDIR /usr/app

COPY --from=builder /usr/app/node_modules/ ./node_modules/
COPY --from=builder /usr/app/dist/ .

CMD node main.js