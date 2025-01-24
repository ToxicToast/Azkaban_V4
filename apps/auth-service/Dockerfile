# Stufe 1: Build-Image
FROM docker.io/node:23-alpine as build
WORKDIR /app
COPY dist/apps/auth-service .
COPY package*.json ./
RUN npm install --omit=dev

# Stufe 2: Produktions-Image

ENV APP_VERSION = local

FROM docker.io/node:23-alpine
WORKDIR /app
COPY --from=build /app /app

# Expose Port
EXPOSE 3000

# Entry Point
CMD [ "node", "main.js" ]

