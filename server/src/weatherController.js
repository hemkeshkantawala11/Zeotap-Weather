// server/src/weatherController.js
const Weather = require('./weatherModel');
const weatherService = require('./weatherService');

async function updateWeatherData() {
    try {
        const responses = await weatherService.fetchWeatherData();

        const dailySummary = responses.map(response => {
            const { main, weather, wind, dt, name: city } = response.data;

            const condition = weather[0].main;

            const summary = {
                date: new Date(dt * 1000),
                city,
                avgTemp: main.temp,
                maxTemp: main.temp_max,
                minTemp: main.temp_min,
                dominantCondition: condition,
                avgHumidity: main.humidity,
                maxHumidity: main.humidity,
                minHumidity: main.humidity,
                avgWindSpeed: wind.speed,
                maxWindSpeed: wind.speed,
                totalPrecipitation: response.data.rain ? response.data.rain['1h'] || 0 : 0,
                conditionFrequency: { [condition]: 1 },
            };

            return summary;
        });

        await Promise.all(dailySummary.map(async (data) => {
            const existingRecord = await Weather.findOne({ date: data.date, city: data.city });
            if (existingRecord) {
                existingRecord.avgTemp = (existingRecord.avgTemp + data.avgTemp) / 2;
                existingRecord.maxTemp = Math.max(existingRecord.maxTemp, data.maxTemp);
                existingRecord.minTemp = Math.min(existingRecord.minTemp, data.minTemp);
                existingRecord.avgHumidity = (existingRecord.avgHumidity + data.avgHumidity) / 2;
                existingRecord.maxHumidity = Math.max(existingRecord.maxHumidity, data.maxHumidity);
                existingRecord.minHumidity = Math.min(existingRecord.minHumidity, data.minHumidity);
                existingRecord.avgWindSpeed = (existingRecord.avgWindSpeed + data.avgWindSpeed) / 2;
                existingRecord.maxWindSpeed = Math.max(existingRecord.maxWindSpeed, data.maxWindSpeed);
                existingRecord.totalPrecipitation += data.totalPrecipitation;

                existingRecord.conditionFrequency.set(data.dominantCondition,
                    (existingRecord.conditionFrequency.get(data.dominantCondition) || 0) + 1);
                await existingRecord.save();
            } else {
                await Weather.create(data);
            }
        }));

        console.log('Weather data updated successfully');
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

module.exports = {
    updateWeatherData,
};