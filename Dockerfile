FROM node:14.16

WORKDIR /app/

COPY package*.json .
RUN npm ci

COPY . /app/

CMD node index.js