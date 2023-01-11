# add the Node.js docker image
FROM node:18-alpine

# Create directory that runs the app on docker
WORKDIR /api-teste

# COPY package.json and package-lock.json files
COPY package.json ./
COPY package*.json ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install package.json dependencies
RUN yarn install

# COPY
COPY . .

# Run and expose the server on port 3030
EXPOSE 3030

# A command to start the server
CMD yarn start