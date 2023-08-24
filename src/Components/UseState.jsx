import {useState} from 'react'

const url = 'https://api.openweathermap.org/data/2.5/weather'
const ApiKey = 'dcc3e76e351cd7f8cd2425818d0702f5';

function UseState() {

    const [location, setLocation] = useState();
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('Type a city name and press Enter')
    
    const handelSubmit = (e) => {
        e.preventDefault();
        
        fetch(`${url}?q=${location},bd&APPID=${ApiKey}`)
            .then(res =>{
                return res.json();
            })
            .then(res => {
                if (res.cod==200) {
                    setData(res)
                }
                else {
                    setMessage('City Not Found')
                }
            })
            .catch(err => {
                setMessage('Could not Fatch Weather Data')
            })
    }


    return (
        <div>
            <h1 className='flex justify-center items-center mt-10 font-semibold text-[30px] font-serif'>Weather Hook</h1>
            <form onSubmit={handelSubmit} className='mt-20 justify-center items center  flex'>
                <input value={location} onChange={e => setLocation(e.target.value)} type='text' className='justify-center border-solid border-[#23234] w-[15%]
                px-5 py-7 bg-sky-500 rounded-lg shadow-md text-black text-bold text-[20px] text-center font-semibold font-serif'/>
            </form>
            { data && data.cod==200 ? (
            <div className='flex justify-center items-center gap-20 mt-20'>
                    <img className='w-30 h-40' src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                    
           
            <h3 className='font-serif font-semibold text-[30px]'>{Math.round(data.main.temp - 273)}°C</h3>
            <p className='text-center justify-center items-center text-[30px] text-bold font-semibold font-serif'>
                Pressure: {data.main.pressure} hPa <br/> <br/>
                Humidity: {data.main.humidity} %
            </p>
            </div>
            ):(
                    <p className='mt-5 flex justify-center items-center font-serif 
             text-[30px]'>{message}</p>
            )}
            
      </div>
      
  )
}

export default UseState
