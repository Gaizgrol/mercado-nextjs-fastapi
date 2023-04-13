#!/bin/sh

FILES=$(ls -1)
SEARCH_FOR='node_modules'

# Expose node_modules to host computer to enable IDE intellisense
if ! [[ "$FILES" =~ "$SEARCH_FOR" ]]; then
  npm ci
fi

npx next dev -H 0.0.0.0 -p 4000
