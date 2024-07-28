# FROM --platform=linux/amd64 node:lts-alpine3.19
# WORKDIR /app
# COPY . /app
# RUN npm install
# COPY .dockerignore /app/.dockerignore
# CMD [ "npm","run","start"]

# Use an official Node.js runtime as a parent image
FROM --platform=linux/amd64 node:lts-alpine3.19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "run", "dev"]
