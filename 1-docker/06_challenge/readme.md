# Challenge

## Description

Create a docker that runs a Go application that prints "olá mundo".

## Requirements

- Docker
- Go
- Weight: untill 2mb

## Instructions

- Create a Dockerfile

- Create a Go application that prints "olá mundo"

- Build the docker image

- Run the docker image

- publish the image on Docker Hub

# Solution

I created a Dockerfile, so you can build the image with:

```bash
docker build -t newgate7x/fc_golang .
```

and run with:

```bash
docker run --rm newgate7x/fc_golang
```

and you will see:

```bash
06_challenge git:(main) ✗ docker run --rm newgate7x/fc_golang  
Hello, world.
```

and you can publish the image with:

```bash
docker push newgate7x/fc_golang
```

Fixing the weight:

```bash
➜  06_challenge git:(main) ✗ docker images | grep fc_golang       
newgate7x/fc_golang                             latest          67ddb57a5e47   11 seconds ago   253MB
newgate7x/fc_golang                             <none>          5feda7fae753   2 minutes ago    9.57MB
```

The first one is the alpine, and the second one is the golang image.

Based on docker documentation, we can use scratch image to create a base image:

```dockerfile
FROM scratch
ADD fc_golang /
CMD ["/fc_golang"]
```

and we can build with:

```bash
docker build -t newgate7x/fc_golang:scratch .
```

and run with:

```bash
docker docker images | grep fc_golang
newgate7x/fc_golang                             latest          b25a2cfe648d   20 seconds ago   1.91MB
```

Link: https://hub.docker.com/repository/docker/newgate7x/fc_golang

## References

- https://go.dev/doc/code

- https://docs.docker.com/build/building/base-images/#creating-a-simple-parent-image-using-scratch