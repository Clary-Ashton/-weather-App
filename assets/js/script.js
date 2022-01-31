var weatherKey = "bba984a84c023f7dd8d62dc48cd89120"
var cities = [];

var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");

//Get a city weather value when entering a city name on the search form.

var formSubmitHandler = function(event){
    event.preventDefault();

    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please enter a city");
    }
    saveSearch();
    pastSearch(city);
}

//Local storage
var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
    
};

//getting weather date for cities by using the API openweathermap.

var getCityWeather = function(city){
var weatherKey = "bba984a84c023f7dd8d62dc48cd89120"
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

fetch(apiUrl) 
    .then(function(response) {
        response.JSON()
        .then(function(data) {
            displayWeather(data,city);
        });
    });
};

var displayWeather = function(weather, searchCity){
    //clear content
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    //console.log(weather)

    // creating the date element
    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInputEl.appendChild(currentDate);

    //Creating an image Element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);

    //creating a span element to hold temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"

    //Creating a span element to hold Humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent= "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"

     //creating a span element to hold Wind data
   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"




}



