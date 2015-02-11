#!/bin/sh

[ -z "${PORT}" ] && PORT=8080

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

webpack-dev-server \
  --colors \
  --display-chunks \
  --display-error-details \
  --display-reasons \
  --history-api-fallback \
  --hot \
  --inline \
  --output-public-path http://127.0.0.1:${PORT}/
  --port ${PORT} \
  --progress \
