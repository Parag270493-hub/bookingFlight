# Use official Node.js image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Angular app
RUN npm run build --prod

# Stage 2: Serve app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/bookingFlight /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
