import { useContext, useState, useRef } from 'react';
import ApiContext from "./context";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
// import moment from 'jalali-moment';
import "./weather.css"

const Weather = () => {
    const context = useContext(ApiContext)
    const [data, setDate] = useState();
    const [location, setLocation] = useState("");
    const [dailyDate, setDailyDate] = useState();
    const valueSearch = useRef()
    const buttonSearch = useRef()

    // const url = `https://api.openweathermap.org/data/2.5/forecast?&q=${location}&units=metric&lang=fa&mode=json&appid=3a4259e8146f55d98ab6afd892fd4821`
    const url = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=${location}&appid=3a4259e8146f55d98ab6afd892fd4821`
    async function response() {

        buttonSearch.current.classList.add('loading')

        try {
            const res = await axios.get(url);
            setDate(res.data)
            console.log(res.data)
            setDailyDate(res.data.list.filter((reading) => { return reading.dt_txt.includes("18:00:00") }))
            buttonSearch.current.classList.remove('loading')

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Location Not Found'
            })
            buttonSearch.current.classList.remove('loading')
        }
        valueSearch.current.value = ''

    }

    return (
        <>

            <section className="weather-container position-relative pb-3 rounded-5 text-center">
                <div className="toggleThemeBox">
                    <input
                        type="checkbox"
                        id="inputToggleTheme"
                        onChange={context.ThemeChange}
                    />
                    <label htmlFor="inputToggleTheme"></label>
                </div>

                <div className='searchBar '>

                    <input ref={valueSearch} placeholder='Search Location' className='input_search bg-transparent mt-4 px-3 py-1 rounded-3' onKeyPress={(e) => e.key === "Enter" ? response() : null} valuenpm={location} onChange={(e) => { setLocation(e.target.value) }} />
                    <br />
                    <button ref={buttonSearch} className='px-5 py-1 rounded mt-3 text-light' type="button" onClick={() => response()}>Search</button>

                </div>

                {
                    data ? (
                        <>

                            <div className='d-flex'>

                                <div className='leftSide d-flex flex-column text-start p-3'>
                                    <div className='bgWeather'></div>
                                    <h3>{data.city.name}</h3>
                                    <h5>
                                        {moment(new Date().setTime(data.list[0].dt * 1000)).locale("fa").format("dddd")}
                                    </h5>

                                    <h6 className='mb-auto'>{new Date().toLocaleDateString()}</h6>


                                    <div>
                                        {/* <img alt='img' src={`https://openweathermap.org/img/alt='img' wn/${data.list[0].weather[0].icon}.png`} /> */}
                                        {
                                            data.list[0].weather[0].icon === "01d" || data.list[0].weather[0].icon === "01n" ? <img alt='img' src={require("../src/assets/picture/01d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "02d" || data.list[0].weather[0].icon === "02n" ? <img alt='img' src={require("../src/assets/picture/02d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "03d" || data.list[0].weather[0].icon === "03n" ? <img alt='img' src={require("../src/assets/picture/03d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "04d" || data.list[0].weather[0].icon === "04n" ? <img alt='img' src={require("../src/assets/picture/04d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "09d" || data.list[0].weather[0].icon === "09n" ? <img alt='img' src={require("../src/assets/picture/09d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "10d" || data.list[0].weather[0].icon === "10n" ? <img alt='img' src={require("../src/assets/picture/10d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "11d" || data.list[0].weather[0].icon === "11n" ? <img alt='img' src={require("../src/assets/picture/11d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "13d" || data.list[0].weather[0].icon === "13n" ? <img alt='img' src={require("../src/assets/picture/13d.png")} /> : null
                                        }
                                        {
                                            data.list[0].weather[0].icon === "50d" || data.list[0].weather[0].icon === "50n" ? <img alt='img' src={require("../src/assets/picture/50d.png")} /> : null
                                        }

                                    </div>

                                    <h5>{data.list[0].main.temp.toFixed() + "°C"}</h5>
                                    <h5>{data.list[0].weather[0].main}</h5>

                                </div>
                                <div className='w-75 fs-6 mt-2'>

                                    <div className='w-100 d-flex justify-content-between px-2 p-2'>
                                        <span>Wind</span> <span> {data.list[0].wind.speed.toFixed() + " km/h"}</span>
                                    </div>

                                    <div className='w-100 d-flex justify-content-between px-2 p-2'>
                                        <span>humidity</span> <span> {data.list[0].main.humidity.toFixed() + " %"}</span>
                                    </div>

                                    <div className='w-100 d-flex justify-content-between px-2 p-2'>
                                        <span>Min Temp</span> <span> {data.list[0].main.temp_min.toFixed() + " C°"}</span>
                                    </div>

                                    <div className='w-100 d-flex justify-content-between px-2 p-2'>
                                        <span>Max Temp</span> <span> {data.list[0].main.temp_max.toFixed() + " C°"}</span>
                                    </div>


                                </div>
                            </div>

                            <div className='forecast_box d-flex p-2 rounded-4'>
                                {
                                    dailyDate.map((item, key) => {
                                        return (
                                            <div className='item-day w-25' key={key}>

                                                <div >
                                                    {moment(new Date().setTime(item.dt * 1000)).locale("fa").format("dddd").substring(0, 3)}
                                                </div>

                                                {
                                                    item.weather[0].icon === "01d" || item.weather[0].icon === "01n" ? <img alt='img' src={require("../src/assets/picture/01d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "02d" || item.weather[0].icon === "02n" ? <img alt='img' src={require("../src/assets/picture/02d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "03d" || item.weather[0].icon === "03n" ? <img alt='img' src={require("../src/assets/picture/03d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "04d" || item.weather[0].icon === "04n" ? <img alt='img' src={require("../src/assets/picture/04d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "09d" || item.weather[0].icon === "09n" ? <img alt='img' src={require("../src/assets/picture/09d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "10d" || item.weather[0].icon === "10n" ? <img alt='img' src={require("../src/assets/picture/10d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "11d" || item.weather[0].icon === "11n" ? <img alt='img' src={require("../src/assets/picture/11d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "13d" || item.weather[0].icon === "13n" ? <img alt='img' src={require("../src/assets/picture/13d.png")} /> : null
                                                }
                                                {
                                                    item.weather[0].icon === "50d" || item.weather[0].icon === "50n" ? <img alt='img' src={require("../src/assets/picture/50d.png")} /> : null
                                                }


                                                <p className='mt-1'>
                                                    {item.main.temp.toFixed() + "°C"}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    ) : <img alt='img' className='gifWeather' src={require('../src/assets/picture/weatherGif.gif')} />
                }

            </section>
        </>
    );
}

export default Weather;