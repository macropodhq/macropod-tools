#!/bin/sh

PATH="./node_modules/macropod-tools/node_modules/.bin:${PATH}"

eslint \
  --config ./node_modules/macropod-tools/.eslintrc \
  --ext .js \
  --ext .jsx \
  ${@-$(find . -type d -depth 1 | grep -E '(app|packages)$')}
