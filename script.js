const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

const apiKey = "2eeb13756ae9422482373508250407"; // Your WeatherAPI key

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert("Error: " + error.message);
  }
});

function displayWeather(data) {
  const cityName = data.location.name + ", " + data.location.country;
  const temp = data.current.temp_c;
  const description = data.current.condition.text;
  const icon = data.current.condition.icon;
  const date = new Date(data.location.localtime).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  weatherInfo.querySelector(".city").textContent = cityName;
  weatherInfo.querySelector(".date").textContent = date;
  weatherInfo.querySelector(".temp").textContent = `${temp}°C`;
  weatherInfo.querySelector(".description").textContent = description;
  weatherInfo.querySelector(".min-max").textContent = `Humidity: ${data.current.humidity}% | Wind: ${data.current.wind_kph} kph`;
  weatherInfo.querySelector(".icon img").src = `https:${icon}`;
}
