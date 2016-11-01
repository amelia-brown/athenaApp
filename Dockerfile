FROM node:argon
RUN mkdir -p /usr/src/athenaApp
WORKDIR /usr/src/athenaApp
COPY package.json /usr/src/athenaApp/
#RUN npm install
COPY . /usr/src/athenaApp
EXPOSE 3000
#CMD ['npm', 'start']
