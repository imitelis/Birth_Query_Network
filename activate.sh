#!/bin/sh

# environment variables
export POSTGRES_DB=birthquery
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=123456
export DATABASE_URL=postgresql://postgres:123456@db:5432/birthquery
export SECRET_KEY=secret
export GOOGLE_KEY=socialproject56281-f0931ca69621.json
export ADMIN_USER=administrator
export ALLOWED_HOST=http://0.0.0.0:8000
export ALLOWED_ORIGIN=http://0.0.0.0:8000
export VITE_ADMIN_USER=administrator


# docker compose
docker-compose -f docker-compose.prod.yml up -d
