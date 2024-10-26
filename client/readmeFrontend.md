# Weather Monitoring Frontend

## Overview
This is the frontend part of the Weather Monitoring System. It is built using React.js and displays weather data fetched from the backend. The frontend shows weather details, daily rollouts, and alerts for different cities.

## Features
- Displays weather data including temperature, humidity, wind speed, and weather conditions.
- Shows weather icons based on the current weather condition.
- Lists daily rollouts for each city.
- Displays alerts based on weather conditions.

## Technologies Used
- **Frontend:** React.js
- **Styling:** CSS

## Prerequisites
- Node.js
- npm

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hemkeshkantawala11/weather-monitoring-system.git
   cd weather-monitoring-system/client/weather-monitoring-frontend```
2. Install the dependencies:
   ```bash
   npm install```
3. Start the frontend server:
    ```bash
    npm start```

## Usage
- Open the browser and go to `http://localhost:3000/` to view the frontend.
- Select a city to view the weather details, daily rollouts, and alerts.
- Click on the refresh button to update the weather data.
- Click on rollouts to view past weather data for a city. 
- Also the weather rollouts are available for only 5 cities.

## Components

- **WeatherCard:** Displays weather details for a city.
- **Rollouts:** Lists daily rollouts and past weather data for a city.
- **AlertPopup:** Shows alerts based on weather conditions.

## Styling
The styling for the components is done using CSS.

## Project Structure
weather-monitoring-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── WeatherCard.js
│   │   ├── Rollouts.js
│   │   └── AlertPopup.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md

