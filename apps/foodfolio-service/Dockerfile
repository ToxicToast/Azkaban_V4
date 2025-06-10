FROM docker.io/node:23-alpine as build
WORKDIR /app
COPY dist/apps/foodfolio-service .
COPY package*.json ./
RUN npm install --omit=dev

FROM docker.io/node:23-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
ENV APP_VERSION = local
CMD [ "node", "main.js" ]