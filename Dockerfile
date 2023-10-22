# Stage 1 - the build process
FROM node:20.0-alpine as build-deps

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install

RUN npm run build

# Stage 2 - the production environment
FROM node:20.0-alpine

WORKDIR /app
COPY --from=build-deps /app /app

ENV ENV_NODE_PORT 8081
EXPOSE 8081

CMD ["node", "dist/server.js"]
