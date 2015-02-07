# Run container for NodeJS
FROM node:0.10.36

# Expose port.
EXPOSE 8080

# RUN mkdir /var/www/app -p

COPY . /var/www/
WORKDIR /var/www

# Install dependencies
RUN npm install

# Define mountable directory for server.
# VOLUME ["/var/www"]

# Run application
CMD [ "npm", "start" ]
