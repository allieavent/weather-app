function date() {
  let now = new Date();
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
  let weekDay = document.querySelector("#current-date");
  weekDay.innerHTML = `${day} ${dayHour}:${dayMinute}`;
}
weekDay.addEventListener("submit", date);
date(now);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${searchInput.value}`;
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", search);

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

let apiKey = "53f3bc1f5d348c44be3e3754c7185573";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}$appid=${apiKey}&units=metric`;
function showTemp(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityChange = document.querySelector("#city-name");
  cityChange.innerHTML = city;
  let tempChange = document.querySelector("#current-temp");
  tempChange.innerHTML = temperature;
}
console.log(showTemp);
axios.get(`${apiUrl}`).then(`${showTemp}`);
