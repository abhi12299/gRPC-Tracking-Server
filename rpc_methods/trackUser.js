module.exports = (call, callback) => {
    console.log('request received with data', call.request);
    // put to kafka topic
    callback(null, {
        acknowleged: 1
    });
}