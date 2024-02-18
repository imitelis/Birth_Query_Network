#!/bin/sh

# environment variables
export POSTGRES_DB=birthquery
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=123456
export DATABASE_URL=postgresql://postgres:123456@database:5432/birthquery
export SECRET_KEY=secret
export GOOGLE_KEY=socialproject56281-f0931ca69621.json
export ADMIN_USERNAME=administrator
export ALLOWED_HOST=backend
export ALLOWED_ORIGIN=frontend
export VITE_ADMIN_USERNAME=administrator
export VITE_PROXY_URL=http://backend:8000