#! /bin/sh
git checkout master

git pull origin master

docker build -t cdb-front .

docker run -v ${PWD}:/app -v /app/node_modules --env ENV=production -p 80:3000 cdb-front

