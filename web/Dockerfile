FROM node as builder

WORKDIR /home/build/

ARG NODE_ENV=development
COPY package.json package-lock.json /home/build/
RUN npm install

COPY . /home/build
RUN npm run build && cp src/logVisit.js dist/logVisit.js


FROM nginx as hoster

COPY --from=builder /home/build/dist /var/www/pagestatistics
COPY nginx.conf /etc/nginx/conf.d/default.conf