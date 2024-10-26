// server/src/app.js
const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const { updateWeatherData } = require('./weatherController');
const cors = require('cors');
const { generateDailyRollout } = require('./rolloutController');
const axios = require('axios');
const { getAlertsForCity } = require('./alertController');
const Rollout = require('./rolloutModel');
const Weather = require('./weatherModel');

// dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');
        // generateDailyRollout();
        await generateDailyRollout(); // Generate the first rollout when the server starts
        setInterval(generateDailyRollout, 24 * 60 * 60 * 1000); // Schedule daily rollouts
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/update-weather', async (req, res) => {
    await updateWeatherData();
    res.send('Weather data updated');
});

app.get('/generate-rollout', async (req, res) => {
    await generateDailyRollout();
    res.send('Daily rollouts generated');
});

app.get('/rollouts', async (req, res) => {
    try {
        const { city } = req.query;
        const rollouts = city ? await Rollout.find({ city }) : await Rollout.find({});
        res.json(rollouts);
    } catch (error) {
        console.error('Error fetching rollouts:', error);
        res.status(500).json({ error: 'Error fetching rollouts' });
    }
});

app.get('/rollouts/cities', async (req, res) => {
    try {
        const cities = await Rollout.distinct('city');
        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ error: 'Error fetching cities' });
    }
});

app.get('/weather-summary', async (req, res) => {
    try {
        const summaries = await Weather.find({}).limit(7);
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather summaries' });
    }
});

app.get('/weather-detail', async (req, res) => {
    try {
        const details = await Weather.find({}).sort({ date: -1 }).limit(30);
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather details' });
    }
});

app.get('/weather-detail/:city', async (req, res) => {
    const { city } = req.params;
    try {
        let details = await Weather.find({ city }).sort({ date: -1 }).limit(30);

        if (details.length === 0) {
            const apiKey = process.env.OPENWEATHER_API_KEY;
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const weatherData = response.data;

            details = [{
                date: new Date(),
                city: weatherData.name,
                avgTemp: weatherData.main.temp,
                maxTemp: weatherData.main.temp_max,
                minTemp: weatherData.main.temp_min,
                avgHumidity: weatherData.main.humidity,
                avgWindSpeed: weatherData.wind.speed,
                pressure: weatherData.main.pressure,
                weatherDescription: weatherData.weather[0].description,
                weatherIcon: weatherData.weather[0].icon,
            }];
        }

        res.json(details);
    } catch (error) {
        console.error('Error fetching weather details for city:', error);
        res.status(500).json({ error: 'Error fetching weather details for city' });
    }
});

app.get('/alerts/:city', async (req, res) => {
    const { city } = req.params;
    try {
        const alerts = await getAlertsForCity(city);
        res.json(alerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).json({ error: 'Error fetching alerts' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    setInterval(updateWeatherData, 5 * 60 * 1000);
});