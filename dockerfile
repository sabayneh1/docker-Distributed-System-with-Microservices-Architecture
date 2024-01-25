# Use an official Node.js runtime as the base image
FROM node:14
# Use the official Jenkins image as a parent image
FROM jenkins/jenkins:lts

# Switch to root to be able to perform privileged operations
USER root

# Create Docker group and add Jenkins user to it
RUN groupadd -g 999 docker && \
    usermod -a -G docker jenkins

# Set the working directory in the container for Node app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for Node app
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Switch back to the jenkins user
USER jenkins

# Command to run the application
CMD ["node", "app.js"]
