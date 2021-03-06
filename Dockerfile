FROM node:8 AS build
WORKDIR /app
COPY . .
RUN npm i npm@latest -g
RUN npm install
RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/ /var/www/cid-token-sale
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
