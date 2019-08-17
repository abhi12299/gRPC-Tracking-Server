const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// this can have any structure you want
// for this example I'm keeping it the same as the TrackingRequest 
// in the proto file
const UserEventSchema = new Schema({
    user: { type: String, required: true, default: '' },
    event: { type: String, required: true, default: '' },
    timestamp: { type: Date, required: true, default: Date.now },
    url: { type: String, required: true, default: '' },
    stringArray: { type: [String], required: false } // this mocks some metadata
});

const UserEventsModel = new mongoose.model('userevents', UserEventSchema);
module.exports = UserEventsModel;
