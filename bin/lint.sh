#!/bin/sh

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

eslint --ext .js --ext .jsx app
