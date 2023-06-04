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
