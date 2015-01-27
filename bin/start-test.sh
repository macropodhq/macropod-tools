#!/bin/sh

[ -z "${PORT}" ] && PORT=8081

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

export NODE_ENV=testing

webpack-dev-server \
	--hot --inline --history-api-fallback --display-reasons \
	--display-error-details --progress --colors --port ${PORT} \
	--display-chunks --output-public-path http://127.0.0.1:${PORT}/ \
	--output-file bundle.js --content-base ./node_modules/macropod-tools/testing \
  $(find app -name '*_test.jsx')
