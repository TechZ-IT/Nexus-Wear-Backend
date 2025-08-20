FROM node:18-bullseye

# Install build deps for canvas
RUN apt-get update && apt-get install -y \
  python3 make g++ libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Railway will inject PORT, so expose 3000
EXPOSE 3000

CMD ["yarn", "start:prod"]
