# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm install --save serve

CMD ["npm", "run", "build"]
# start app
CMD ["serve", "-s", "build"]