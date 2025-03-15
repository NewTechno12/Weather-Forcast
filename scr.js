const da = document.getElementById("da");
const tim = document.getElementById("time");
const day1 = document.getElementById("da1");
const city1 = document.getElementById("city");
const deg = document.getElementById("deg");
const climate = document.getElementById("climate");
const ma = document.getElementById("ma");
const ma1 = document.getElementById("ma1");
const hum = document.getElementById("hum");
const te = document.getElementById("te");
const pre = document.getElementById("pre");
const vis = document.getElementById("vis");
const wi = document.getElementById("wi");
const input1 = document.querySelector(".input1");
const btn1 = document.querySelector(".btn1");
const img = document.querySelector("img");
const i1 = document.querySelector("i1");
const i2 = document.querySelector("i2");
const i3 = document.querySelector("i3");
const i4 = document.querySelector("i4");
const i5 = document.querySelector("i5");
const i6 = document.querySelector("i6");
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const t3 = document.getElementById("t3");
const t4 = document.getElementById("t4");
const t5 = document.getElementById("t5");
const t6 = document.getElementById("t6");
const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
const d3 = document.getElementById("d3");
const d4 = document.getElementById("d4");
const d5 = document.getElementById("d5");
const d6 = document.getElementById("d6");
const date1 = document.getElementById("date1");
const date2 = document.getElementById("date2");
const date3 = document.getElementById("date3");
const date4 = document.getElementById("date4");
const date5 = document.getElementById("date5");
const date6 = document.getElementById("date6");
const days1 = document.getElementById("day1");
const days2 = document.getElementById("day2");
const days3 = document.getElementById("day3");
const days4 = document.getElementById("day4");
const days5 = document.getElementById("day5");
const days6 = document.getElementById("day6");

async function checkWeather(city){

    const now = new Date();

    // Options for date formatting
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dayOptions = { weekday: 'long' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const date = now.toLocaleDateString(undefined, dateOptions);
    const day = now.toLocaleDateString(undefined, dayOptions);
    const time = now.toLocaleTimeString(undefined, timeOptions);

    da.innerHTML = `${date},`;
    day1.innerHTML = day;
    tim.innerHTML = time;



    const apiKey = "6458fdf51b88dcdbc1397ece92b4b451";
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    const weather_data = await fetch(`${url}`).then(response =>
    response.json());

    if (weather_data.cod === '404'){
        console.log('error');
        return;
    }
    
    const url1 = (`https://api.openweathermap.org/data/2.5/forecast?lat=${weather_data.coord.lat}&lon=${weather_data.coord.lon}&appid=${apiKey}`);

    const data = await fetch(`${url1}`).then(response =>
    response.json());
    console.log(data);

    function convertTimestamptoTime(a) {
        
        let unixTimestamp = a;
    
        // Convert to milliseconds and then create a new Date object
        let dateObj = new Date(unixTimestamp * 1000);
    
        // Create a formatter for the desired locale and options
        
        let options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC'
        };
        let formatter = new Intl.DateTimeFormat('en-US', options);
    
        // Format the date object to extract the time
        let formattedTime = formatter.format(dateObj);
        var theDate = new Date(Date.parse( 
            `${dateObj.toLocaleDateString("en-US")},${formattedTime} UTC`)); 
            
        return theDate.toLocaleString();
        console.log(formattedTime);
    }
    


    deg.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}&deg;C`; 
    te.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}&deg;C`;
    climate.innerHTML = `${weather_data.weather[0].description}`;
    city1.innerHTML = `${city}`;
    hum.innerHTML = `${weather_data.main.humidity}%`;
    wi.innerHTML = `${weather_data.wind.speed} Km/h`;
    pre.innerHTML = `${weather_data.main.pressure} hPa`
    vis.innerHTML = `${(weather_data.visibility)/1000} Km`
    ma.innerHTML = `${convertTimestamptoTime(weather_data.sys.sunrise)}`
    ma1.innerHTML = `${convertTimestamptoTime(weather_data.sys.sunset)}`

    t1.innerHTML = `${Math.round(data.list[1].main.temp - 273.15)}&deg;C`
    t3.innerHTML = `${Math.round(data.list[2].main.temp - 273.15)}&deg;C`
    t4.innerHTML = `${Math.round(data.list[3].main.temp - 273.15)}&deg;C`
    t2.innerHTML = `${Math.round(data.list[4].main.temp - 273.15)}&deg;C`
    t5.innerHTML = `${Math.round(data.list[5].main.temp - 273.15)}&deg;C`
    t6.innerHTML = `${Math.round(data.list[6].main.temp - 273.15)}&deg;C`

    d1.innerHTML = `${data.list[1].weather[0].description}`
    d2.innerHTML = `${data.list[2].weather[0].description}`
    d3.innerHTML = `${data.list[3].weather[0].description}`
    d4.innerHTML = `${data.list[4].weather[0].description}`
    d5.innerHTML = `${data.list[5].weather[0].description}`
    d6.innerHTML = `${data.list[6].weather[0].description}`

    date1.innerHTML = `${convertTimestamptoTime(data.list[1].dt)}`
    date2.innerHTML = `${convertTimestamptoTime(data.list[2].dt)}`
    date3.innerHTML = `${convertTimestamptoTime(data.list[3].dt)}`
    date4.innerHTML = `${convertTimestamptoTime(data.list[4].dt)}`
    date5.innerHTML = `${convertTimestamptoTime(data.list[5].dt)}`
    date6.innerHTML = `${convertTimestamptoTime(data.list[6].dt)}`
  
    


    console.log(weather_data)

    
}


btn1.addEventListener('click', ()=>{
    checkWeather(input1.value);
});
