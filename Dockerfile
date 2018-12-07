FROM nginx
FROM node:10.8.0
WORKDIR /usr/src/app
copy ./dist /usr/share/nginx/html/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run", "dev"]
