FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["node", "app.js"]


# # Build stage
# FROM node:14 AS builder
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Final stage
# FROM node:14-alpine
# WORKDIR /usr/src/app
# COPY --from=builder /usr/src/app/dist ./dist
# COPY package*.json ./
# RUN npm install --only=production
# EXPOSE 3003
# CMD ["node", "dist/app.js"]
