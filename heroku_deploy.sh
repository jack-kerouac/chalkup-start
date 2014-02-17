#!/bin/bash

grunt --force
cd dist
git add .
git commit -m "heroku deployment"
git push
