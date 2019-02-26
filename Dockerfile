FROM node

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json package-lock.json $HOME/visitstatistics/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/visitstatistics
RUN npm install

USER root
COPY . $HOME/visitstatistics
RUN find . \( -path ./node_modules \) -prune -o -user root -print0 | xargs -0 chown app:app

USER app