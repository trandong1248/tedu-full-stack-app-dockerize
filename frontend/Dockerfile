FROM node:16-alpine3.17

RUN npm install -g @angular/cli@15.0.0

RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 4200

ENTRYPOINT [ "ng", "serve", "--host", "0.0.0.0", "--disable-host-check" ]

