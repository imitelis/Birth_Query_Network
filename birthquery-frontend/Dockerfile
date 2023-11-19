# Use the official Node image as a base
ARG NODE_VERSION=18.18.0
FROM node:${NODE_VERSION}-slim as base

# Add a /app work directory
WORKDIR /app

# Copy package.json there
COPY package.json .

# Update npm to latest
RUN npm install -g npm@latest

# Install npm dependencies
RUN npm install

# Copy app files
COPY . .

# Expose a port
EXPOSE 9000

# Starting the React app with vite
CMD [ "npm", "run", "dev" ]
