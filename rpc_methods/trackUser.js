const redisConfig = require('../config/redisConf');
const publisher = require('../redis/publisher');
const grpc = require('grpc');

module.exports = (call, callback) => {
    publisher.publish(redisConfig.redisChannel, JSON.stringify(call.request), err => {
        if (err) {
            console.log('redis error:');
            console.error(err);
            callback(grpc.status.INTERNAL, {
                acknowleged: 0
            });
        } else {
            callback(null, {
                acknowleged: 1
            });
        }
    });
}