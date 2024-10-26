// server/src/rolloutModel.js
const mongoose = require('mongoose');

const rolloutSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    city: { type: String, required: true },
    details: {
        avgTemp: { type: Number, required: true },
        maxTemp: { type: Number, required: true },
        minTemp: { type: Number, required: true },
        avgHumidity: { type: Number, required: true },
        avgWindSpeed: { type: Number, required: true },
        pressure: { type: Number, required: true },
    }
});

const Rollout = mongoose.model('Rollout', rolloutSchema);

module.exports = Rollout;