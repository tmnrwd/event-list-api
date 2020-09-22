const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: String,
    location: String,
    precis: String,
    date: Date,
    time: String,
    completed: Boolean
})

module.exports.Event = mongoose.model('Event', eventSchema)