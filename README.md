## This is an example grpc server to track user activity on your website or any other platform*.

<sub>*Read more about gRPC supported platforms [here](https://www.grpc.io/docs/)</sub>

Client side code available [here](https://github.com/abhi12299/gRPC-Tracking-Client)

### 1. What?
gRPC is an implementation of Remote Procedure Call by Google. Read more about it [here](https://www.grpc.io/docs/tutorials/basic/node/). It uses HTTP/2 and protobufs to pass data to/from the client and the server, unlike REST which uses JSON. the data transmitted is binary and hence it is much faster as compared to JSON.

### 2. Why?
Well, to capture user activity on your website or any other platform. While there are other services such as Google Analytics that work great for getting anonymous user data, this can help you track your app's registered or even anonymous user data. The solution is horizontally scalable and relatively easy to get started with.

### 3. How?
1. There are multiple branches in this repo. Check them out to see what technologies they use. This one(master) uses Kafka on the server side to create a simple data pipeline i.e. a producer sending message to a topic and a consumer storing it in MongoDB. With Kafka you can create complex data pipelines with ease and feed data to multiple sources in a sophisticated way.
Now, there is quite some initial setup involved if you wish to move ahead with Kafka. Head over to `Install_instructions.md` for further instrcutions.
2. The branch `kafka-batch-consumer` uses cron job to consume batches of events from Kafka and process them accordingly. However this involves some issues which are mentioned in the `README` of that branch.

### Development Setup
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

## Extending the example
1. Change the proto file to fit your needs. Read more about protobufs and data types [here](https://developers.google.com/protocol-buffers/docs/proto3)
2. Use protoc to create `.js` files to be used in the client side. Run `protoc -I=. tracking.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.`
3. Go to client/ and paste the generated files in `src/grpc_autogen_files`.
4. If you are not using web workers, you don't need to do much now. Just make sure to update the `src/App.js` and other files where you used the generated files if you changed the structure of `tracking.proto` file, for example the setters and getters will change accordingly.
5. If you are using web workers however, all changes ned to be made in `src/worker.js` and to reflect those changes in the application, do `npx browserify src/worker.js > public/worker.js` from the root of the project. Check out the README on the client/ repo for more details.
