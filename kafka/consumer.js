const kafka = require('kafka-node');
const kafkaConfig = require('../config/kafkaConfig');

const client = new kafka.KafkaClient();
const consumer = new kafka.Consumer(client, [{ topic: kafkaConfig.kafkaTopic }]);

consumer.once('error', err => {
    console.log('Kafka consumer error');
    console.error(err);
    process.exit(1);
});

module.exports = consumer;
