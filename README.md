<p align="center">
  <img src="http://pagestatistics.anwilc.com/logo.svg?32f3963fb7f0bc47b00926e38b55dd95" alt="Logo" width="250" />
</p>
<br>

# PageStatistics

A tool for keeping track of number of visits to different websites. Consists of a frontend showing visits last hour/day/week with a service for receiving and keeping track of visit calls. I didn't want to pull in Google Analytics or something similarly large for such a simple task so instead I rolled my own.

No identifiable data about the user is saved, only a timestamp and a sha256 hash of the user's IP is stored.

## Implementation

The frontend is built with Vue.js combined with Typescript and packed using webpack. For simple hosting it's hosted by Nginx inside a Docker container.
Backend uses Express.js in Node coded in Typescript. An SQLite database is used for saving each visit. It's also hosted in a Docker container.

## Steps to host and run locally

1) Install Docker if you don't already have it
2) Run `docker-compose up`. This will require usage of port 80 but you can change that in the docker-compose.yml configuration.
3) Add the following script tag at the top of your html file to any page you want to log a visit to; make sure to change the address and the page id.<br>
`<script src="http://address.example.com" page="PageId"></script>`
4) Go to localhost

Now any visits to the page will be shown on the localhost statistics page.

Note that there is a docker-compose.prod.yml, it assumes there is a network called production that has a reverse proxy container that will forward requests. That's why port 80 isn't exposed outside the docker swarm in production.
