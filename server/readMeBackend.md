# Weather Monitoring System

## Overview
This project is a weather monitoring system that fetches weather data from an external API, stores it in a MongoDB database, and displays it on a React frontend. The system also generates daily rollouts and alerts based on weather conditions.

## Features
- Fetches weather data from [OpenWeather API](https://openweathermap.org/api).
- Stores weather data in MongoDB.
- Displays weather data and icons on a React frontend.
- Generates daily rollouts for each city.
- Alerts based on weather conditions.
- Includes an alert seeder file to initialize alerts based on predefined conditions.

## Technologies Used
- **Backend**: Node.js, Express.js, Mongoose
- **Frontend**: React.js
- **Database**: MongoDB
- **API**: OpenWeather API

## Prerequisites
- Node.js
- npm
- MongoDB

## Installation

### Clone the repository:
```bash
git clone https://github.com/hemkeshkantawala11/weather-monitoring-system.git
cd weather-monitoring-system
```

### Backend Installation
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
    npm install
    ```
3. Create a `.env` file in the `server` directory and add the following environment variables:
4. Start the backend server:
   ```bash
   npm start
   ```

### API Configuration
1. Sign up on [OpenWeather API](https://openweathermap.org/api) to get an API key.
2. Create a `.env` file in the `server` directory and add the following environment variable:
   ```bash
    API_KEY
    ```
3. Add your OpenWeather API key as the value for the `API_KEY` environment variable.
4. Restart the backend server.
5. The backend server will fetch weather data from the OpenWeather API using the API key.
6. The weather data will be stored in the MongoDB database.

## API Endpoints

## API Endpoints

### Update Weather Data
- **Endpoint**: `GET /update-weather`
- **Description**: Fetches the latest weather data from the OpenWeather API and updates the database.
- **Response**:
    - `200 OK`: if the weather data is successfully updated.
    - `500 Internal Server Error`: if there is an error fetching or updating the weather data.

### Generate Daily Rollout
- **Endpoint**: `GET /generate-rollout`
- **Description**: Generates daily rollouts for each city based on the latest weather data.
- **Response**:
    - `200 OK`: if the daily rollouts are successfully generated.
    - `500 Internal Server Error`: if there is an error generating the rollouts.

### Get Rollouts
- **Endpoint**: `GET /rollouts?city={city}`
- **Description**: Retrieves the daily rollouts for a specified city.
- **Parameters**:
    - `city` (query parameter): The name of the city for which to retrieve rollouts.
- **Response**:
    - `200 OK`: with the rollouts data.
    - `500 Internal Server Error`: if there is an error fetching the rollouts.

### Get Weather Summary
- **Endpoint**: `GET /weather-summary`
- **Description**: Retrieves a summary of the weather data for the past 7 days.
- **Response**:
    - `200 OK`: with the weather summaries.
    - `500 Internal Server Error`: if there is an error fetching the weather summaries.

### Get Weather Details
- **Endpoint**: `GET /weather-detail`
- **Description**: Retrieves detailed weather data for the past 30 days.
- **Response**:
    - `200 OK`: with the weather details.
    - `500 Internal Server Error`: if there is an error fetching the weather details.

### Get Weather Details for a City
- **Endpoint**: `GET /weather-detail/{city}`
- **Description**: Retrieves detailed weather data for a specified city for the past 30 days. If no data is available, it fetches the current weather data from the OpenWeather API.
- **Parameters**:
    - `city` (path parameter): The name of the city for which to retrieve weather details.
- **Response**:
    - `200 OK`: with the weather details.
    - `500 Internal Server Error`: if there is an error fetching the weather details for the city.

### Get Alerts
- **Endpoint**: `GET /alerts/{city}`
- **Description**: Retrieves alerts for a specified city based on weather conditions.
- **Parameters**:
    - `city` (path parameter): The name of the city for which to retrieve alerts.
- **Response**:
    - `200 OK`: with the alerts data.
    - `500 Internal Server Error`: if there is an error fetching the alerts.

