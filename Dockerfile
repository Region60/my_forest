FROM node:18-alpine As development
WORKDIR /app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build
FROM node:18-alpine as production
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
EXPOSE $PORT
COPY . .
COPY --from=development /app/dist ./dist
CMD ["node", "dist/main.js"]
