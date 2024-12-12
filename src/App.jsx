import { useState, useEffect } from "react";
import axios from "axios";
import Departure from "./components/Departure";
import data from "./assets/departures.json";
import { formatTimeDifference } from "./util.js";
import "./app.css";

const { allowedDepartures, stations } = data;
const updateFrequency = 10000; // ms
function App() {
  const [trains, setTrains] = useState([]);
  const [busses, setBusses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const allResults = await Promise.all(
          stations.map(async (id) => {
            const response = await axios.get(
              `https://api.resrobot.se/v2.1/departureBoard?id=${id}&format=json&accessId=5cff9b85-0491-4aeb-83a3-cbe5b0bbb757&duration=30`
            );
            const departures = response.data.Departure;
            return departures
              .map((departure) => {
                const transportName = departure.name.match(
                  /\b(Buss|Tunnelbana|Tåg)\s*\d+\b/i
                );
                const timeDifference = formatTimeDifference(departure.time);

                return {
                  name: transportName ? transportName[0] : "Unknown",
                  time: timeDifference,
                  direction: departure.direction,
                };
              })
              .filter((departure) => {
                return (
                  departure.time !== "Departed" &&
                  departure.name !== "Unknown" &&
                  allowedDepartures.includes(departure.name)
                );
              });
          })
        );
        const newBusses = [];
        const newTrains = [];
        allResults.flat().forEach((result) => {
          switch (result.name.split(" ")[0]) {
            case "Buss":
              newBusses.push(result);
              break;
            default:
              newTrains.push(result);
          }
        });
        setBusses(newBusses);
        setTrains(newTrains);
      } catch (err) {
        console.error(err);
        setError("Något gick dåligt, tror det är KMS fel");
      }
    };
    fetchDepartures();
    const intervalId = setInterval(fetchDepartures, updateFrequency);

    return () => clearInterval(intervalId);
  }, []);

  return error ? (
    <div>Något gick snett, måste vara KMS fel</div>
  ) : (
    <div className="departures">
      <div className="busses departureContainer">
        <h1>Busses</h1>
        {busses.length > 0 ? (
          busses.map((buss, index) => (
            <Departure
              key={index}
              name={buss.name}
              time={buss.time}
              direction={buss.direction}
            />
          ))
        ) : (
          <div>Det verkar inte gå några bussar, bruh moment</div>
        )}
      </div>
      <div className="trains departureContainer">
        <h1>Trains</h1>
        {trains.length > 0 ? (
          trains.map((train, index) => (
            <Departure
              key={index}
              name={train.name}
              time={train.time}
              direction={train.direction}
            />
          ))
        ) : (
          <div>Det verkar inte gå några tåg, bruh moment</div>
        )}
      </div>
    </div>
  );
}

export default App;
