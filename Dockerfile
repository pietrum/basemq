# ----------------------------------------------------------------------------------------------------------------------
# GLOBAL CONFIGURATION
# ----------------------------------------------------------------------------------------------------------------------
# Install Node.js v14.x on alpine
ARG NODE_TAG=fermium-alpine3.14

# Default to production, compose overrides this to development on build and run
ARG DEBUG=basemq,basemq:*
ARG NODE_ENV=production

# ----------------------------------------------------------------------------------------------------------------------
# DEVELOP IMAGE
# ----------------------------------------------------------------------------------------------------------------------
FROM node:${NODE_TAG} as develop
MAINTAINER Fulkman <fulkman@pietrum.pl>

ARG DEBUG
ENV DEBUG=$DEBUG
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# LOAD DEPENDENCIES
RUN mkdir -p /usr/src/app; chown -R node:node /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN set -ex; \
# Update/Upgrade OS
apk update; \
#
# For native dependencies, you'll need extra tools
apk add --no-cache make gcc g++ zeromq; \
#
# For compile npm module
npm install -g npm; \
npm install -g node-gyp; \
#
# Install app dependencies
npm ci; \
chown -R node:node node_modules; \
#
# Cleanup
npm uninstall -g node-gyp; \
apk del make gcc g++; \
rm -rf ~/.cache

# CREATE APP DIRECTORY
COPY --chown=node:node ./ ./

# EXECUTE
USER node
CMD npm run develop
