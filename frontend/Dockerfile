FROM node:16 as build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html