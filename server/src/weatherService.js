const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

async function fetchWeatherData() {
    const promises = cities.map(city => {
        return axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`); // Get data in Celsius
    });
    return Promise.all(promises);
}

module.exports = {
    fetchWeatherData,
};
