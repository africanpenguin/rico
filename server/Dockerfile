# Run container for NodeJS
FROM node:0.10.36

# Expose port.
EXPOSE 8080

# RUN mkdir /var/www/app -p

COPY package.json /var/www/
WORKDIR /var/www

# Install dependencies
RUN npm install && mkdir /var/www/app

# Define mountable directory for server.
VOLUME ["/var/www/app"]

# Run application
CMD [ "npm", "start" ]
