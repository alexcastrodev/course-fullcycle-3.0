FROM node:18-alpine as base

WORKDIR /usr/src/app

COPY ./app/package*.json .

RUN npm install

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules ./node_modules

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

COPY ./app .

EXPOSE 3000

CMD [ "npm", "start"]