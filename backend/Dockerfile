FROM node:14.16.1-alpine3.13

RUN addgroup app && adduser -S -G app app
WORKDIR /app
RUN chmod -R 777 /app
USER app

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "server:dev" ]
