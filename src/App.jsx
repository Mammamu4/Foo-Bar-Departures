import { useState, useEffect } from "react";
import axios from "axios";

import Departure from "./components/Departure/Departure.jsx";
import data from "./assets/departures.json";
import Clock from "./components/Clock/Clock.jsx";

import { formatTimeDifference, removeParentheses } from "./util.js";

import "./app.css";

const {
  VITE_RESROBOT_API_BASE_URL,
  VITE_RESROBOT_ACCESS_ID,
  VITE_UPDATE_FREQUENCY,
  VITE_API_DURATION,
} = import.meta.env;

const { stations } = data;
const updateFrequency = parseInt(VITE_UPDATE_FREQUENCY, 10);

function App() {
  const [trains, setTrains] = useState([]);
  const [busses, setBusses] = useState([]);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDepartures = async () => {
    if (!VITE_RESROBOT_ACCESS_ID) {
      setError("API access ID is missing");
      return;
    }
    try {
      const allResults = await Promise.all(
        stations.map(async (station) => {
          try {
            const stationName = station.name;
            const id = station.id;
            const allowedDepartures = station.allowedDepartures;
            const response = await axios.get(
              `${VITE_RESROBOT_API_BASE_URL}?id=${id}&format=json&accessId=${VITE_RESROBOT_ACCESS_ID}&duration=${VITE_API_DURATION}`
            );

            const departures = response.data.Departure || [];
            console.log(departures);
            const processedDepartures = departures
              .map((departure) => {
                const timeWithoutSeconds = departure.time
                  .split(":")
                  .slice(0, 2)
                  .join(":");
                const transportName = departure.name.match(
                  /\b(Buss|Tunnelbana|Tåg|Spårväg)\s*\d+\b/i
                );
                const timeDifference = formatTimeDifference(departure.time);

                return {
                  name: transportName ? transportName[0] : "Unknown",
                  time: timeWithoutSeconds,
                  timeLeft: timeDifference,
                  direction: removeParentheses(departure.direction),
                  station: stationName,
                };
              })
              .filter(
                (departure) =>
                  departure.time !== "Departed" &&
                  departure.name !== "Unknown" &&
                  departure.timeLeft > 8 &&
                  allowedDepartures.includes(departure.name) &&
                  departure.direction != "Akalla T-bana"
              );

            return processedDepartures;
          } catch (stationError) {
            console.error(
              `Error fetching departures for station ${station.id}}:`,
              stationError
            );
            return [];
          }
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

      setBusses(
        [...newBusses].sort((a, b) => a.timeLeft - b.timeLeft).slice(0, 3)
      );
      setTrains(
        [...newTrains].sort((a, b) => a.timeLeft - b.timeLeft).slice(0, 3)
      );

      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Comprehensive fetch error:", err);
      setError("Något gick fel vid hämtning av avgångar, måste vara KMS fel!");
    }
  };

  useEffect(() => {
    fetchDepartures();
    const intervalId = setInterval(fetchDepartures, updateFrequency);

    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="departures">
      <div className="buses departureContainer">
        <Departure departures={busses} />
      </div>
      <div className="trains departureContainer">
        <Departure departures={trains} />
      </div>
    </div>
  );
}

export default App;
