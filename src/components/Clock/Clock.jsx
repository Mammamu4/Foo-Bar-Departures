import { useState, useEffect } from "react";
import "./clock.css"
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className="clock">
      {formatTime(time.getHours())}:{formatTime(time.getMinutes())}:
      {formatTime(time.getSeconds())}
    </div>
  );
};

export default Clock;
