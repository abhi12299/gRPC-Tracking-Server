## gRPC with Kafka setup
### 1. Kafka
    sudo apt update
    sudo apt install default-jdk
    wget http://www-us.apache.org/dist/kafka/2.2.1/kafka_2.12-2.2.1.tgz
    tar xzf kafka_2.12-2.2.1.tgz
    mv kafka_2.12-2.2.1 /usr/local/kafka
    
    # start kafka server
    cd /usr/local/kafka
    # keep these 2 processes running (on different terminals) when starting the gRPC server!
    bin/zookeeper-server-start.sh config/zookeeper.properties
    bin/kafka-server-start.sh config/server.properties

    # creating test topic, producing and receiving message for validating install
    # create topic
    bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic testTopic
    # list topics
    bin/kafka-topics.sh --list --zookeeper localhost:2181
    # on one terminal, start producing messages
    bin/kafka-console-producer.sh --broker-list localhost:9092 --topic testTopic
    # on other terminal consume them
    bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic testTopic --from-beginning

### 2. Protoc
    sudo snap install protobuf --classic
    npm i -g protoc-gen-grpc-web

### 3. Docker
    sudo apt install docker

### 4. MongoDB
    [Click here and follow instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)