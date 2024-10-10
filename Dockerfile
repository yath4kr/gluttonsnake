# Use the official Apache HTTP server image as a base
FROM httpd:alpine
MAINTAINER Yatharth

# Copy the contents of the local directory to the container's web root
COPY . /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

