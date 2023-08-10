
# gRPC

You can browser `gRPC-code` folder to see the code.

- gRPC is a modern, open source, high-performance remote procedure call (RPC) framework that can run anywhere.

- Framework developed by Google and it is based on HTTP/2 and Protocol Buffers.

- CNCF (Cloud Native Computing Foundation) project.

## Use cases

- Microservices
- Mobile, browser, and IoT clients
- Generate libraries automatically
- Bi-directional streaming and integrated auth

## Supported languages

- gPRC-GO
- gPRC-Java
- gPRC-C
-- C++
-- Python
-- Ruby
-- Objective-C
-- PHP
-- C#
-- Node.js
-- Dart

## RPC - Remote Procedure Call

Server exposes a set of methods that can be called by the client.

- Client calls a method on the server
- Server executes the method and returns a result to the client
- Client blocks until it receives the result from the server

## Protocol Buffers

Are a language-neutral, platform-neutral, extensible way of serializing structured data for use in communications protocols, data storage, and more.


"Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data - think XML, but smaller, faster, and simpler."

- Language-neutral: You can use whatever language you want to use
- Platform-neutral: You can use it on whatever platform you want to use
- Extensible: You can extend it in several ways

## Protocol Buffers vs JSON

- Protocol Buffers are binary and smaller than JSON
- Protocol Buffers are faster than JSON ( parsing and serialization )
- Protocol Buffers enforce a schema
- Protocol Buffers have code generation support

# gRPC - Unary

- Unary RPC is the most basic type of RPC where the client sends a single request to the server and gets a single response back, just like a normal function call.

- Unary RPC is a good choice if both the client and server need to exchange a small amount of data.

# gRPC - Server Streaming

- Server streaming RPC is where the client sends a request to the server to get a stream to read a sequence of messages back. Once the client has finished reading the server sends status code back, it's optional for the server to send back a response message.

# gRPC - BI-Directional Streaming

- Bi-directional streaming RPC is where both sides send a sequence of messages using a read-write stream. The two streams operate independently, so clients and servers can read and write in whatever order they like: for example, the server could wait to receive all the client messages before writing its responses, or it could alternately read a message then write a message, or some other combination of reads and writes. The order of messages in each stream is preserved.

# Rest vs gRPC

Rest:

- Text / JSON
- Unidirectional
- High latency
- No Contract
. No Streaming support
- Designed for request/response
- Third party tools for code generation

gRPC:

- Protocol Buffers
- Bi-directional and Asynchronous
- Low latency
- Contract first
- Streaming support
- Designed for streaming
- First class support for code generation

