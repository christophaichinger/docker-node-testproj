FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app
RUN npm install

# Bundle app source
ADD . /usr/src/app

EXPOSE 8080
CMD [ "node", "server.js" ]
