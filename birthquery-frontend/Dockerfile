# Use the official Node image as a base
ARG NODE_VERSION=18.13.0
FROM node:${NODE_VERSION}-slim AS base

# Add a /app work directory
WORKDIR /app

# Copy package.json there
COPY package.json .

# Install npm dependencies
RUN npm install

# Copy app files
COPY . .

# Expose a port
EXPOSE 9000

# Starting the React app with vite
CMD [ "npm", "run", "dev" ]
