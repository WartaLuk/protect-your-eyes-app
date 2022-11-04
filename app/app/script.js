import React, { useState } from "react";
import { render } from "react-dom";

const App = () => {
  const [status, setStatus] = useState("off");
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const padZero = (value) => {
    if (value < 10) return `0${value}`;
    else return value;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  };

  const startTimer = () => {
    setTime(12);
    setStatus("work");
    setTimer(
      setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            restTime();
          }
          return time - 1;
        });
      }, 1000)
    );
  };

  const restTime = () => {
    setStatus("rest");
    setTime(20);
    setTimer(
      setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            startTimer();
          }
          return time - 1;
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    setStatus("off");
    clearInterval(timer);
    setTimer(1200);
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === "off" && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === "work" && <img src="./images/work.png" />}
      {status === "rest" && <img src="./images/rest.png" />}
      {status !== "off" && <div className="timer">{formatTime(time)}</div>}
      {status === "off" && (
        <button className="btn" onClick={startTimer}>
          Start
        </button>
      )}
      {status !== "off" && (
        <button className="btn" onClick={() => stopTimer()}>
          Stop
        </button>
      )}
      <button className="btn btn-close">X</button>
    </div>
  );
};

render(<App />, document.querySelector("#app"));
