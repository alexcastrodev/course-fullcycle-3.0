# Docker Compose

In the previous class, we saw how to create container with Docker run command, and now we will transform this:


```bash
docker run --rm --name laravel -d --network laranet -p 9000:9000 newgate7x/laravel:prod
docker run --rm --name nginx -d --network laranet -p 8080:80 newgate7x/nginx:prod
```

in the docker-compose.yml file.


If we are not working with Builded images, we can use build on docker-compose.yml file:

```yaml
version: '3'

services:
  laravel:
    build:
      context: .
      dockerfile: Dockerfile.prod
```

now we can run:

```bash
docker-compose up
```

and we will see the same result as before.

if we want to run in background, we can use:

```bash
docker-compose up -d
```

if we change de dockerfile, we need to rebuild the image, so we can use:

```bash
docker-compose up -d --build
```

if we want to stop the containers, we can use:

```bash
docker-compose down
```

# Connecting Node to MySQL

Now, we will create a new folder called node, and we will create a Dockerfile

Troubleshoot:
```bash
2023-07-01 11:39:18+00:00 [ERROR] [Entrypoint]: MYSQL_USER="root", MYSQL_USER and MYSQL_PASSWORD are for configuring a regular user and cannot be used for the root user
```

you need remove the environment variables MYSQL_USER and MYSQL_PASSWORD from docker-compose.yml file.

now we can run:

```bash
docker-compose up -d --build
```

To check people table:

```bash
docker-compose exec mysql mysql -u root -p
```

```sql
use nodedb;
select * from people;
```

Results:

```bash
node git:(main) ✗ docker-compose exec db mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.7.42 MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use nodedb;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select * from people;
+----+----------+
| id | name     |
+----+----------+
|  1 | Alekinho |
|  2 | Alekinho |
+----+----------+
2 rows in set (0.02 sec)

mysql> 
```

Now, how can we wait for mysql to be ready before running the node app?

The depends on option in docker-compose.yml file is not enough, because it only waits for the container to be running, not for the service to be ready.

# Option 1: healthcheck
we can use healthcheck option in docker-compose.yml file:

```yaml
version: '3'

services:
  db:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"]
      timeout: 20s
      retries: 10
```

Now, we can run:

```bash
docker-compose up -d --build
```

# Option 2: dockerize

We can also check with dockerize:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app
    entrypoint: dockerize -wait tcp://db:3306 -timeout 50s docker-entrypoint.sh
```

add to dockerfile ( alpine version ):

```dockerfile
ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget
```

and the logs of node is:

```bash
2023/07/01 13:14:18 Waiting for: tcp://db:3306
2023/07/01 13:14:18 Connected to tcp://db:3306
Welcome to Node.js v18.16.1.
Type ".help" for more information.
> 
```

# Option 3: wait-for-it

We can also use wait-for-it.sh script:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: app
    entrypoint: ./wait-for-it.sh db:3306 --timeout=50 --strict -- node index.js
```

and the logs of node is:

```bash
wait-for-it.sh: waiting 50 seconds for db:3306
wait-for-it.sh: db:3306 is available after 0 seconds
Welcome to Node.js v18.16.1.
Type ".help" for more information.
> 
```

References:

https://github.com/jwilder/dockerize

https://github.com/codeedu/docker-wait-for-it