FROM node:8.12.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm i --production

FROM node:8.12.0-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

CMD npm start
