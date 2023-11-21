#!/bin/sh

# Birth Query Network image starting
echo "Birth Query Network image"

# loading the docker images
echo "loading the docker images"

# start by loading the docker images from the tar file
docker load -i birth_query-i.tar

# starting docker compose
echo "starting docker compose"

# docker compose with space for Ubuntu, for other versions and different OS
# you can change this first 2 words to `docker-compose` if that's your case
# Note how we are only using `up` and not `up --build`, everything is already
# built in the images, there is no need to build up everything again
docker compose -f docker-compose.prod.yml up
 
# loading data into database image
# echo "loading data into database image"

# also load some basic sql data for our app, note that "&" symbol at the end
# of our sh command, so it can run this command in parallel
# cat birthquery.sql | sudo docker exec -i bq-database-c psql -U postgres -p 5432 -h localhost -d birthquery &
