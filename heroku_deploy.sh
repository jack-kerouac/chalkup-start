#!/bin/bash

grunt --force
git add dist
git commit -m "heroku deployment"
git push heroku master
