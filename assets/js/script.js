var weatherKey = "bba984a84c023f7dd8d62dc48cd89120"
var cities = [];

var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var buttonEl = document.querySelector("#searchBtn");
//Get a city weather value when entering a city name on the search form.

var formSubmitHandler = function(event){
    event.preventDefault();

    var city = cityInputEl.value.trim();
    console.log(city);
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
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherKey}`

fetch(apiUrl) 
    .then(function(response) {
        return response.json()
        .then(function(data) {
            console.log(data)
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

    //creating a span element to hold Wind data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"

     //appending all children to container
   weatherContainerEl.appendChild(temperatureEl);
   weatherContainerEl.appendChild(humidityEl);
   weatherContainerEl.appendChild(windSpeedEl);

   //Getting City coordinates latitude and longitude
   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var weatherKey = "bba984a84c023f7dd8d62dc48cd89120"   
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
       return response.json().then(function(data){
           console.log(data)
            displayUvIndex(data)
           // console.log(data)
        });
    });
    //console.log(lat);
    //console.log(lon);
}

// setting the UV index display
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    weatherContainerEl.appendChild(uvIndexEl);
}






    

buttonEl.addEventListener("click", formSubmitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);

