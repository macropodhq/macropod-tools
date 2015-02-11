#!/bin/sh

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

webpack \
  --bail \
  --colors \
  --display-error-details \
  --display-reasons \
  --progress \
  -p \
  || exit $?
