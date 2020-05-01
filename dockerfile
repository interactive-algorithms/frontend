FROM node:13.13.0
WORKDIR /usr/src/FE
EXPOSE 3000
COPY . .
WORKDIR /usr/src/FE/app
RUN npm install
CMD [ "npm", "run", "start" ]