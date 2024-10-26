// server/src/alertController.js
const Alert = require('./alertModel');
const nodemailer = require('nodemailer');

const checkAlerts = async (weatherData) => {
    const alerts = await Alert.find({ city: weatherData.city });
    alerts.forEach(alert => {
        const conditions = alert.conditions;
        let alertTriggered = false;
        let alertMessage = `Alert for ${weatherData.city}:\n`;

        if (conditions.maxTemp && weatherData.avgTemp > conditions.maxTemp) {
            alertTriggered = true;
            alertMessage += `Average Temperature is above ${conditions.maxTemp}°C\n`;
        }
        if (conditions.minTemp && weatherData.avgTemp < conditions.minTemp) {
            alertTriggered = true;
            alertMessage += `Average Temperature is below ${conditions.minTemp}°C\n`;
        }
        if (conditions.maxHumidity && weatherData.avgHumidity > conditions.maxHumidity) {
            alertTriggered = true;
            alertMessage += `Humidity is above ${conditions.maxHumidity}%\n`;
        }
        if (conditions.minHumidity && weatherData.avgHumidity < conditions.minHumidity) {
            alertTriggered = true;
            alertMessage += `Humidity is below ${conditions.minHumidity}%\n`;
        }
        if (conditions.maxWindSpeed && weatherData.avgWindSpeed > conditions.maxWindSpeed) {
            alertTriggered = true;
            alertMessage += `Wind Speed is above ${conditions.maxWindSpeed} m/s\n`;
        }
        if (conditions.minWindSpeed && weatherData.avgWindSpeed < conditions.minWindSpeed) {
            alertTriggered = true;
            alertMessage += `Wind Speed is below ${conditions.minWindSpeed} m/s\n`;
        }
        if (conditions.maxPressure && weatherData.pressure > conditions.maxPressure) {
            alertTriggered = true;
            alertMessage += `Pressure is above ${conditions.maxPressure} hPa\n`;
        }
        if (conditions.minPressure && weatherData.pressure < conditions.minPressure) {
            alertTriggered = true;
            alertMessage += `Pressure is below ${conditions.minPressure} hPa\n`;
        }

        if (alertTriggered) {
            sendAlert(alertMessage);
        }
    });
};

const sendAlert = (message) => {
    // Configure nodemailer or any other notification service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ALERT_EMAIL,
        subject: 'Weather Alert',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending alert email:', error);
        } else {
            console.log('Alert email sent:', info.response);
        }
    });
};

const getAlertsForCity = async (city) => {
    return await Alert.find({ city });
};
module.exports = { checkAlerts, getAlertsForCity };