import React from "react";
import "./departure.css";
import pendelIcon from "../assets/svg/pendel.svg";
import bussIcon from "../assets/svg/buss.svg";
import tunnelbanaIcon from "../assets/svg/tunnelbana.svg";
const Departure = ({ name, time, timeLeft, direction }) => {
  return (
    <div className="departure">
      <img src={pendelIcon} width={48} alt="buss icon" />
      <p>{name}</p>
      <p>{time}</p>
      <p>{timeLeft}</p>
      <p>{direction}</p>
    </div>
  );
};

export default Departure;
