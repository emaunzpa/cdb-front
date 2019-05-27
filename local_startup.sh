#! /bin/sh
sudo docker build -t cdb-front . --build-arg env=development

sudo docker run -v ${PWD}:/app -v /app/node_modules --env NODE_ENV=dev -p 3001:3000 cdb-front

