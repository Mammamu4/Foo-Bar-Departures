import React from "react";
import "./departure.css";
import pendelIcon from "../assets/svg/pendel.svg";
import bussIcon from "../assets/svg/buss.svg";
import tunnelbanaIcon from "../assets/svg/tunnelbana.svg";

const iconMap = {
  Pendel: pendelIcon,
  Buss: bussIcon,
  Tunnelbana: tunnelbanaIcon,
};

const Departure = ({ name, time, timeLeft, direction }) => {
  const nameSplit = name.split(" ");
  const icon = iconMap[nameSplit[0]] || pendelIcon;
  const num = nameSplit[1];

  return (
    <div className="departure">
      <img src={icon} width={48} alt={`${nameSplit[0]} icon`} />
      <p className="departure-name">{nameSplit[1]}</p>
      <p className="departure-time">{time}</p>
      <p className="departure-time-left">{timeLeft} min</p>
      <p className="departure-direction">{direction}</p>
    </div>
  );
};

export default Departure;
