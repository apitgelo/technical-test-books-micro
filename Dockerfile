FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build-ts

EXPOSE 3000

CMD ["yarn", "run", "serve"]
