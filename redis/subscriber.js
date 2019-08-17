const redis = require('redis');
// all defaults.. change accordingly
const subscriber = redis.createClient();

subscriber.once('error', err => {
    console.log('redis client error');
    console.error(err);

    process.exit(1);
});

subscriber.subscribe(redisConfig.redisChannel);

module.exports = subscriber;
