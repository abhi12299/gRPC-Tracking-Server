const redis = require('redis');
// all defaults.. change accordingly
const publisher = redis.createClient();

publisher.once('error', err => {
    console.log('redis client error');
    console.error(err);

    process.exit(1);
});

module.exports = publisher;
