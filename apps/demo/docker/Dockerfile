FROM node:24-alpine AS build
WORKDIR /app/src
RUN apk add --no-cache --virtual .build-deps alpine-sdk python3

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM node:24-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/demo ./
CMD node server/server.mjs
EXPOSE 4000
