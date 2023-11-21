import React from "react";
import Styles from "./Style.module.scss";

const DayForecast = ({ item, index }) => {
  let realTime;
  let realTimeEvening;
  // console.log(item);
  const dat = () => {
    const sunrisee = item?.sunrise;
    const sunsete = item?.sunset;
    const timezone = "IST";
    const date = new Date(sunrisee * 1000);
    const datee = new Date(sunsete * 1000);
    realTime = date.toLocaleTimeString("IST", {
      timeZone: timezone,
      timeStyle: "short",
    });
    realTimeEvening = datee.toLocaleTimeString("IST", {
      timeZone: timezone,
      timeStyle: "short",
    });
  };
  dat();
  //
  let dateTime;
  const date = () => {
    const sunrisee = item?.dt;
    const timezone = "IST";
    const date = new Date(sunrisee * 1000);
    dateTime = date.toLocaleDateString("IST", {
      timeZone: timezone,
      dateStyle: "short",
    });
  };
  date();
  return (
    <>
      <div className={Styles.dayCast}>
        <div>
          <img
            src={`https://api.openweathermap.org/img/w/${item.weather[0]?.icon}.png`}
            alt=""
          />
        </div>
        <div>{dateTime}</div>
        <div>{item?.temp?.day}℃</div>
        <div>{item?.weather[0]?.main}</div>
        {/* <div>{item?.temp?.max}℃</div> */}
        {/* <div>{realTime}</div>
        <div> {realTimeEvening}</div> */}
      </div>
      <br />
    </>
  );
};

export default DayForecast;
