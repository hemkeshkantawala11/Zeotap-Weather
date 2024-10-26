// server/src/weatherModel.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    city: { type: String, required: true },
    avgTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantCondition: String,
    avgHumidity: Number,
    maxHumidity: Number,
    minHumidity: Number,
    avgWindSpeed: Number,
    maxWindSpeed: Number,
    totalPrecipitation: Number,
    conditionFrequency: Map,
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;