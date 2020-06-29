FROM node:14.4.0-alpine3.10

EXPOSE 3000
EXPOSE 80

ENV PORT 3000

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "serve"]
