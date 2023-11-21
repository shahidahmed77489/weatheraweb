import axios from "axios";
import React, { useState, useEffect } from "react";
import RealTime from "../RealTime/RealTime";
import Styles from "./HomePage.module.scss";
import DayForecast from "../DayForecast/DayForecast";
import HourlyForeCast from "../HourlyForeCast/HourlyForeCast";

const Homepage = () => {
  const [storeData, setStoreData] = useState(null);
  const [city, setCity] = useState();
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const inputHandler = (e) => {
    setCity(e.target.value);
  };
  const API_KEY = "46105690eb860bb6b9cdf8c03490f033";
  const searchCity = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const response = await axios.get(url);
      setStoreData(response.data);
    } catch (error) {
      window.confirm("please enter valid city");
      console.error(error);
    }
  };

  //
  const apiKey = "3050828d775a7c1de9a5bc06bf111c01";
  async function getCityName(lat, lon) {
    console.log(lat);
    console.log(lon);
    try {
      const geocodingAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=minutely&units=metric`;
      const response = await axios.get(geocodingAPI);
      setHourlyData(response?.data?.hourly);
      setDailyData(response?.data?.daily);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (storeData) {
      getCityName(storeData?.coord?.lat, storeData?.coord?.lon);
    }
  }, [storeData]);
  //

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const apiKey = "3050828d775a7c1de9a5bc06bf111c01";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
      axios
        .get(url)
        .then((res) => {
          setStoreData(res.data);
          console.log(res);
          // getCityName(res.data.coord.lat, res.data.coord.lon);
        })
        .catch((er) => {
          console.log(er);
        });
    });
  }, []);
  console.log(storeData);
  return (
    <>
      <div className={Styles.homePage}>
        <div className={Styles.homePage__container}>
          <div className={Styles.homePage__container__header}>
            <div className={Styles.homePage__container__header__inputField}>
              <input
                type="text"
                onChange={inputHandler}
                placeholder="Search-City"
              />
              <span
                className={
                  Styles.homePage__container__header__inputField__searchBtn
                }
                onClick={searchCity}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>
        </div>
        {storeData && (
          <>
            <div className={Styles.homeMenu}>
              <div className={Styles.homeMenu__cityLocation}>
                <span className={Styles.homeMenu__cityLocation__locationIcon}>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                {storeData.name}
                <RealTime data={storeData} />
              </div>
              <div className={Styles.homeMenu__hourlyForeCast}>
                <h2>Today Hourly ForeCast</h2>
                <div className={Styles.homeMenu__hourlyForeCast__hourlyContent}>
                  {hourlyData?.map((item, index) => (
                    <HourlyForeCast item={item} key={index} />
                  ))}
                </div>
                <h2>Next 8 Days ForeCast</h2>
                <div className={Styles.homeMenu__hourlyForeCast__dailyForeCast}>
                  {dailyData?.map((item, index) => (
                    <DayForecast item={item} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Homepage;
