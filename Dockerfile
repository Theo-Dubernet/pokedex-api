FROM httpd:2.4

ARG GITHUB_PROJECT

RUN apt update && apt install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/local/apache2/htdocs/

RUN rm -rf ./* \
    && git clone ${GITHUB_PROJECT} .

EXPOSE 80