require('dotenv').config();

const PROTO_PATH = __dirname + '/tracking.proto';

// initialize database and connect to it
require('./db/init');

const UserEventsModel = require('./db/models/userEvents');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const trackUser = require('./rpc_methods/trackUser');
const consumer = require('./kafka/consumer');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const tracking = protoDescriptor.tracking;

function getServer() {
  const server = new grpc.Server();
  server.addService(tracking.Tracking.service, {
    track: trackUser,
  });
  return server;
}

if (require.main === module) {
  const server = getServer();
  server.bind('0.0.0.0:9090', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('server started at port: 9090');

  consumer.on('message', msg => {
    // can process the message here and store in database
    // or process the message and use producer to send back
    // to kafka cluster to some other topic
    // and construct complex data pipelines
    const userEvent = JSON.parse(msg.value);
    
    const newEvent = new UserEventsModel(userEvent);
    newEvent.save().then(() => {
      console.log('event saved in the database');
    });
  });
}

exports.getServer = getServer;
