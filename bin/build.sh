#!/bin/sh

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

webpack -p --display-reasons --display-error-details \
--progress --colors || exit $?
