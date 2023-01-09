FROM node:16-alpine3.17
RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown app:app /app
WORKDIR /app
RUN chmod 777 /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
