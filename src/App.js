
import { useState } from 'react';
import './App.css';
import cloud from './images/cloud.png'
import api from 'axios'
function App() {
  const [data, setData] = useState({})
  const [city,setCity] = useState('')
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const date = new Date();
  const today = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()
  
  
  const fetchWeather = async () => {
    try {
      const response = await api.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3cd30ea8b91412fb993a184699333a1f&units=metric`)
      setData(response.data)
      console.log(data);

   }
    catch (err) {
      alert("Failed to Fetch City ! Check Your City Name ")
    }
  }

  return (
    <div className="App">
      <div className="app-container">
        <main className='weather-app'>
          <h1 className='app-title'>Weather App</h1>
          <form action="" className='search-form' onSubmit={(e) => e.preventDefault()}>
            <input type="text" autoFocus
              placeholder='Search City'
              className='search'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            />
            <button type='submit' className='btn' onClick={fetchWeather}>
              Search
            </button>
          </form>

          <div className="temp-box">

            <img src={cloud} alt="cloud image" className="temp-img" />
            <div className="city">
              {data.name ? (<span>{data.name} , {(data.sys) ? <span>{data.sys.country}</span> : null} </span>) : null}
              <span></span>
            </div>

            <div style={{ marginTop: "5px" }}>
              <span className='date'>{today}</span>
              <br />
              <span className='day'>{day[date.getDay()]}</span>
            </div>

            <div className="temp-display">
              {data.main ? (
                <>
                  <h1 className='temp'>
                    {Math.round(data.main.temp)}℃</h1>
                  <div className='min-max'>
                    <span>Min {data.main.temp_min}℃</span>
                    <span>Max {data.main.temp_max}℃</span>
                  </div>
                </>
              ) : (<>
                <h1 className='temp'>0℃</h1>
              </>)
              }
          
            </div>
            <div className="weather-info">
              {data.coord ? (<div className="rise-set">
                <span>Lat : {data.coord.lat}°</span>
                <span>Lon : {data.coord.lon}°</span>
              </div>):<div className="rise-set">
                <span>Lat : 0°</span>
                <span>Lon : 0°</span>
              </div> }

              <div className="rise-set">
                {data.wind ? (<span> Wind : {data.wind.speed} km/h</span>):(<span>Wind : 0 km/h</span>)} 
              {data.main ? (<span>Humidity : {data.main.humidity} %</span>):(<span>Humidity : 0 %</span>)}
              </div>

            </div>
          </div>

        </main>
      </div>

    </div>
  );
}

export default App;
