#!/bin/sh

#TODO: CDN paths

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

export NODE_ENV=production

webpack \
  --bail \
  --colors \
  --display-error-details \
  --display-reasons \
  --progress \
  -p \
  || exit $?
