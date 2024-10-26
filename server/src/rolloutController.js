// server/src/rolloutController.js
const Rollout = require('./rolloutModel');
const Weather = require('./weatherModel');
const { checkAlerts } = require('./alertController');

const generateDailyRollout = async () => {
    try {
        const cities = await Weather.distinct('city');
        for (const city of cities) {
            const weatherData = await Weather.find({ city }).sort({ date: -1 }).limit(1);
            if (weatherData.length > 0) {
                const latestWeather = weatherData[0];
                const rollout = new Rollout({
                    date: new Date(),
                    city: latestWeather.city,
                    details: {
                        avgTemp: latestWeather.avgTemp,
                        maxTemp: latestWeather.maxTemp,
                        minTemp: latestWeather.minTemp,
                        avgHumidity: latestWeather.avgHumidity,
                        avgWindSpeed: latestWeather.avgWindSpeed,
                        pressure: latestWeather.pressure || 0,
                        weatherDescription: latestWeather.weatherDescription,
                        weatherIcon: latestWeather.weatherIcon
                    }
                });
                await rollout.save();
                console.log(`Daily rollout generated for ${city}`);
                await checkAlerts(latestWeather);
            } else {
                console.log(`No weather data available to generate rollout for ${city}`);
            }
        }
    } catch (error) {
        console.error('Error generating daily rollout:', error);
    }
};

module.exports = { generateDailyRollout };