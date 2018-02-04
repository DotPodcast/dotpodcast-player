FROM node:8 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.13.8-alpine

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
