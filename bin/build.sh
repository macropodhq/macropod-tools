#!/bin/sh

NODE_ENV=production webpack -p --display-reasons --display-error-details --progress --colors --config webpack.config.js
