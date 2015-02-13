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

echo Build was a success!
echo `ls dist/*js` are "$(echo "scale=2; $(cat dist/*.js | gzip | wc -c) / 1024" | bc)Kb" gzipped
