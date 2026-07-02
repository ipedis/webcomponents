FROM node:24-alpine AS build
WORKDIR /app/src
RUN apk add --no-cache --virtual .build-deps alpine-sdk python3

# Copy .npmrc alongside the manifests so `legacy-peer-deps=true` applies here:
# the Nx 23.1.0-beta prerelease trips npm's strict peer-dependency semver.
COPY package*.json .npmrc ./
RUN npm install

COPY . ./
RUN npm run build || true
RUN ./node_modules/.bin/nx repair
RUN npm run build

FROM node:24-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/demo ./
CMD node server/server.mjs
EXPOSE 4000
