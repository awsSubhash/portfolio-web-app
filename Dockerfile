# Use the official Node.js 18 LTS slim image for a smaller footprint
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to install dependencies (leverages layer caching)
COPY package.json ./

# Install production dependencies only
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port 3000 (used by server.js)
EXPOSE 3000

# Command to start the Express server
CMD ["node", "server.js"]
