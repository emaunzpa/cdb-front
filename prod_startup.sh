#! /bin/sh
git checkout master

git pull origin master

docker build -t cdb-front .

docker run -v ${PWD}:/app -v /app/node_modules -p 80:3000 -e NODE_ENV=production cdb-front

