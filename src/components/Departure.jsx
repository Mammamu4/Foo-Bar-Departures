import React from "react";
import pendelIcon from "../assets/svg/pendel.svg";
import bussIcon from "../assets/svg/buss.svg";
import tunnelbanaIcon from "../assets/svg/tunnelbana.svg";
import razor from "../assets/Razor.png";
import "./departure.css"
const iconMap = {
  Pendel: pendelIcon,
  Buss: bussIcon,
  Tunnelbana: tunnelbanaIcon,
};

const Departure = ({ departures }) => {
  // if (!departures || departures.length === 0) {
  //   return <div className="jahopp">Inga tåg avgår för tillfället</div>;
  // }

  const minRows = 5;
  const placeholderRows = Math.max(minRows - departures.length, 0);

  return (
    <table>
      <thead>
        <tr className="cols">
          <th className="departure-icon"></th>
          <th className="departure-name">Line</th>
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
            <tr key={`departure-${index}`} className={index % 2 !== 0 ? "odd" : ""}>
              <td className="departure-icon">
                <img src={icon} alt={`${type} icon`}  />
              </td>
              <td className="departure-name">{num}</td>
              <td className="departure-time">{departure.time}</td>
              <td className="departure-direction">{departure.direction.split(" ")[0]}</td>
              <td className={`departure-time-left ${departure.timeLeft <= 10 ? "red-text" : ""}`}>
                {departure.timeLeft} min
              </td>
            </tr>
          );
        })}

        {Array.from({ length: placeholderRows }).map((_, index) => {
          const adjustedIndex = departures.length + index;
          return (
            <tr key={`placeholder-${index}`} className={adjustedIndex % 2 !== 0 ? "odd" : ""}>
              <td className="departure-icon"><img src={razor} width={40} alt="" /></td>
              <td className="departure-name"><img src={razor} width={40} alt="" /></td>
              <td className="departure-time"><img src={razor} width={40} alt="" /></td>
              <td className="departure-direction"><img src={razor} width={40} alt="" /></td>
              <td className="departure-time-left"><img src={razor} width={40} alt="" /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Departure;
