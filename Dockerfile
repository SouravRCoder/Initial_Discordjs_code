FROM node:latest
WORKDIR /discordapp
COPY . /discordapp
RUN npm install
CMD [ "node"  , "."]