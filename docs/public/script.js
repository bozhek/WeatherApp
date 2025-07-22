window.addEventListener("DOMContentLoaded", () => {
    const resultBox = document.getElementById('weather');
    resultBox.innerHTML = `
        <h2>Weather on Mars</h2>
        <img src="https://openweathermap.org/img/wn/50n@2x.png" alt="dust storm" />
        <p>Temperature: -60°C (feels like -75°C)</p>
        <p>Condition: dusty atmosphere</p>
        <p>Humidity: 5%</p>
        <p>Wind speed: 20 m/s</p>
    `;
});

document.getElementById("city-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
const city = document.getElementById('city-input').value.trim();
const resultBox = document.getElementById('weather');
const apiKey = '066601b2ded19b2b811ba3bc056e0748';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=en`;

try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Request failed');
    }

    const { name } = data;
    const { temp, feels_like, humidity } = data.main;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const windSpeed = data.wind.speed;

    resultBox.innerHTML = `
        <h2>Weather in ${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
        <p>Temperature: ${temp}°C (feels like ${feels_like}°C)</p>
        <p>Condition: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind speed: ${windSpeed} m/s</p>
        `;
    } catch (error) {
        resultBox.innerHTML = `Error: ${error.message}`;
    }
}
