#!/bin/bash

URL=$1
TOKEN=$2

printf "======   removing old webhook   ======\n\n"
curl https://api.telegram.org/bot${TOKEN}/deleteWebHook | jq '.'

printf "\n======   setting webhook   ======\n\n"
curl https://api.telegram.org/bot${TOKEN}/setWebHook \
    -H 'Content-Type: application/json' \
    -d "{\"url\": \"$URL\"}" | jq '.'

printf "\n======   webhook info   ======\n\n"
curl https://api.telegram.org/bot${TOKEN}/getWebHookInfo | jq '.'
