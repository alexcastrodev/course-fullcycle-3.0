FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY ./app/package*.json .

RUN npm install

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules

COPY ./app .

EXPOSE 3000

CMD [ "npm", "start"]