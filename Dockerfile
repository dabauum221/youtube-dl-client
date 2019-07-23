FROM node:10

# Create app directory
WORKDIR /usr/src/app

# production port
ENV PORT=8080

# file system encoding
ENV LC_ALL=en_US.UTF-8

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Update to the latest youtube-dl
RUN ./node_modules/youtube-dl/bin/youtube-dl -U

# Bundle app source
COPY . .

# Install cron
RUN apt-get update && apt-get -y install cron

# Move the update script to daily cron folder
RUN mv /usr/src/app/youtube-dl-update /etc/cron.daily/

# Give execution rights on the daily cron job
RUN chmod 0755 /etc/cron.daily/youtube-dl-update

EXPOSE 8080

RUN npm run build

CMD [ "sh", "-c", "service cron start && npm run-script serve" ]
