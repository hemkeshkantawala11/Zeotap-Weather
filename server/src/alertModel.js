// server/src/alertModel.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    city: String,
    message: String,
    reason: String, // Add reason field
    conditions: {
        maxTemp: Number,
        minTemp: Number,
        maxHumidity: Number,
        minHumidity: Number,
        maxWindSpeed: Number,
        minWindSpeed: Number,
        maxPressure: Number,
        minPressure: Number,
    }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;