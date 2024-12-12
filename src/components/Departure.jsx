import React from "react";
import "./departure.css";
const Departure = ({ name, time, direction }) => {
  return (
    <div className="departure">
      <img src="/svgs/pendel.svg" alt="buss icon" />
      <p>{name}</p>
      <p>{time}</p>
      <p>{direction}</p>
    </div>
  );
};

export default Departure;
