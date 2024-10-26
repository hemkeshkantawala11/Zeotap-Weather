// server/src/alertSeeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Alert = require('./alertModel');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');
        await Alert.deleteMany({}); // Clear existing alerts

        const defaultAlerts = [
            {
                city: 'TestCity',
                message: 'Extreme weather conditions expected.',
                reason: 'Very low max temperature, very high min humidity, etc.',
                conditions: {
                    maxTemp: 10, // Very low max temperature to trigger alert
                    minTemp: -10, // Very low min temperature to trigger alert
                    maxHumidity: 10, // Very low max humidity to trigger alert
                    minHumidity: 90, // Very high min humidity to trigger alert
                    maxWindSpeed: 1, // Very low max wind speed to trigger alert
                    minWindSpeed: 20, // Very high min wind speed to trigger alert
                    maxPressure: 900, // Very low max pressure to trigger alert
                    minPressure: 1100, // Very high min pressure to trigger alert
                }
            }
        ];

        await Alert.insertMany(defaultAlerts);
        console.log('Default alerts seeded');
        mongoose.disconnect();
    })
    .catch(err => console.error('MongoDB connection error:', err));