FROM node:20-alpine
WORKDIR /code
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000