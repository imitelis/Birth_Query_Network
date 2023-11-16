# Use the official PostgreSQL image
FROM postgres:14.9

# Copy the SQL file into the container
COPY birthquery.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL default port
EXPOSE 5437

