##
## DEVELOPMENT
FROM node:lts-bookworm-slim as dev 
WORKDIR /var/api

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install \
    git \
    iputils-ping \
    procps \
    -y && apt-get clean autoclean \
    && apt-get autoremove --yes \
    && rm -rf /var/lib/{apt,dpkg,cache,log}/

RUN mkdir -p dist && mkdir -p node_modules && chown -R node:node node_modules && npm i -g @nestjs/cli
USER node

##
## BUILD
FROM node:lts-bookworm-slim as build
WORKDIR /var/api
RUN npm install -g npm@10.8.3 && npm run build

##
## PRODUCTION
FROM node:lts-bookworm-slim as prod
WORKDIR /home/node
RUN npm install -g npm@10.8.3 && npm i -g pm2 && npm cache clean --force
USER node
CMD [ "pm2-runtime", "dist/main.js" ]
