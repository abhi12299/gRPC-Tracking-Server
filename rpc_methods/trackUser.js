const kafkaConfig = require('../config/kafkaConfig');
const producer = require('../kafka/producer');
const grpc = require('grpc');

module.exports = (call, callback) => {
    producer.send([{ topic: kafkaConfig.kafkaTopic, messages: JSON.stringify(call.request) }], (err, data) => {
        if (err) {
            console.log('kafka producer response:', { err, data });
            callback(grpc.status.INTERNAL, {
                acknowleged: 0
            });
        } else {
            callback(null, {
                acknowleged: 1
            });
        }
    })
}