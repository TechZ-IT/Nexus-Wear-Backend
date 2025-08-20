FROM node:alpine

RUN mkdir -p /var/www/app

# Create application directory
RUN mkdir -p /var/www/app/uploads

WORKDIR /var/www/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3009
CMD ["yarn", "start:dev"]