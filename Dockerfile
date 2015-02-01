# Run container for client
FROM debian:latest
MAINTAINER Leonardo Rossi <leonardo.rossi@studenti.unipr.it>

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get -y dist-upgrade && apt-get -y install apt-utils
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install nginx

# Define mountable directory for client.
VOLUME ["/var/www"]

# Expose port.
EXPOSE 8000

# Execute python server
WORKDIR /var/www/client
CMD ["../utils/server.py"]

######## MongoDB image ####################################

# Run container for MongoDB
FROM mongo:2.6.7

# Expose ports.
# - process
EXPOSE 27017
# - http
EXPOSE 28017

# Define mountable directory for db.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data
# Start mongo
# CMD ["mongod"]

######## NodeJS image ####################################

# Run container for MongoDB
FROM node:0.10.36

# Expose port.
EXPOSE 8080

# Define mountable directory for server.
VOLUME ["/var/www"]

# Install dependencies
WORKDIR /var/www
RUN npm install

# Define mountable directories.
VOLUME ["/data/db"]

