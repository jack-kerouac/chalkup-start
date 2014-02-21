#!/bin/bash

grunt build --force
cd dist
git add .
git add -u .
git commit -m "heroku deployment"
git push
