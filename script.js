//  Variáveis e seleção de elementos
const apiKey = "7d777b02ddb1cc7ea21028ae14069403";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data);
    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    // estabelecendo os padrões para cada elemento:
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description; //descrição do elemento
    weatherIconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};  

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
})

//adicionando a tecla enter para a pesquisa
cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter") {
        const city = e.target.value; 

        showWeatherData(city);
    }
});
