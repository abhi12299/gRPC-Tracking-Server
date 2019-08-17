## This is an example grpc server to track user activity on your website or any other platform*.

<sub>*Read more about gRPC supported platforms [here](https://www.grpc.io/docs/)</sub>

### 1. What?
gRPC is an implementation of Remote Procedure Call by Google. Read more about it [here](https://www.grpc.io/docs/tutorials/basic/node/). It uses HTTP/2 and protobufs to pass data to/from the client and the server, unlike REST which uses JSON. the data transmitted is binary and hence it is much faster as compared to JSON.

### 2. Why?
Well, to capture user activity on your website or any other platform. While there are other services such as Google Analytics that work great for getting anonymous user data, this can help you track your app's registered or even anonymous user data. The solution is horizontally scalable and relatively easy to get started with.

### 3. How?
There are multiple branches in this repo. Check them out to see what technologies they use. This one(master) uses Kafka on the server side to create a simple data pipeline i.e. a producer sending message to a topic and a consumer storing it in MongoDB. With Kafka you can create complex data pipelines with ease and feed data to multiple sources in a sophisticated way.
Now, there is quite some initial setup involved if you wish to move ahead with Kafka. Head over to `Install_instructions.md` for further instrcutions.

### 4. Starting the server
Start the kafka server

`cd /usr/local/kafka`

`bin/zookeeper-server-start.sh config/zookeeper.properties`

`bin/kafka-server-start.sh config/server.properties`

Keep it running! Don't quit it.

Envoy proxy! (Since browsers don't yet support HTTP/2, we need it to convert HTTP/2 to HTTP/1.1 and vice versa)
cd to this directory.

`docker build -t your_tag/grpc-test -f ./envoy.Dockerfile .`

`docker run -d -p 8080:8080 -p 9901:9901 --network=host your_tag/grpc-test`

`npm start`