#! /bin/sh
sudo docker build -t cdb-front .

sudo docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 cdb-front

