#!/bin/sh

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

eslint -c ./node_modules/macropod-tools/.eslintrc --ext .js --ext .jsx app
