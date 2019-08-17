/**
 * @todo Fix issue with messages being lost when the consumer is not running
 * @description Runs a cron job and fetches messages in batches. This feature is still experimental! 
*/
const consumer = require('../kafka/consumer');
const UserEventsModel = require('../db/models/userEvents');
const CronJob = require('cron').CronJob;

const cron = {};

cron.everyTenSeconds = new CronJob({
    cronTime: '*/10 * * * * *',
    onTick: () => {
        // here we run a consumer for 3 seconds and let it gather all
        // available messages in the topic, process them in batches of 10
        // so we don't strain the database bulk insert limit (which is 100 btw)
        console.log('gathering kafka messages');
        consumer.resume();
        // here we temporarily store all messages received in the span of 10 seconds
        // note: messages received outside of this time window*(while the consumer is running!)
        // won't be lost, they will be received and processed the next time
        // this cron job runs
        const events = [];
        consumer.on('message', msg => {
            events.push(msg.value);
        });

        setTimeout(() => {
            consumer.pause();
            console.log(`${events.length} messages found`);
            let count = 0;
            for (let i = 0; i < events.length; i += 10) {
                const subEvents = events.slice(i, i + 10);
                for (const event of subEvents) {
                    const userEvent = JSON.parse(event);
                    new UserEventsModel(userEvent).save().then(() => {
                        count++;
                        console.log(`${((count / events.length) * 100).toFixed(0)}% processed`);
                    });
                }
            }
        }, 3 * 1000); // expires after 3 seconds
    }
});

module.exports = cron;
