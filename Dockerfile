FROM node:19.3.0-alpine3.16 as builder

RUN apk update && \
    apk add --no-cache git

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ARG NAKATSU_URL
ARG IDENTITY_URL
ARG BUILD_VERSION

ENV BUILD_VERSION=$BUILD_VERSION
ENV IDENTITY_URL=$IDENTITY_URL
ENV NAKATSU_URL=$NAKATSU_URL

RUN npm run build

FROM nginx:1.20.0-alpine

RUN apk update && \
    apk add --no-cache curl

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=1m --timeout=3s CMD curl --fail http://127.0.0.1/health || exit 1
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
