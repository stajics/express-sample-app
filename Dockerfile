FROM node:latest

WORKDIR /usr/src

RUN npm i

EXPOSE 3000
EXPOSE 80
