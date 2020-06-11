FROM node
WORKDIR /client/dist/
COPY package.json .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
COPY . .