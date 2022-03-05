console.clear();

var Local_time = document.querySelector(".time");
var City = document.querySelector(".citytxt");
var Temp = document.querySelector(".temp");
var Icon = document.querySelector(".icon");
var Feels_like = document.querySelector(".feel");
var Gause_state = document.querySelector(".gause-state");
var Temp_max = document.querySelector(".heigh-temp")
var Wind_speed = document.querySelector(".windtxt");
var Humidity = document.querySelector(".humiditytxt");
var Visibility = document.querySelector(".visibilitytxt");
var Pressure = document.querySelector(".pressuretxt");
var Input_feild = document.querySelector(".inpt");
var Search_icon = document.querySelector("#search-icon");
var checkbox = document.querySelector('input[type="checkbox"]')
var match_list = document.querySelector('.match-list')

window.addEventListener("load", () => {
    var lat, lon;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            latLongWeather(lat, lon)
        })
    }
    const latLongWeather = (lat, lon) => {
        let apiKey = "7d9ec9eb9107a3d735629cd5c7818fee"
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then((res) => {
                if(!res.ok){
                    alert("Ooops! sorry city name is not correct.\nPlease Enter the Right name and try again.");
                    let message = res.status
                    throw new Error(message)
                }
                return res.json()
            })
            .then((data) => {
                displayWeather(data)
                 
            })
            .catch((err) => console.log(err))
    }
})
//Calculator
const CtoF = (c) => {
    let f = (c*1.8)+32
    return f;
}



const weather = (city) => {
    let apiKey = "7d9ec9eb9107a3d735629cd5c7818fee"
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then((res) => {
            if(!res.ok){
                alert("Ooops! sorry city name is not correct.\nPlease Enter the Right name and try again.");
                let message = res.status
                throw new Error(message)
            }
            return res.json()
        })
        .then((data) => {
            displayWeather(data)
             
        })
        .catch((err) => console.log(err))
}

const displayWeather = (data) =>{
        const {visibility, timezone, name} = data
        const {humidity, temp, temp_max, pressure} = data.main 
        const {icon, description, main} = data.weather[0]
        const {speed} = data.wind;
        const {sunrise, sunset} = data.sys
        City.innerHTML = name;
        Humidity.innerHTML = humidity;
        Wind_speed.innerHTML = speed;
        Visibility.innerHTML = visibility/1000;
        Pressure.innerHTML = pressure;
        Temp_max.innerHTML = `${temp_max}&#176;C`;
        Gause_state.innerHTML = main
        Icon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        Temp.innerHTML = `${Math.round(temp)}&#176;C`;
        Feels_like.innerHTML = `|${description}`
        document.querySelector(".weather").classList.remove("loading")
        //Celcius Farenhight convert by Checking chekbox
        checkbox.addEventListener('click', () => {
            if(checkbox.checked){
                let fhr = CtoF(temp)
                Temp.innerHTML = `${Math.round(fhr)}&#176;F`;
            }
            else{
                Temp.innerHTML = `${Math.round(temp)}&#176;C`;
            }
        })
        
        //Change background by city name
        let width = window.innerWidth;
        let heigh = window.innerHeight;
        document.body.style.backgroundImage = `url(https://source.unsplash.com/${width}x${heigh}/?${main})`;
}

Search_icon.addEventListener('click', ()=>{
    let value = Input_feild.value
    weather(value)
})

Input_feild.addEventListener('keyup', (event) => {
    if(event.key == "Enter"){
        let value = Input_feild.value
        weather(value)
    }
})
