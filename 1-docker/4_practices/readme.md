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

# NodeJS

We can do it with Node running docker run

using --rm to remove container after exit

using -it to interactive mode

using -v to mount a volume => -v ${pwd}:/usr/src/app

using -p to expose port => -p 3000:3000

and finally the image name => node:18-alpine

add bash in the end to run bash


```bash

docker run --rm -it -v $PWD:/usr/src/app -p 3000:3000 node:18 bash

Unable to find image 'node:18' locally
18: Pulling from library/node
a31111d07004: Pull complete 
2455b3521079: Pull complete 
dd13397d6ccd: Pull complete 
344a74fed666: Pull complete 
60b2c1a2936f: Pull complete 
879df467f24e: Pull complete 
fea547e8ea42: Pull complete 
a2a3b9344e24: Pull complete 
Digest: sha256:19892542dd80e33aec50a51619ab36db0921de240c6a4ff6024d801f84881293
Status: Downloaded newer image for node:18
root@6f55d2879bdf:/# cd /usr/src/app && touch oi.js
```

This will create a file in your current folder, because we mount the volume

PS: this bellow command not work for mac:

```bash
docker run --rm -it -v ${pwd}/:/usr/src/app -p 3000:3000 node:18 bash
```

Now we gonna build a image with Dockerfile

I created a dockerfile inside node folder

To build the image:

```bash
docker build -t newgate7x/hello-express .
```

Now i want to test it:

```bash
docker run --rm -it -p 3000:3000 newgate7x/hello-express
```

Now i will send to docker hub:

```bash
docker push newgate7x/hello-express
```

to build file production:

```bash
docker build -t newgate7x/hello-express -f Dockerfile.prod .
```

# Optimizing Dockerfile

1 - We can use alpine image, because it is smaller
2 - We can use Multi Stage Build, to build and run in different images

The second stage we will remove the current html folder

```dockerfile
RUN rm -rf /var/www/html
```

Now we will copy folder from first stage

```dockerfile
COPY --from=builder /var/www/html /var/www/html
```

and give permission to www-data

```dockerfile
RUN chown -R www-data:www-data /var/www/html
```

Now we will expose port and run php-fpm

```dockerfile
EXPOSE 9000

CMD ["php-fpm"]
```


Now, lets build:

```bash
docker build -t newgate7x/laravel:prod . -f Dockerfile.prod
```

lets show our images now:

```bash
docker images | grep laravel

newgate7x/laravel                               prod            3444f2e607aa   51 seconds ago   140MB
newgate7x/laravel                               latest          d44fc4bf7a86   57 seconds ago   519MB
```

Look the difference between prod and latest, prod is 140MB and latest is 519MB

lets add a nginx to our project:

```bash
cd nginx
```

I already created a Dockerfile, now lets build:

```bash
docker build -t newgate7x/nginx:prod . -f Dockerfile.prod
```

now, let put them in the same network:

```bash
docker network create laranet
```

Now we can run our containers:

```bash
docker run --rm --name laravel -d --network laranet -p 9000:9000 newgate7x/laravel:prod
docker run --rm --name nginx -d --network laranet -p 8080:80 newgate7x/nginx:prod

CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS          PORTS                  NAMES
762cf13e603a   newgate7x/nginx:prod     "/docker-entrypoint.…"   3 seconds ago    Up 2 seconds    0.0.0.0:8080->80/tcp   nginx
d5e9309d480e   newgate7x/laravel:prod   "docker-php-entrypoi…"   39 seconds ago   Up 38 seconds   9000/tcp               laravel
```

In this step i had some problem with folders and something that works is to add this line:

```dockerfile
RUN ln -s /var/www/laravel/public /var/www/html
```

Now, we can access our project in http://localhost:8080