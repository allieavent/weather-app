let now = new Date();
function date() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  let dayHour = now.getHours();
  let dayMinute = now.getMinutes();
  if (dayMinute < 10) {
    dayMinute = "0" + dayMinute;
  }
  if (dayHour < 10) {
    dayHour = "0" + dayHour;
  }
  let weekDay = document.querySelector("#current-date");
  weekDay.innerHTML = `${day} ${dayHour}:${dayMinute}`;
}
date(now);

function showTemp(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.weather[0].icon_url}.png`
  );

  getForecast(response.data.city);
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecast.forEach(function (forecastDay) {
  forecastHTML =
    forecastHTML +
    `
  <div class="col">
                            <h4 class="new-day" id="tomorrows-weather">${days}<img
                                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.weather[1].icon}.png"
                                    alt="Clear Skies" width="36" /> 30°F</h4>
                        </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="col">
                            <h4 class="new-day" id="two-days-out">${days}<img
                                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.weather[2].icon}.png"
                                    alt="Clear Skies" width="36" /> 36°F</h4>
                        </div>`;
  forecastHTML =
    forecastHTML +
    `
                         <div class="col">
                            <h4 class="new-day" id="three-days-out">${days}<img
                                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                                    alt="Clear Skies" width="36" /> 44°F</h4>
                        </div>`;
  forecastHTML =
    forecastHTML +
    `
                        <div class="col">
                            <h4 class="new-day" id="four-days-out">${days}<img
                                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                                    alt="Clear Skies" width="36" /> 40°F</h4>
                        </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="col">
                            <h4 class="new-day" id="five-days-out">${days}<img
                                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
                                    alt="Clear Skies" width="36" /> 35°F</h4>
                        </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;}
}
function getForecast(city) {
  console.log(city);
  let apiKey = "714adc71725e90o5t54ecfb6b5e13103";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function cityReturn(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  citySearch(searchInput.value);
}
function searchCity(city) {
  let apiKey = "714adc71725e90o5t54ecfb6b5e13103";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units={metric}`;
  axios.get(`${apiUrl}`).then(`${showTemp}`);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("click", cityReturn);

function showCelcius(event) {
  event.preventDefault();

  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `20°`;
}
let celcius = document.querySelector("#celcius-temp");
celcius.addEventListener("click", showCelcius);

function showFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `68°`;
}
let fahrenheit = document.querySelector("#fahrenheit-temp");
fahrenheit.addEventListener("click", showFahrenheit);

function forNavigator(position) {
  let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(`${showTemp}`);
}

function youAreHere() {
  navigator.geolocation.getCurrentPosition(forNavigator);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", youAreHere);
