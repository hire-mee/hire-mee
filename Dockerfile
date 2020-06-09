FROM node
WORKDIR /client/dist/
COPY package.json .
RUN npm install
EXPOSE 4200
CMD [ "npm", "start" ]
COPY . .