#!/bin/sh

[ -z "${PORT}" ] && PORT=8080

webpack-dev-server \
	-d --hot --inline --history-api-fallback --display-reasons \
	--display-error-details --progress	--colors --port ${PORT} \
	--output-public-path http://127.0.0.1:${PORT}/
