FROM node:alpine

# Install Python and build dependencies required for canvas
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

RUN mkdir -p /var/www/app

# Create application directory
RUN mkdir -p /var/www/app/uploads

WORKDIR /var/www/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3012
CMD ["yarn", "start:prod"]