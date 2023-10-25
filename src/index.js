// My API key:07aed853a2b3116bf7e19dfeee63b968

const apiKey = '07aed853a2b3116bf7e19dfeee63b968';
const city = 'London';

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

async function fetchWeatherData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    updateForecast(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function updateForecast(data) {
  const forecastItems = document.getElementById('weather-forecast');

  forecastItems.innerHTML = '';

  const dayMap = {};

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toDateString();

    if (!dayMap[day]) {
      dayMap[day] = [];
    }

    dayMap[day].push(item);
  });

  for (const day in dayMap) {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('weather-forecast-item');

    const firstItem = dayMap[day][0];

    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    const date = new Date(firstItem.dt * 1000);
    dayElement.textContent = `${getDayOfWeek(date)}, ${formatDate(date)}`;
    forecastItem.appendChild(dayElement);

    const temperatureElement = document.createElement('div');
    temperatureElement.classList.add('temperature');
    const minTemp = firstItem.main.temp_min;
    const maxTemp = firstItem.main.temp_max;
    temperatureElement.innerHTML = `Min: ${minTemp}&deg;C | Max: ${maxTemp}&deg;C`;
    forecastItem.appendChild(temperatureElement);

    const iconElement = document.createElement('img');
    const iconCode = firstItem.weather[0].icon;
    iconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    iconElement.alt = 'weather-icon';
    forecastItem.appendChild(iconElement);

    forecastItems.appendChild(forecastItem);
  }
}

function getDayOfWeek(date) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return daysOfWeek[date.getDay()];
}

function formatDate(date) {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

fetchWeatherData();
