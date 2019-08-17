const redisConfig = require('../config/redisConf');
const publisher = require('../redis/publisher');
const grpc = require('grpc');

module.exports = (call, callback) => {
    publisher.publish(redisConfig.redisChannel, JSON.stringify(call.request), resp => {
        console.log('redis response:', resp);
        callback(null, {
            acknowleged: 1
        });
        // callback(grpc.status.INTERNAL, {
        //     acknowleged: 0
        // });
    });
}