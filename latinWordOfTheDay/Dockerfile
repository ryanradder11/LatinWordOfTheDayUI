FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=512
RUN npx ng build --configuration production

FROM httpd:2.4-alpine
COPY docker/httpd-ssl.conf /usr/local/apache2/conf/httpd.conf
COPY docker/.htaccess /usr/local/apache2/htdocs/.htaccess
COPY --from=build /app/dist/latin-word-of-the-day/browser/ /usr/local/apache2/htdocs/
EXPOSE 80 443
