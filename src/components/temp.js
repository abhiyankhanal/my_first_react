import React, {useState,useEffect } from 'react'; 
import './style.css';

const Temp = () => {
  const [searchValue,setSearchValue] = useState("Kathmandu");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async() =>{
try {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q='+searchValue+'&appid=755002aaea8ab0fece9f95bfa89ee748&units=metric';
  const res = await fetch(url);
 let data = await res.json();
 const {temp, humidity,pressure} = data.main;
 const{main:weathermood} = data.weather[0];
 const{name} = data;
 const{speed} = data.wind;
 const{country,sunset}=data.sys;
 const myWeatherInfo = {name, speed,country,sunset,temp,humidity,pressure,weathermood};
 setTempInfo(myWeatherInfo);
  console.log(myWeatherInfo.country);

} catch (error) {
  alert("Please wait loading.. if its take long, check internet");
  
}
}
  useEffect(() => {
   
  
   getWeatherInfo();
  }, []);
  let sec = tempInfo.sunset;
  let date = new Date(sec*1000);
  let timeStr = `${date.getHours()} : ${date.getMinutes()}`;
  const [weatherState, setWeatheState] = useState("");
  useEffect(() => {
    if (tempInfo.weathermood) {
      switch (tempInfo.weathermood) {
        case "Clouds":
          setWeatheState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [tempInfo.weathermood]);
  const [currentTime, setTime] = useState(new Date().toLocaleString());


  useEffect(() => {
  setTime(new Date().toLocaleString());

}

);


  
  return (
    <>
    <div className='wrap'>
        <div className='search'>
            <input type = 'search' placeholder='search..' className='searchTerm' autoFocus id = 'search' value = {searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>

        </div>

    </div>
    <article className='widget'>
       <div className='weatherIcon'>
       <i className={weatherState}></i>
    </div>
    <div className='weatherInfo'>
    <div className='temperature'><span>{tempInfo.temp}&deg;</span></div>
    
  <div className='decription'>
    <div className='weatherCondition'>{tempInfo.weathermood}</div>
    <div className='place'> {tempInfo.country} </div>
  </div>
  </div>
  <div className='date'>{currentTime}</div>
  <div className='extra-temp'>
    <div className='temp-info-minmax'>
      <div className='two-sided-section'>
        <p>
          <i className={"wi wi-sunset"}></i>
        </p>
        <p className='extra-info-leftside'>
          {timeStr}
          <br/> Sunset
        </p>
      </div>
      <div className='two-sided-section'>
        <p>
          <i className={"wi wi-humidity"}></i>
        </p>
        <p className='extra-info-leftside'>
          {tempInfo.humidity}
          <br/> Humidity
        </p>
      </div>
      
    </div>
    <div className='weather-extra-info'>

    <div className='two-sided-section'>
        <p>
          <i className={"wi wi-strong-wind"}></i>
        </p>
        <p className='extra-info-leftside'>
          {tempInfo.speed}
          <br/> Speed
        </p>
      </div>
      <div className='two-sided-section'>
        <p>
          <i className={"wi wi-rain"}></i>
        </p>
        <p className='extra-info-leftside'>
          {tempInfo.pressure}
          <br/> Pressure
        </p>
      </div> 
    </div>
  </div>

 
    </article>
    
    </>
  )
}

export default Temp