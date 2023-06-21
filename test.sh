#!/usr/bin/env bash

cd "${0%/*}" || exit

if test -f ".env"; then
    export $(grep -v '^#' .env | xargs -d '\n')
fi

(cd ./test && deno run --allow-net --allow-env test.ts)