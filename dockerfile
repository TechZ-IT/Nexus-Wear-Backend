# Use Node.js LTS
FROM node:22-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN yarn build

# Set Node memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
