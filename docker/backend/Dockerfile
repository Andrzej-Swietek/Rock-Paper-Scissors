FROM node:18.3.0-alpine

WORKDIR /usr/src/app
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

#COPY package*.json ./
COPY . .
RUN yarn install

RUN yarn add pm2 -g

COPY . .

EXPOSE 3030


ENV NODE_ENV development

CMD ["yarn", "run", "dev"]