FROM node:16-alpine

WORKDIR /app

RUN apk add --update --no-cache git 

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn compile
RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start-production" ]