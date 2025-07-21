FROM node:18

RUN \
 apt-get update && \
 apt-get upgrade -y && \
 apt-get install libcap2-bin -y && \
 setcap 'cap_net_bind_service=+ep' $(eval readlink -f `which node`)

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/pagestatistics/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/pagestatistics
RUN npm install

USER root
COPY . $HOME/pagestatistics
RUN \
 mkdir database && \
 find . \( -path ./node_modules \) -prune -o -user root -print0 | xargs -0 chown app:app && \
 node_modules/typescript/bin/tsc

USER app
CMD ["node", "dist/server.js"]
