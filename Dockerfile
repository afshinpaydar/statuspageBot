FROM node:14-alpine

WORKDIR /usr/src/app
# copy base config
COPY ./package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
ENTRYPOINT [ "npm", "start"]
