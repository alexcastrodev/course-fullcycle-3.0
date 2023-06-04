# Introduction

Working with images is a very important part of the Docker ecosystem. In this section we will learn how to create our own images, how to use images from the Docker Hub and how to publish our own images.

When we use: `nginx:latest`, we are using the `nginx` image with the `latest` tag. This tag is used to identify the version of the image. If we don't specify the tag, Docker will use the `latest` tag by default.

All registry has the latest version, for example:

- `nginx:latest` is the same as `nginx:1.19.6`
- `nginx:1.19` is the same as `nginx:1.19.6`
- `nginx:1` is the same as `nginx:1.19.6`

The container registry is a place where we can store our images. The most famous is the Docker Hub, but there are others like:

- [Quay](https://quay.io/)
- [AWS ECR](https://aws.amazon.com/ecr/)
- [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)
- [Google Container Registry](https://cloud.google.com/container-registry)

The official registry is the Docker Hub, where we can find images from the community and from companies like Microsoft, Oracle, IBM, etc.

# Create our own image

To create our own image we need to create a file called `Dockerfile`. This file will contain the instructions to create our image.

## Dockerfile

The `Dockerfile` is a file that contains the instructions to create our image. It is a text file that contains all the commands that we would normally use on the command line to create our image.

The `Dockerfile` is composed of the following instructions:

- `FROM`: Defines the base image that we will use to create our image.
- `LABEL`: Defines metadata for our image.
- `RUN`: Runs a command on the image.
- `COPY`: Copies files and directories from the host to the image.
- `ADD`: Copies files and directories from the host to the image. It also allows you to download files from the internet.
- `CMD`: Defines the default command that will be executed when the container is started.
- `EXPOSE`: Informs which ports will be exposed by the container.
- `ENTRYPOINT`: Defines the default command that will be executed when the container is started. It is similar to `CMD`, but it does not allow the command to be overridden when the container is started.
- `ENV`: Defines environment variables.
- `VOLUME`: Creates a mount point for a volume.
- `USER`: Defines the user that will be used to run the commands.
- `WORKDIR`: Defines the working directory.
- `ARG`: Defines variables that can be passed to the `docker build` command.
- `ONBUILD`: Defines commands that will be executed when the image is used as the base image for another image.

Create a new nginx image with a custom index.html

```bash
FROM nginx:latest

RUN apt-get update 

RUN apt-get install -y vim # -y to not ask for confirmation

```

# Publish our image

To publish our image we need to create an account on the Docker Hub. After creating the account we need to create a repository. The repository name must be in the format `username/repository-name`.

After creating the repository we need to login to the Docker Hub using the `docker login` command. After logging in we need to tag our image with the name of our repository. The tag must be in the format `username/repository-name:tag`.

After tagging our image we need to push it to the Docker Hub using the `docker push` command.

Now, run docker build called newgate7x/nginx-with-vim:1.0

```bash
docker build -t newgate7x/nginx-with-vim:1.0 .
```

I got the error:

```bash
[+] Building 0.0s (1/2)
 => [internal] load build definition from Dockerfile                                                                    0.0s
 => => transferring dockerfile: 2B                                                                                      0.0s
ERROR: failed to solve: rpc error: code = Unknown desc = failed to solve with frontend dockerfile.v0: failed to read dockerfile: open /var/lib/docker/tmp/buildkit-mount15430198/Dockerfile: no such file or directory
```

That's because i ran the command in the wrong folder. I need to run in the folder that contains the Dockerfile.

Now, run docker build called newgate7x/nginx-with-vim:1.0

```bash
docker build -t newgate7x/nginx-with-vim:1.0 .
```

And then, push the image to the Docker Hub

```bash
docker push newgate7x/nginx-with-vim:1.0
```

# Build

```bash
docker build -t newgate7x/nginx-with-vim:latest .
```

# Using our image

To use our image we just need to run the `docker run` command. If the image is not available locally, Docker will download it from the Docker Hub.

```bash
docker run -d -p 8080:80 newgate7x/nginx-with-vim:1.0
```

# Entrypoint vs CMD

The `ENTRYPOINT` and `CMD` instructions are used to define the default command that will be executed when the container is started. The difference between them is that the `ENTRYPOINT` instruction does not allow the command to be overridden when the container is started.


If i want to run echo "Hello World" when the container is started, i can use the `CMD` instruction.

```bash
FROM ubuntu:latest

CMD ["echo", "Hello World"]
```

If i execute: `docker run newgate7x/hello-world`, the output will be: `Hello World`. And Container will not be running.

if i run like:

```bash
docker run -it newgate7x/hello-world echo "Hello Docker"
```

The output will be: `Hello Docker`. And Container will not be running.
I replace the CMD command with echo "Hello Docker"

If i want to run echo "Hello World" when the container is started, i can use the `ENTRYPOINT` instruction.

```bash
FROM ubuntu:latest

ENTRYPOINT ["echo", "Hello "]
CMD ["World"]
```

after run `docker run newgate7x/hello-world Alex`, the output will be: `Hello Alekinho`.

1 => the Alex replace the CMD command
2 => the CMD command is used as a default value
3 => the ENTRYPOINT command a fixed command

# publish

Testing begore push

```bash
docker run --rm -d -p 3000:80 newgate7x/nginx-with-vim
```

```bash
docker build -t newgate7x/hello-world:1.0 .
docker push newgate7x/hello-world:1.0
```

# Tips

To clear all container:

docker ps => will show all running containers
docker ps -a => will show all containers
docker ps -a -q => will show all containers ids

So, if i run:
`docker rm $(docker ps -a -q)` => will remove all containers
