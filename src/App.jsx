import { useState, useEffect } from "react";
import axios from "axios";
import Departure from "./components/Departure";
import data from "./assets/departures.json";
import Clock from "./components/Clock.jsx";
import { formatTimeDifference, removeParentheses } from "./util.js";
import "./app.css";

// Environment configuration
const {
  VITE_RESROBOT_API_BASE_URL,
  VITE_RESROBOT_ACCESS_ID,
  VITE_UPDATE_FREQUENCY,
  VITE_API_DURATION,
} = import.meta.env;

const { allowedDepartures, stations } = data;
const updateFrequency = parseInt(VITE_UPDATE_FREQUENCY, 10);

function App() {
  const [trains, setTrains] = useState([]);
  const [busses, setBusses] = useState([]);
  const [error, setError] = useState(null);

  const fetchDepartures = async () => {
    if (!VITE_RESROBOT_ACCESS_ID) {
      setError("API access ID is missing");
      return;
    }

    try {
      //console.log("Stations to fetch:", stations);

      const allResults = await Promise.all(
        stations.map(async (id) => {
          try {
            // console.log(`Fetching departures for station: ${id}`);
            const response = await axios.get(
              `${VITE_RESROBOT_API_BASE_URL}?id=${id}&format=json&accessId=${VITE_RESROBOT_ACCESS_ID}&duration=${VITE_API_DURATION}`
            );

            // console.log(`Raw response for station ${id}:`, response.data);

            const departures = response.data.Departure || [];
            // console.log(`Departures for station ${id}:`, departures);

            const processedDepartures = departures
              .map((departure) => {
                const timeWithoutSeconds = departure.time
                  .split(":")
                  .slice(0, 2)
                  .join(":");
                const transportName = departure.name.match(
                  /\b(Buss|Tunnelbana|Tåg)\s*\d+\b/i
                );
                const timeDifference = formatTimeDifference(departure.time);

                return {
                  name: transportName ? transportName[0] : "Unknown",
                  time: timeWithoutSeconds,
                  timeLeft: timeDifference,
                  direction: removeParentheses(departure.direction),
                };
              })
              .filter(
                (departure) =>
                  departure.time !== "Departed" &&
                  departure.name !== "Unknown" &&
                  departure.timeLeft >= 5 &&
                  allowedDepartures.includes(departure.name) &&
                  departure.direction != "Akalla T-bana"
              );

            // console.log(
            //   `Processed departures for station ${id}:`,
            //   processedDepartures
            // );
            return processedDepartures;
          } catch (stationError) {
            console.error(
              `Error fetching departures for station ${id}:`,
              stationError
            );
            return [];
          }
        })
      );

      // console.log("All Results:", allResults);

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

      // console.log("New Busses:", newBusses);
      // console.log("New Trains:", newTrains);

      setBusses([...newBusses].sort((a, b) => a.timeLeft - b.timeLeft));
      setTrains([...newTrains].sort((a, b) => a.timeLeft - b.timeLeft));

      setError(null);
    } catch (err) {
      console.error("Comprehensive fetch error:", err);
      setError("Något gick fel vid hämtning av avgångar");
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
      <h3>Ugla</h3>
      <div className="busses departureContainer">
        <h1>Bussar</h1>
        <header>
          <div className="col">Buss</div>
          <div className="col">Time</div>
          <div className="col">Departure</div>
          <div className="col">Direction</div>
        </header>
        <Clock />
        {busses.length > 0 ? (
          busses.map((buss, index) => (
            <Departure
              key={`bus-${index}`}
              name={buss.name}
              timeLeft={buss.timeLeft}
              time={buss.time}
              direction={buss.direction}
            />
          ))
        ) : (
          <div className="jahopp">Inga bussar avgår för tillfället</div>
        )}
      </div>
      <div className="trains departureContainer">
        <h1>Tåg</h1>
        <header>
          <div className="col">Tåg</div>
          <div className="col">Time</div>
          <div className="col">Departure</div>
          <div className="col">Direction</div>
        </header>
        {trains.length > 0 ? (
          trains.map((train, index) => (
            <Departure
              key={`train-${index}`}
              name={train.name}
              time={train.time}
              timeLeft={train.timeLeft}
              direction={train.direction}
            />
          ))
        ) : (
          <div className="jahopp">Inga tåg avgår för tillfället</div>
        )}
      </div>
    </div>
  );
}

export default App;
