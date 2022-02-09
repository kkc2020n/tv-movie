FROM node:16.13.2

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 


EXPOSE 3000

CMD [ "npm","run","serve" ]