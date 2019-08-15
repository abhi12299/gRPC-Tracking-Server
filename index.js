require('dotenv').config();

const PROTO_PATH = __dirname + '/tracking.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const trackUser = require('./rpc_methods/trackUser');

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
}

exports.getServer = getServer;