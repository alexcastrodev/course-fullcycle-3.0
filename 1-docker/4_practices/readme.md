# Installing framework in container

You can install a framework in a container, and then use it to create a new container.

For example, if you need to install php with Laravel, so you can try step by step inside a container, note all steps and update Dockerfile.

Imagine you dont know Laravel, so before create a new Docker file you can try:

```bash
docker run -it --name laravel php:7.4-cli bash
```

So, you need update the debian dependencies, right? so you can try:

```bash
apt-get update
```

Note that you have the /var/www/html folder, so you can try:

```bash
cd /var/www/html
```

Now you can install Laravel, but we dont have composer, so you can try:

```bash
apt-get install curl -y
```

Now you can install composer:

```bash
curl -sS https://getcomposer.org/installer | php
```

If you try install Laravel, you will got an error, because you dont have zip lib installed, so you can try:

```bash
apt-get install libzip-dev -y
```

And you need to install zip extension:

```bash
docker-php-ext-install zip
```

Now you can install Laravel:

```bash
./composer.phar create-project --prefer-dist laravel/laravel blog
```

Now we can create a new Dockerfile:

```dockerfile
FROM php:7.4-cli

WORKDIR /var/www/html

RUN apt-get update && \
    apt-get install curl -y && \
    apt-get install libzip-dev -y && \
    docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php

RUN ./composer.phar create-project --prefer-dist laravel/laravel blog

```

Now lets add a entrypoint:

```dockerfile
...
ENTRYPOINT [ "php", "blog/artisan", "serve" ]
```

Now, lets build:

```bash
    docker build -t newgate7x/laravel:latest .
```

After build, you can run:

```bash
docker run --rm --name laravel -p 8000:8000 newgate7x/laravel
```

Now, we cant access, because we need to run the server on HOST, instead 127.0.0.1

So, we need to change the entrypoint:

```dockerfile
...
ENTRYPOINT [ "php", "blog/artisan", "serve", "--host=0.0.0.0" ]
```

We can also allow to change the host by command, like:

```dockerfile
...
ENTRYPOINT [ "php", "blog/artisan", "serve" ]
CMD [ "--host=0.0.0.0" ]
```

now its working:

```bash
4_practices git:(main) ✗ docker run --rm --name laravel -p 8000:8000 newgate7x/laravel
Starting Laravel development server: http://0.0.0.0:8000
[Thu Jun 15 20:32:45 2023] PHP 7.4.33 Development Server (http://0.0.0.0:8000) started
[Thu Jun 15 20:32:49 2023] 172.17.0.1:56416 Accepted
[Thu Jun 15 20:32:49 2023] 172.17.0.1:56418 Accepted
[Thu Jun 15 20:32:49 2023] 172.17.0.1:56416 Closing
[Thu Jun 15 20:32:49 2023] 172.17.0.1:56418 [200]: GET /favicon.ico
[Thu Jun 15 20:32:49 2023] 172.17.0.1:56418 Closing
```