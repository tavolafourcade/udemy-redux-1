# pull the base image
FROM node
# set the working direction
WORKDIR /app
# install app dependencies
COPY package.json .
RUN npm install
# add app
COPY . .
EXPOSE 3000
# start app
CMD ["npm","start"]