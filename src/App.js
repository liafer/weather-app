import { useState} from 'react';
import './App.css';
import { FiSearch } from 'react-icons/fi'
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState ('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=28286c11c28a03cae9fc9c8aada420eb`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  return (

    <div className='container'>
      <div>
        <span>Weather App</span>
      </div>

      <div className='input-area'>
        
      <input
      type='text'
      placeholder='Enter location...'
      value={location}
      onChange={ (e) => setLocation(e.target.value) }
      onKeyPress={searchLocation}
      />
      </div>

      <div className='location'>
        <h2>{data.name}</h2>
      </div>

      <div className='temperature'>
       {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
       {data.weather ? <span>{data.weather[0].description}</span> : null}
      </div>

     {data.name !== undefined &&
      <div className='info'>
        <h2>Details</h2>
            <div className='feels'>
             {data.main ? <span>Feels Like {data.main.feels_like.toFixed()}°C</span> : null}
            </div>

            <div className='max-temp'>
            {data.main ? <span>Max temp {data.main.temp_max.toFixed()}°C</span> : null}
            </div>

            <div className='min-temp'>
            {data.main ? <span>Min temp {data.main.temp_min.toFixed()}°C</span> : null}
            </div>

            <div className='humidity'>
            {data.main ? <span>Humidity {data.main.humidity}%</span> : null}
            </div>
         </div>
     }
     
    </div>
  );
}

export default App;
