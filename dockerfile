# ---------- Build stage ----------
FROM node:18-bullseye as build

# Install build deps for node-canvas
RUN apt-get update && apt-get install -y \
  python3 make g++ libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


# ---------- Production stage ----------
FROM node:18-bullseye

WORKDIR /app

# Copy only production dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy build output and any other needed files
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY .env* ./   # optional if you need env files baked in

# Railway will inject PORT dynamically
EXPOSE 3000

CMD ["yarn", "start:prod"]
