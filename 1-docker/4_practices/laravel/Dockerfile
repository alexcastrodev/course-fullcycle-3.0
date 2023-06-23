FROM php:7.4-cli

WORKDIR /var/www/html

RUN apt-get update && \
    apt-get install curl -y && \
    apt-get install libzip-dev -y && \
    docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php

RUN ./composer.phar create-project --prefer-dist laravel/laravel blog

ENTRYPOINT [ "php", "blog/artisan", "serve" ]

CMD [ "--host=0.0.0.0" ]