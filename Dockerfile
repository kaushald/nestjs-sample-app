# Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
