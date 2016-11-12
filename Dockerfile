FROM node:argon
RUN npm install webpack -g
RUN mkdir -p /usr/src/athenaApp
WORKDIR /usr/src/athenaApp
COPY package.json /usr/src/athenaApp/
COPY . /usr/src/athenaApp
RUN cd /usr/src/athenaApp && npm install
RUN npm run build
EXPOSE 3000
CMD npm start
