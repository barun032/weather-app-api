const apiKey = 'a19cbbb24a8091bce3b49c9ac9e5528f';
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`;
let interValId = '';

let weatherPage = document.querySelector('.container');
let input = document.querySelector('#inputCity');
let btnSearch = document.querySelector('#btnSearch');


// Event listeners
btnSearch.addEventListener('click', async () => {
    let wheather = await getWeatherInfo(input.value.trim());
    showData(wheather);
})
input.addEventListener('keypress', async(e) => {
    if (e.key === 'Enter') {
        let wheather = await getWeatherInfo(input.value.trim());
        showData(wheather);
    }
})
window.addEventListener('load', () => {
    interValId = setInterval(getGeoLocation, 1000);  // as long as we are not get the location continuouly called the function
    input.focus(); // input will focused afeter loading the page
});

// ---------------weather information using user input--------------
async function getWeatherInfo(city) {
    try {
        let res = await fetch(url + city + '&units=metric');
        let data = await res.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
}

//-----------------------weather information based in latitude and longtitude-------------
async function getWeatherInfoLat_Log(lat, long) {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`);
        let data = await res.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
}

async function gotPosition(position) {
    clearInterval(interValId);
    let data = await getWeatherInfoLat_Log(position.coords.latitude, position.coords.longitude);
    console.log("Got location...");
    weatherPage.classList.remove('hide'); // after getting location weather page show
    document.querySelector('.home-page-container').classList.add('hide');
    // console.log(position);   
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    showData(data);
}

function failedToGet() {
    // console.log("Failde to load.....");
}

async function getGeoLocation() {
    console.log("Getting geo location...");
    navigator.geolocation.getCurrentPosition(gotPosition, failedToGet);
    weatherPage.classList.add('hide'); // as long as not get the location, weather page wil hidden
}


// ---------------------------for showing weather information-----------------
function showData(data) {
    input.value = '';
    let weatherIcon = document.querySelector('.weather-icon');
    let cardBackground = document.querySelector('.card-1');

    document.querySelector('.weather-label').innerText = data.weather[0].main;
    document.querySelector('.temp').innerText = Math.floor(data.main.temp) + '°C';
    document.querySelector('.city').innerText = data.name;
    document.querySelector('.humidity').innerText = data.main.humidity + '%';
    document.querySelector('.wind').innerText = data.wind.speed + ' km/h';

    console.log(data);


    // ---------------------according to the weather each icons will be display------------------
    switch (data.weather[0].main) {
        case 'Clear':
            weatherIcon.src = "./images/clear.png";
            cardBackground.setAttribute('style', 'background-image: url("./images/clearBackground.jpeg")');
            break;

        case 'Clouds':
            weatherIcon.src = "./images/clouds.png";
            cardBackground.setAttribute('style', 'background-image: url("./images/cloudsBackground.jpeg")');
            break;

        case 'Rain':
            weatherIcon.src = "./images/rain.png";
            cardBackground.setAttribute('style', 'background-image: url("./images/rainBackground.jpg")');
            break;

        case 'Mist':
            weatherIcon.src = "./images/mist.png";
            cardBackground.setAttribute('style', 'background-image: url("./images/snowBackground.jpeg")');
            break;

        case 'Drizzle':
            weatherIcon.src = "./images/drizzle.png";
            cardBackground.setAttribute('style', 'background-image: url("./images/drizzleBackground.jpg")');
            break;

        case 'Snow':
            weatherIcon.src = "./images/snow.png";
            cardBackground.setAttribute('style', 'background-image: url("./images/snowBackground.jpeg")');
            break

        default:
            weatherIcon.src = "./images/clear.png";
            cardBackground.setAttribute('style', 'background-image: url("./images/defaultBackground.jpeg")');
    }
}

// ------------------------for date and time----------------------
function showDateAndtime(){
    let d = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // time
    let hr = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    let hrString = '';
    let minString = '';
    let secString = '';

    if(hr < 10){
        hrString += '0' + hr;
    }else{
        hrString = hr;
    }if(min < 10){
        minString += '0' + min;
    }else{
        minString = min;
    }if(sec < 10){
        secString += '0' + sec;
    }else{
        secString = sec;
    }

    //date
    let date = d.getDate();
    let day = daysOfWeek[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    document.querySelector('.time').innerText = `${hrString}:${minString}:${secString}`;
    document.querySelector('.date').innerText = `${day}, ${date} ${month} ${year}`;
}
setInterval(showDateAndtime, 1000);

