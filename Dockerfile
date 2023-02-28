FROM node:16-alpine as my-api

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run dev:build

CMD [ "npm", "run", "dev"]