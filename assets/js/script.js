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





