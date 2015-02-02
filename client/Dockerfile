# Run container for client
FROM debian:latest
MAINTAINER Leonardo Rossi <leonardo.rossi@studenti.unipr.it>

# Update system
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get -y dist-upgrade && apt-get -y install apt-utils

# Copy python http server
COPY ../utils/ /var/www/

# Define mountable directory for client.
VOLUME ["/var/www/client"]

# Expose port.
EXPOSE 8000

# Execute python server
WORKDIR /var/www/client
CMD ["../utils/server.py"]
