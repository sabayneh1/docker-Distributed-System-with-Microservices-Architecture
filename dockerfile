# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]



# # Build stage
# FROM node:14 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Final stage
# FROM node:14-alpine
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# COPY package*.json ./
# RUN npm install --only=production
# EXPOSE 3000
# CMD ["node", "dist/app.js"]
