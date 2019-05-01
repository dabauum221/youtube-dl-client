FROM node:8

# Create app directory
WORKDIR /usr/src/app

# production port
ENV PORT=8080

# file system encoding
ENV LC_ALL=en_US.UTF-8

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Update to the latest youtube-dl
RUN ./node_modules/youtube-dl/bin/youtube-dl -U

# Bundle app source
COPY . .

EXPOSE 8080

RUN yarn
RUN yarn build

CMD [ "yarn", "serve" ]
