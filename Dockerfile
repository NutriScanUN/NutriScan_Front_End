# Build Stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

RUN mkdir /etc/nginx/ssl
RUN mkdir /etc/nginx/ssl/api

COPY nginx/ssl-cert /etc/nginx/ssl
COPY nginx/ssl-cert/api /etc/nginx/ssl/api

COPY nginx/default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]