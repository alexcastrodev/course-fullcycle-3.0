# Docker

## Starting from zero

So, what are containers ?

Documentation says: "A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another. A Docker container image is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings."

3 Pilar of Container

- Namespace
- CGroups
- File System

<img src="assets/namespaces.png" />


Disclaimer: Container are not lightweight virtual machine

Deep diving:

- Namespaces => Isolate de process
- Parent process 1
-  - Subprocess 1
-  - Subprocess 2
- Parent process 2
-  - Subprocess 1
-  - Subprocess 2

When container run, it's a Parent process with Namespace that figure a OS, so the namespace can't see the others process running.

### Namespace:

- PID
- User
- Network
- Filesystem

### Cgroups:

Cgroups control of resources

how?

Imagine you have a computer of 16gb ram, and the process has a memory leak, it can hurt others processes.

With CGroups we can limit the resource like:

memory = 1gb

cpu_shares = 512

### File system - OFS (Overlay File System)

This FS work with Layers.

Different from EC2, or another VM, I dont need the whole OS Snapshot. 

For example, if i have 2 Containers MyApp:v1 that has 2 dependencies ( 200mb each one )

The MyApp:v2 if it has same dependencies, i dont need download it again. We dont need full copy files.

With Container we dont need whole OS like ubuntu, debian, but just the necessary files. The Kernel and libraries is shared by "host".

### Images

Layers:

-> Scratch

--> Part of Ubuntu

---> Bash ( layer of ubuntu )

---> ssh.d  ( layer of ubuntu )

----> MyApp:v1  ( layer of ssh.d )

If we have some problems with Layer ubuntu, we can change this layer and will not affect others parts.

Images has:
- name 
- version (optional, but necessary)

<img src="assets/image.png" />

Images are immutable, so if you change something, it will create a new layer.

If you stop a container, it will not delete the container, but if you remove the container, it will delete the container. And all write layer will be deleted.

### Dockerfile

From dockerfile, we can create a image.

<img src="assets/build.png" />

# Docker Host

Docker Host is the machine that run the docker.

- Daemon API
- Cache
- Volumes ( Container are immutable, so we need a place to store the data)
- Network ( Communication between containers)

# Registry

Registry is the place that store the images.
- Push
- Pull

# Docker Client

Docker Client has the commands to interact with Docker Host.
- Container
- Run, pull, push
- Volumes

<img src="assets/docker_works.png" />

## Starting with Docker

soon...

## Working with Images

soon...

## Networks

soon...

## Practice

soon...

## Optimize images

soon...

## Docker-compose

soon...