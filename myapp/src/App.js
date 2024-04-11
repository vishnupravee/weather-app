import logo from './logo.svg';
import './App.css';
import { useState } from "react"
import axios from 'axios'
import { CiSearch } from "react-icons/ci";
import{ WiHumidity }from "react-icons/wi";
import { FaWind } from "react-icons/fa";
function App() {
     const[data,setData] = useState({
    celcius:35,
    name:"India",
    humidity:10,
    speed:2
  })
  const[name,setName]= useState("")
  const[error,setError] = useState("")
 const handleclick=()=>{
    if(name !==""){
      const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9da54aceeef6ffa9148d15448ba6c13c&units=metric`
      axios.get(apiurl)
      .then(res=>{
       
       setData({...data,celcius:res.data.main.temp,name:res.data.name,humidity:res.data.main.humidity,speed:res.data.wind.speed})
   
      })
      .catch(err =>{
        if(err.response.status==404){
          setError("invalid city name")
        }
      console.log(err)})
     }
    }
  return (
    <div className="container">
      <div className='weather'>
        <div className='search'>
      <input type='text' placeholder='enter city name'  onChange={e =>setName(e.target.value)} />
       <button onClick={handleclick}><CiSearch /></button>
       </div>
       <div className='errorr'>
        <p>{error}</p>
      </div>
       <div className='winfo'>
        <img className='icon' src='https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png'></img>
        <h1>{data.celcius}°C</h1>
        <h2>{data.name}</h2>
        <div className='details'>
          <div className='col'>
            <h3><WiHumidity /></h3>
            <div>
              <p>{data.humidity}</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className='col'>
              <h3><FaWind /></h3>
              <div>
              <p>{data.speed}Km/hr</p>
              <p>Wind</p>
              </div>
          </div>
          </div>
       </div>
      </div>
      </div>
  );
}

export default App;
