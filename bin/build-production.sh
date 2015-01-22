#!/bin/sh

#TODO: CDN paths

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

NODE_ENV=production webpack -p --display-reasons --display-error-details --progress --colors --json || exit $?
