# Weather Trend Planner

Weather Trend Planner is a lightweight React app for checking forecast trends and deciding the best day for outdoor activities.

## Features

- Search forecast by city name
- Display current weather summary:
	- City name
	- Current temperature
	- Weather condition
- Show 5-7 day temperature trend in a line chart
- Generate forecast insight(s):
	- Best day to go out
	- Rain warning if rain probability is above 60%
	- Heat warning if temperature is above 35 C
	- Cold warning if temperature is below 5 C

## API

The app uses OpenWeather 5 day / 3 hour forecast data:

https://api.openweathermap.org/data/2.5/forecast?q={CITY}&appid={API_KEY}&units=metric

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```bash
VITE_WEATHER_API_KEY=your_openweather_api_key
```

3. Run the app:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```
