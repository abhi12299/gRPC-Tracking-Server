const kafka = require('kafka-node');
const kafkaConfig = require('../config/kafkaConfig');

const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
// set requireAcks to 0 if acknowlegement is not needed from kafka server
// regarding message being stored
const producer = new Producer(client, { requireAcks: 1 });

producer.once('error', err => {
    console.log('Kafka producer error');
    console.error(err);
    process.exit(1);
});

client.loadMetadataForTopics([kafkaConfig.kafkaTopic], (err, resp) => {
    console.log(JSON.stringify(resp));
});

module.exports = producer;
