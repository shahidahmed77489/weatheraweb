import { useEffect, useState } from "react";
import Styles from "./Real.module.scss";
const RealTime = ({ data }) => {
  const [days, setDays] = useState("");
  const [dates, setDates] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYear] = useState("");
  const [sunRise, setSunRise] = useState("");
  const [sunSet, setSunSet] = useState("");
  //
  const timeAndDate = () => {
    let today = new Date();
    let day = today.toLocaleString("default", { weekday: "short" });
    setDays(day);
    const date = today.getDate();
    setDates(date);
    const monthss = today.toLocaleString("default", { month: "short" });
    setMonths(monthss);
    const year = today.getFullYear();
    setYear(year);
    const dat = () => {
      const sunrisee = data?.sys?.sunrise;
      const sunsete = data?.sys?.sunset;
      const timezone = "IST";
      const sunRiseTime = new Date(sunrisee * 1000);
      const sunSetTime = new Date(sunsete * 1000);
      const sunrise = sunRiseTime.toLocaleTimeString("IST", {
        timeZone: timezone,
        timeStyle: "short",
      });
      const sunset = sunSetTime.toLocaleTimeString("IST", {
        timeZone: timezone,
        timeStyle: "short",
      });
      setSunRise(sunrise);
      setSunSet(sunset);
    };
    dat();
  };

  useEffect(() => {
    timeAndDate();
  }, []);
  return (
    <div className={Styles.realTime}>
      <div className={Styles.realTime__temperature}>
        <div className={Styles.realTime__temperature__iconWeather}>
          {
            <img
              src={`https://api.openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
              alt="weather img"
            />
          }
        </div>
        <div className={Styles.realTime__temperature__degreeCelcius}>
          {Math.floor(data?.main?.temp / 10)}℃
        </div>
      </div>
      <div>{data?.weather[0]?.main}</div>
      <span>{days} , </span>
      <span>{dates} </span>
      <span>{months} </span>
      <span>{years} </span>

      <h2 className={Styles.realTime__headingSection}>Today Highlights</h2>
      <div className={Styles.realTime__highlightsSection}>
        <div className={Styles.realTime__highlightsSection__design}>
          <p>
            Sunrise{" "}
            <span>
              <i className="fa-solid fa-sun"></i>
            </span>
          </p>
          <div className={Styles.realTime__highlightsSection__design__content}>
            {sunRise}
          </div>
        </div>
        <div className={Styles.realTime__highlightsSection__design}>
          <p>
            Sunset{" "}
            <span>
              <i className="fa-solid fa-cloud-sun"></i>
            </span>
          </p>
          <div className={Styles.realTime__highlightsSection__design__content}>
            {sunSet}
          </div>
        </div>
        <div className={Styles.realTime__highlightsSection__design}>
          <p>
            Feels_like{" "}
            <span>
              <i className="fa-solid fa-wind"></i>
            </span>
          </p>
          <div className={Styles.realTime__highlightsSection__design__content}>
            {Math.floor(data?.main?.feels_like / 10)}℃
          </div>
        </div>
        <div className={Styles.realTime__highlightsSection__design}>
          <p>
            {" "}
            Humidity{" "}
            <span>
              <i className="fa-solid fa-droplet"></i>
            </span>
          </p>
          <div className={Styles.realTime__highlightsSection__design__content}>
            {data?.main?.humidity}%
          </div>
        </div>
        <div className={Styles.realTime__highlightsSection__design}>
          <p>
            Pressure{" "}
            <span>
              <i className="fa-solid fa-meteor"></i>
            </span>
          </p>
          <div className={Styles.realTime__highlightsSection__design__content}>
            {data?.main?.pressure} Pa
          </div>
        </div>
        <div className={Styles.realTime__highlightsSection__design}>
          <p>
            Visibility{" "}
            <span>
              <i className="fa-solid fa-eye"></i>
            </span>
          </p>
          <div className={Styles.realTime__highlightsSection__design__content}>
            {data?.visibility / 1000} km/hr
          </div>
        </div>
      </div>
    </div>
  );
};
export default RealTime;
