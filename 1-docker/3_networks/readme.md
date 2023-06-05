# Docker Networks

Imagine i want to run a web application in a container and a database in another container. How can i connect them?

For example:
- Ruby on Rails application
- Postgres database

Types of networks:

- Bridge
When you want to connect containers on a single host.

- Host
Mix the container network with the host network.
Example => Running Rails on port 80, I can connect without specify (or expose) the port.

So, they are in the same network.

- Overlay

If i need to create a Swarm cluster, i need to use overlay network.
Because i need to connect containers on different hosts.

- Macvlan

If i need to connect containers directly to the physical network.
For example:
- I want to run a container with a public IP address
- I want to run a container with a MAC address

- None

If i want to disable all networking.

# Inspection

If you want to list all networks:

```bash
docker network ls
```

and if you want to inspect a network:

```bash
docker network inspect bridge
```

# Testing 2 containers

First, lets create 2 containers:

```bash
docker run -d -it --name ubuntu1 bash
docker run -d -it --name ubuntu2 bash
```

now we will attach the ubuntu1:

```bash
docker attach ubuntu1
bash-5.2# ip addr
..........inet 172.17.0.2/16
```

and ubuntu2:

```bash
docker attach ubuntu2
bash-5.2# ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3): 56 data bytes
````

Note that if we try to ping ubuntu2, it will not work.

```bash 
bash-5.2# ping ubuntu2
ping: bad address 'ubuntu2'
```

Now, you can see that they are in the same network.

another way to check the network is:

```bash
docker network inspect bridge

"Containers": {
            "d9f8b71b5f5f407e3380e8e1710f69ee4efbe1be9e813cdb93d14946eb9433c6": {
                "Name": "ubuntu2",
                "EndpointID": "f90c4acb4c25da230b391367c6abc0201558b3b67ab654d4bbee59b5ef5efd02",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            }
},
```

Now we gonna create a new network:

```bash
docker network create --driver bridge alekinho-network
```

Now we gonna create a new container and attach to the new network:

```bash
docker run -d -it --name ubuntu1 --network alekinho-network bash
docker run -d -it --name ubuntu2 --network alekinho-network bash

2_working_with_Images git:(main) ✗ docker exec -it ubuntu1 bash
bash-5.2# ping ubuntu2
PING ubuntu2 (172.21.0.3): 56 data bytes
64 bytes from 172.21.0.3: seq=0 ttl=64 time=0.577 ms
64 bytes from 172.21.0.3: seq=1 ttl=64 time=0.365 ms
```


Now we will create a new ubuntu3 container and we will not attach to any network:

```bash
docker run -d -it --name ubuntu3 bash
2_working_with_Images git:(main) ✗ docker exec -it ubuntu3 bash
bash-5.2# ping ubuntu2
ping: bad address 'ubuntu2'
bash-5.2# ping ubuntu1
ping: bad address 'ubuntu1'
bash-5.2# ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3): 56 data bytes
--- 172.17.0.3 ping statistics ---
4 packets transmitted, 0 packets received, 100% packet loss
```

But we can connect to the ubuntu3 container to a network:

```bash
docker network connect alekinho-network ubuntu3
```

Now it will work

```bash
2_working_with_Images git:(main) ✗ docker network connect alekinho-network ubuntu3
➜  2_working_with_Images git:(main) ✗ docker exec -it ubuntu3 bash                   
bash-5.2# ping ubuntu2
PING ubuntu2 (172.21.0.3): 56 data bytes
64 bytes from 172.21.0.3: seq=0 ttl=64 time=1.510 ms
64 bytes from 172.21.0.3: seq=1 ttl=64 time=0.559 ms
```

# Host Network

Observation: Docker was made for Linux. So, if you are using Docker for Mac or Docker for Windows, you will not be able to use the host network.

Running on Mac, the host is a virtual machine.

So the Host is the VM, not the Mac. Different from Linux.

On windows on WSL2, the host is the WSL2.

On windows, the host is the Hyper-V.

```bash
docker run -d -it --name nginx --network host nginx
```

If you run the command above, you will not be able to run another container on port 80.

```bash
curl localhost:80
curl: (7) Failed to connect to localhost port 80 after 5 ms: Couldn't connect to server
```

# Container accessing outside port

Imagine im running the server folder like:

```bash
php -S 0.0.0.0:8000
[Mon Jun  5 21:45:53 2023] PHP 8.2.6 Development Server (http://0.0.0.0:8000) started
```

Now, i want to access the server from another container.

```bash
docker run --rm -it --name alekinho ubuntu bash
```

Now, i will install curl and try to access the server:
I will not use localhost, but http://host.docker.internal

```bash
root@1d9455d422a5:/# curl http://host.docker.internal:8000
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
</head>
<body>
    <h1>Server</h1>
</body>
</html>
```