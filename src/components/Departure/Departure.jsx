import "./departure.css";

const iconMap = {
  Tåg: "svg/pendel.svg",
  Spårväg: "svg/pendel.svg",
  Buss: "svg/buss.svg",
  Tunnelbana: "svg/tunnelbana.svg",
};
const razor = "images/Razor.png";
const goldenRazor = "images/goldenrazor.png";
const Departure = ({ departures }) => {
  const minRows = 5;
  const placeholderRows = Math.max(minRows - departures.length, 0);

  return (
    <table>
      <thead>
        <tr className="cols">
          <th className="departure-icon"></th>
          <th className="departure-name">Line</th>
          <th className="departure-time">Time</th>
          <th className="departure-station">Station</th>
          <th className="departure-direction">Direction</th>
          <th className="departure-time-left">Time Left</th>
        </tr>
      </thead>
      <tbody>
        {departures.map((departure, index) => {
          const nameSplit = departure.name.split(" ");
          const lineType = nameSplit[0];
          let iconSource = iconMap[lineType] || razor;
          iconSource = Math.random() > 0.01 ? iconSource : goldenRazor;
          const type = nameSplit[0];
          const num = nameSplit[1];
          return (
            <tr
              key={`departure-${index}`}
              className={index % 2 !== 0 ? "odd" : ""}
            >
              <td className="departure-icon">
                <img src={iconSource} alt={`${type} icon`} />
              </td>
              <td className="departure-name">
                <span className={lineType}>{num}</span>
              </td>
              <td className="departure-time">{departure.time}</td>
              <td className="departure-station">{departure.station}</td>
              <td className="departure-direction">
                {departure.direction.split(" ")[0]}
              </td>
              <td
                className={`departure-time-left ${
                  departure.timeLeft <= 10 ? "red-text" : ""
                }`}
              >
                {departure.timeLeft} min
              </td>
            </tr>
          );
        })}

        {Array.from({ length: placeholderRows }).map((_, index) => {
          const adjustedIndex = departures.length + index;
          return (
            <tr
              key={`placeholder-${index}`}
              className={adjustedIndex % 2 !== 0 ? "odd" : ""}
            >
              <td className="departure-icon">-</td>
              <td className="departure-name">-</td>
              <td className="departure-time">-</td>
              <td className="departure-station">-</td>
              <td className="departure-direction">-</td>
              <td className="departure-time-left">-</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Departure;
