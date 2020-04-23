# Compile server app in a temporary container
FROM node:13-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY src ./src
COPY public ./public
COPY ./webpack.config.js ./
RUN npm run build


# Build final image
FROM mhart/alpine-node:slim-13

WORKDIR /app
ENV NODE_ENV prod
COPY --from=builder /app/build ./

EXPOSE 3000

CMD [ "node", "src/server.js" ]