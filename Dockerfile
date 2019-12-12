FROM node:8.15.1

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "./server/index.js"]
EXPOSE 3005