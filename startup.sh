#! /bin/sh
git checkout master

git pull origin master

docker build -t cdb-front ~/cdb-front/

docker run -it -p 80:80 cdb-front

