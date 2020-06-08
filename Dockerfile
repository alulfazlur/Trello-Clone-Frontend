FROM nginx:stable
MAINTAINER Fazlur Rahman "fazlur@alterra.id"

RUN mkdir -p /trello/www/Trello-Clone
RUN mkdir -p /trello/log

COPY default.conf /etc/nginx/conf.d

ADD build/. /trello/www/Trello-Clone

WORKDIR /trello/www/Trello-Clone
