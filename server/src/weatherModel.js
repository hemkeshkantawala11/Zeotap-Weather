// server/src/weatherModel.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    city: { type: String, required: true },
    avgTemp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    avgHumidity: { type: Number, required: true },
    avgWindSpeed: { type: Number, required: true },
    pressure: { type: Number, required: true },
    weatherDescription: { type: String, required: true },
    weatherIcon: { type: String, required: true }
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;