FROM node:lts-alpine3.16 as build

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

# install node dependencies
RUN echo "npm install in progress..." && yarn install

RUN mkdir -p dist

CMD [ "build" ]

# Exposes port 80 by default
FROM rtsp/lighttpd
COPY --from=build /app/dist /var/www/html