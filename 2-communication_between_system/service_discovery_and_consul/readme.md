# Introduction

How to discover services with consul

Consul is a service discovery tool that allows services to register themselves and to discover other services. Using either DNS or HTTP, applications can easily find the services they depend upon.

It was created by HashiCorp and is written in Go.

# Context

Use cases in distributed systems:

- App A
- App B
- App C

App A needs to communicate with App B and App C. App A needs to know the IP address and port of App B and App C.

# Question to answer

- Which IP address and port should App A use to communicate with App B and App C?
- How can App A know the IP address and port of App B and App C?
- How can App B and App C register themselves to be discovered by App A?
- How to be sure that App A is able to communicate with App B and App C?
- How do i know if i have permission to communicate with App B and App C?

# Solution

- Find machine available in the network
- Segment how to communicate with each other
- DNS Resolution
- Health check
- ACL

# Agent, Server and Client

Consul is a distributed, highly available system. Consul runs as a set of agents, one per machine. Each agent maintains a local database of services and nodes, and communicates with other agents to propagate changes.

Agents can run in either server or client mode. In server mode, an agent can participate in the distributed consensus to elect a leader. The leader is responsible for managing the state of the cluster. In client mode, an agent forwards all RPCs to a server. Clients are typically lightweight and do not participate in the consensus.

## Agent

The agent is the core process of Consul. It runs in the background and performs all of the Consul related tasks on that machine. The agent is responsible for:

- Registering services and checks
- Running checks
- Responding to queries and RPCs
- Propagating state changes
- Leader election

## Server

The server is responsible for being part of the consensus quorum and participating in the state transfer. The server is also responsible for responding to RPCs from clients and returning information about the cluster.

## Client

The client is responsible for forwarding RPCs to the servers. Clients do not participate in the consensus or store any state.
