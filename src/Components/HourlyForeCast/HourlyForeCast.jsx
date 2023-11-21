import React from "react";
import Styles from "./Style.module.scss";

const HourlyForeCast = ({ item, index }) => {
  //   console.log(item);

  let dateTime;
  const date = () => {
    const sunrisee = item?.dt;
    const timezone = "IST";
    const date = new Date(sunrisee * 1000);
    dateTime = date.toLocaleTimeString("IST", {
      timeZone: timezone,
      timeStyle: "short",
    });
  };
  date();
  //   console.log(dateTime);
  return (
    <>
      <div className={Styles.hourCast}>
        <div>{dateTime}</div>
        <div>
          <img
            src={`https://api.openweathermap.org/img/w/${item.weather[0]?.icon}.png`}
            alt=""
          />
        </div>
        <div>{item?.weather[0]?.main}</div>
      </div>
    </>
  );
};

export default HourlyForeCast;
