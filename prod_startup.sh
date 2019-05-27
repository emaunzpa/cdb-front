#! /bin/sh
git checkout master

git pull origin master

docker build -t cdb-front .

docker run -v ${PWD}:/app -v /app/node_modules -p 80:3000 -e API_URL=http://ec2-34-201-46-138.compute-1.amazonaws.com/api cdb-front

