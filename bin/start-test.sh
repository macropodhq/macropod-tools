#!/bin/sh

[ -z "${PORT}" ] && PORT=8081

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

export NODE_ENV=testing

webpack-dev-server \
  --colors \
  --content-base ./node_modules/macropod-tools/testing \
  --display-chunks \
  --display-error-details \
  --display-reasons \
  --history-api-fallback \
  --hot \
  --inline \
  --output-file bundle.js \
  --output-public-path http://127.0.0.1:${PORT}/ \
  --port ${PORT} \
  --progress \
  $(find . -name '*_test.jsx')
