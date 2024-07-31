import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
function App() {
  const [min, setMin] = useState(0);
  const [sec, setsec] = useState(0);
  const [hour, sethour] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let id = null;
    if (running) {
      id = setInterval(() => {
        setsec((previoussec) => {
          if (previoussec === 59) {
            setMin((previousmin) => {
              if (previousmin === 59) {
                sethour((previoushour) => previoushour + 1);
                return 0;
              } else {
                return previousmin + 1;
              }
            });
            return 0;
          } else {
            return previoussec + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(id);
  }, [running]);

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };
  const handleRestart = () => {
    setMin(0);
    setsec(0);
    sethour(0);
  };

  return (
    <div className="App">
      <p>
        {hour < 10 ? "0" + hour : hour}:{min < 10 ? "0" + min : min}:
        {sec < 10 ? "0" + sec : sec}
      </p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default App;
