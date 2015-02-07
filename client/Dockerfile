# Run container for client
FROM debian:latest

ENV DEBIAN_FRONTEND noninteractive

# Update system
RUN apt-get update && apt-get -y install apt-utils python

# Copy python http server
# COPY ../utils/ /var/www/

# Define mountable directory for client.
# VOLUME ["/var/www/client"]

# Expose port.
EXPOSE 8000

# Execute python server
WORKDIR /var/www/client
CMD ["utils/server.py"]
