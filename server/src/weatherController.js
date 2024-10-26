// server/src/weatherController.js
const Weather = require('./weatherModel');
const Alert = require('./alertModel');
const weatherService = require('./weatherService');

async function updateWeatherData() {
    try {
        const responses = await weatherService.fetchWeatherData();

        const dailySummary = responses.map(response => {
            const { main, weather, wind, dt, name: city } = response.data;

            const condition = weather[0].main;
            const weatherIcon = weather[0].icon;
            const weatherDescription = weather[0].description;
            const pressure = main.pressure;

            const summary = {
                date: new Date(dt * 1000),
                city,
                avgTemp: main.temp,
                maxTemp: main.temp_max,
                minTemp: main.temp_min,
                dominantCondition: condition,
                weatherDescription: weatherDescription,
                avgHumidity: main.humidity,
                maxHumidity: main.humidity,
                minHumidity: main.humidity,
                avgWindSpeed: wind.speed,
                maxWindSpeed: wind.speed,
                totalPrecipitation: response.data.rain ? response.data.rain['1h'] || 0 : 0,
                pressure: pressure,
                conditionFrequency: { [condition]: 1 },
                weatherIcon: weatherIcon,
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
                existingRecord.pressure = data.pressure;
                existingRecord.weatherDescription = data.weatherDescription;

                existingRecord.conditionFrequency.set(data.dominantCondition,
                    (existingRecord.conditionFrequency.get(data.dominantCondition) || 0) + 1);
                existingRecord.weatherIcon = data.weatherIcon;
                await existingRecord.save();
            } else {
                await Weather.create(data);
            }

            // Check for alerts
            const alerts = await Alert.find({ city: data.city });
            alerts.forEach(alert => {
                let reason = '';
                if (data.maxTemp > alert.conditions.maxTemp) reason += 'High temperature, ';
                if (data.minTemp < alert.conditions.minTemp) reason += 'Low temperature, ';
                if (data.avgHumidity > alert.conditions.maxHumidity) reason += 'High humidity, ';
                if (data.avgHumidity < alert.conditions.minHumidity) reason += 'Low humidity, ';
                if (data.avgWindSpeed > alert.conditions.maxWindSpeed) reason += 'High wind speed, ';
                if (data.avgWindSpeed < alert.conditions.minWindSpeed) reason += 'Low wind speed, ';
                if (data.totalPrecipitation > alert.conditions.maxPrecipitation) reason += 'High precipitation, ';
                if (data.totalPrecipitation < alert.conditions.minPrecipitation) reason += 'Low precipitation, ';

                if (reason) {
                    reason = reason.slice(0, -2); // Remove trailing comma and space
                    alert.reason = reason;
                    alert.message = `Alert for ${data.city}: ${reason}`;
                    alert.save();
                }
            });
        }));

        console.log('Weather data updated successfully');
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

module.exports = {
    updateWeatherData,
};