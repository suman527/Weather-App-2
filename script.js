// Your existing JavaScript code here
/* ... */

// Function to fetch weather data based on user's geolocation
const getWeatherByGeolocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const unitSelect = document.getElementById("unitSelect");
      const unitValue = unitSelect.value;

      // Your API URL with dynamic latitude, longitude, and unit values
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unitValue}&appid=${key}`;

      // Fetch weather data based on geolocation
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Update the weather display based on geolocation data
          displayWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          // Handle errors here
          result.innerHTML = `<h3 class="msg">Error fetching weather data</h3>`;
        });
    });
  } else {
    console.error("Geolocation is not available in this browser.");
    // Handle geolocation not available
    result.innerHTML = `<h3 class="msg">Geolocation not available</h3>`;
  }
};

// Attach an event listener to the "Get Weather" button
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput");
  const unitSelect = document.getElementById("unitSelect");
  const unitValue = unitSelect.value;
  const cityValue = cityInput.value;
  getWeatherData(cityValue, unitValue);
});

// Attach an event listener to the "Use My Location" button
const useLocationBtn = document.getElementById("useLocationBtn");
useLocationBtn.addEventListener("click", getWeatherByGeolocation);

// Function to display weather data
const displayWeatherData = (data) => {
  // Check if the API response contains valid data
  if (data.main && data.weather) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;

    // Display weather information
    result.innerHTML = `
      <h2>${cityName}</h2>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
      <h4 class="weather">${weatherDescription}</h4>
      <h1>${temperature} &#176;</h1>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;
  } else {
    // Handle invalid data or API errors
    result.innerHTML = `<h3 class="msg">Invalid data or city not found</h3>`;
  }
};

// Function to fetch weather data from the API
const getWeatherData = (city, unit) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${key}`;

  // Clear previous results
  result.innerHTML = "";

  // Fetch weather data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      // Handle errors here
      result.innerHTML = `<h3 class="msg">Error fetching weather data</h3>`;
    });
};

// Trigger the initial weather request based on user's geolocation
getWeatherByGeolocation();
