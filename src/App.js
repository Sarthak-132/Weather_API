import Description from './components/Description';
import hotbg from './images/hot.jpg'
import coldbg from './images/cold.jpg'
import { useEffect , useState } from 'react';
import { getFormattedWeatherData } from './WeatherService';

function App() {

  const [city, setCity ] = useState("Paris");

  const [weather , setWeather] = useState(null);
  const [units , setUnits] = useState("metric");

  const [bg, setBg] = useState(hotbg);

  useEffect(() => {
    const fetchWeatherData = async () =>{
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);

    const thresold = units === 'metric' ? 24 : 60;
    if(data.temp <= thresold) setBg(coldbg)
    else setBg(hotbg);
      
  };
  fetchWeatherData();
  }, [units, city])


  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    console.log(currentUnit);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "\u00b0F" : "\u00b0C";
    setUnits(isCelsius ? "metric" : "imperial")
  }


  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <>
      <div className="app" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay">
          {
            weather && (
          <div className="container">
            <div className="section section_inputs">
              <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter City' />
              <button onClick={(e) => handleUnitsClick()}>&deg;F</button>
            </div>

            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} ${units === "metric" ? "\u00b0C" : "\u00b0F"}`}</h1>
              </div>
            </div>
          {/* Description */}
          <Description weather={weather} units={units}/>
          </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default App;
