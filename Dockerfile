FROM node:11.13.0-alpine

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /var/www/

RUN apk update && apk upgrade
RUN apk add git

COPY . /var/www
RUN npm i


EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

# start the app
CMD [ "npm", "run", "dev"]
