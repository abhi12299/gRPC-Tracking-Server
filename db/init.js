const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URL || 'monngodb://localhost:27017/webevents_kafka';
mongoose.connect(mongodbUrl, { useNewUrlParser: true });

const db = mongoose.connection;
db.once('error', err => {
    console.error('mongodb connect error:', err);
    process.exit(1);
});

db.once('open', () => {
    console.log('mongodb connected! good to go!!');
});
