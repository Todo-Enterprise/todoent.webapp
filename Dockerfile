FROM node:13-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY ./public ./public
COPY ./src ./src

EXPOSE 3000

CMD [ "npm", "run", "prod" ]