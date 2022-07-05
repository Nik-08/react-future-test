
FROM node:12

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install
RUN npm i -g serve

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . .

# Build the app
RUN npm run build

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
EXPOSE 8000

# Start the app
CMD ["serve", "./build", "-p", "8000"]

