import {
  fetchForecast,
  fetchForecastByGeolocation,
  fetchCurrentWeather,
} from './api';
import './search';
import { handleSelectedFavorite } from './search';
const temperatureUnit = 'metric';
const input = document.querySelector('.js-form input[name="query"]');
const form = document.querySelector('.js-form');
const city = document.querySelector('.city__name');
const icon = document.querySelector('.five-days__icon use');

form.addEventListener('submit', fetchForecast5Day);

async function fetchForecast5Day(e) {
  e.preventDefault();
  try {
    const forecastData = await fetchForecast(input.value, temperatureUnit);
    city.textContent = forecastData.city.name;
    const dailyData = getDailyData(forecastData);
    updateForecast(dailyData);
  } catch (error) {
    console.error('Error while fetching weather data: ', error);
  }
}
function getDailyData(forecastData) {
  const groupedByDate = forecastData.list.reduce((groups, item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(item);

    return groups;
  }, {});

  return Object.values(groupedByDate);
}
function updateForecast(dailyData) {
  for (let i = 0; i < 5; i++) {
    // Select the first forecast record for the day
    const forecastItem = dailyData[i][0];
    const dateItem = new Date(forecastItem.dt * 1000);

    const item = document.querySelector(`.five-days__item:nth-child(${i + 1})`);
    const day = item.querySelector('.five-days__day');
    const date = item.querySelector('.five-days__date');
    const tempMin = item.querySelector('.temperature-min__value');
    const tempMax = item.querySelector('.temperature-max__value');
    const icon = item.querySelector('.five-days__icon use');

    day.textContent = dateItem.toLocaleString('default', { weekday: 'long' });
    date.textContent = dateItem.toLocaleString('default', {
      day: '2-digit',
      month: 'short',
    });

    // Calculate the min and max temperatures for the day
    const temperatures = dailyData[i].map(data => data.main.temp);
    tempMin.textContent = Math.round(Math.min(...temperatures));
    tempMax.textContent = Math.round(Math.max(...temperatures));

    const weatherIconName = getWeatherIcon(
      forecastItem.weather[0].main.toLowerCase()
    );
    icon.setAttribute('href', `./images/sprite.svg#${weatherIconName}`);
  }
}
export async function fetchAndUpdateForecast(cityName) {
  try {
    const forecastData = await fetchForecast(cityName, temperatureUnit);
    city.textContent = forecastData.city.name;
    const dailyData = getDailyData(forecastData);
    updateForecast(dailyData);
  } catch (error) {
    console.error('Error while fetching weather data: ', error);
  }
}

async function handleFavoriteSelection(event) {
  const value = event.target.value;
  handleSelectedFavorite(value);
  await fetchAndUpdateForecast(value);
}
city.addEventListener('click', handleFavoriteSelection);
export function getWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case 'clear':
      return 'icon-sun';
    case 'clouds':
      return 'icon-cloudy';
    case 'rain':
      return 'icon-rain';
    case 'snow':
      return 'icon-snow';
    default:
      return 'icon-default';
  }
}
