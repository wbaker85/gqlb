FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4000
CMD [ "yarn", "nodemon", "--watch", "src/config/schema.graphql", "src/server.js" ]