#!/usr/bin/env bash

cd docs

git init

git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"

git add .
git commit -m "Generate docs and deploy to gh-pages"

git push --force --quiet "https://${GH_TOKEN}@github.com/Splash-Inc/elvis-driver.git" HEAD:gh-pages > /dev/null 2>&1
