FROM node:13.13.0
WORKDIR /usr/src/FE
EXPOSE 3000
COPY . .
RUN npm install
CMD [ "npm", "run", "start" ]