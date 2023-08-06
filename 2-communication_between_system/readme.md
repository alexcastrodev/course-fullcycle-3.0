# Introduction

Here we will see how to communicate between systems using: 

- REST
- GraphQL
- gRPC
- Service Discovery and Consul

# Sincronous communication

In this case, the client waits for the response of the server.

# Asincronous communication

In this case, the client doesn't wait for the response of the server.

In most cases, we will work with system that communicate asincronously. We can use a message broker to do this.

- RabbitMQ
- Kafka
- AmazonSQS

You garantize that the message will be delivered, but you don't garantize that the message will be delivered in the same order.
