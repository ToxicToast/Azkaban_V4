FROM docker.io/node:23-alpine as build
WORKDIR /app
COPY dist/apps/sse-service .
COPY package*.json ./
RUN npm install --omit=dev
RUN npm install --save-dev bcrypt @types/bcrypt


FROM docker.io/node:23-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
ENV APP_VERSION = local
CMD [ "node", "main.js" ]