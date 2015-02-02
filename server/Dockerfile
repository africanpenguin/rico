# Run container for NodeJS
FROM "node:0.10.36"

# Expose port.
EXPOSE 8080

# Define mountable directory for server.
VOLUME ["/var/www"]

WORKDIR /var/www

# Install dependencies
ONBUILD RUN npm install

# Run application
CMD [ "npm", "start" ]
