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
