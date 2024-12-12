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
  const [departures, setDepartures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const allResults = await Promise.all(
          stations.map(async (id) => {
            const response = await axios.get(
              `https://api.resrobot.se/v2.1/departureBoard?id=${id}&format=json&accessId=5cff9b85-0491-4aeb-83a3-cbe5b0bbb757&duration=30`
            );
            console.log(response.data);
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
        allResults.flat().forEach((result) => {
          switch (result.name.split(" ")[0]) {
            case "Buss":
              setBusses((prevBusses) => [...prevBusses, result]);
              break;
            default:
              setTrains((prevTrains) => [...prevTrains, result]);
          }
        });
        setDepartures(allResults.flat());
      } catch (err) {
        console.error(err);
        setError("Något gick dåligt, tror det är KMS fel");
      }
    };
    fetchDepartures();
    const intervalId = setInterval(fetchDepartures, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="departures">
      {departures && departures.length > 0 ? (
        departures.map((departure, index) => (
          <Departure
            key={index}
            name={departure.name}
            time={departure.time}
            direction={departure.direction}
          />
        ))
      ) : (
        <div>Det verkar inte gå några tåg, bara att börja vandra!</div>
      )}
    </div>
  );
}

export default App;
