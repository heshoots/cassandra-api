FROM node:latest
WORKDIR /home
ADD . /home
ADD ./config.json /home
RUN npm install
CMD npm start

