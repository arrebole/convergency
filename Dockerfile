FROM node:16-alpine

WORKDIR /usr/local/convergency

COPY . /usr/local/convergency

RUN npm install && npm run build

CMD ["node", "./dist/main.js"]