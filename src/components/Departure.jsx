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

const Departure = ({ departures }) => {
  if (!departures || departures.length === 0) {
    return <div className="jahopp">Inga tåg avgår för tillfället</div>;
  }

  return (
    <table>
      <thead>
        <tr className="cols">
          <th></th>
          <th className="departure.name">Type</th>
          <th className="departure-time">Time</th>
          <th className="departure-direction">Direction</th>
          <th className="departure-time-left">Time Left</th>
        </tr>
      </thead>
      <tbody>
        {departures.map((departure, index) => {
          const nameSplit = departure.name.split(" ");
          const icon = iconMap[nameSplit[0]] || pendelIcon;
          const type = nameSplit[0];
          const num = nameSplit[1];

          return (
            <tr key={`departure-${index}`}>
              <td>
                <img src={icon} alt={`${type} icon`} width={48} />
              </td>
              <td className="departure-name">
                {type} {num}
              </td>
              <td className="departure-time">{departure.time}</td>
              <td className="departure-direction">{departure.direction}</td>
              <td className={`departure-time-left ${departure.timeLeft <= 10 && "red-text"}`}>{departure.timeLeft} min</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Departure;
