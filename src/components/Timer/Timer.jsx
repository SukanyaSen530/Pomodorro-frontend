import { useState, useEffect } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./timer.scss";

const Timer = ({ work = 1, shortBreak = 1, longBreak = 1 }) => {
  const [time, setTime] = useState(work * 60);
  const [timer, setTimer] = useState(time);
  const [pause, setPause] = useState(true);

  const [tabState, setTabState] = useState("work");

  useEffect(() => {
    if (!pause) {
      let intervalId = setInterval(() => {
        if (timer > 0) {
          setTimer((secs) => secs - 1);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer, pause]);


  const getTimeRemaining = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}m : ${seconds}s`;
  };

  useEffect(() => {
    document.title = `${getTimeRemaining(timer)} | 💻`;
  }, [timer]);

  useEffect(() => {
    if (tabState === "work") {
      setTime(work * 60);
      setTimer(work * 60);
    }
    if (tabState === "shortBreak") {
      setTime(shortBreak * 60);
      setTimer(shortBreak * 60);
    }
    if (tabState === "longBreak") {
      setTime(longBreak * 60);
      setTimer(longBreak * 60);
    }
  }, [tabState, work, shortBreak, longBreak]);

  return (
    <div className="timer">
      <div className="timer__tabs flex flex-space-between">
        <button
          className={`timer__tabs__option ${
            tabState === "work" ? "active" : ""
          }`}
          onClick={() => setTabState("work")}
        >
          Work
        </button>
        <button
          className={`timer__tabs__option ${
            tabState === "shortBreak" ? "active" : ""
          }`}
          onClick={() => setTabState("shortBreak")}
        >
          Short Break
        </button>
        <button
          className={`timer__tabs__option ${
            tabState === "longBreak" ? "active" : ""
          }`}
          onClick={() => setTabState("longBreak")}
        >
          Long Break
        </button>
      </div>

      <div className="timer__clock">
        <CircularProgressbarWithChildren
          counterClockwise
          value={timer}
          maxValue={time}
          minValue={0}
          text={getTimeRemaining(timer)}
          styles={buildStyles({
            rotation: 0.25,
            textSize: "1rem",
            pathColor: `#b185db`,
            textColor: "#000",
            trailColor: "#d6d6d6",
          })}
        ></CircularProgressbarWithChildren>
      </div>

      <div className="timer__controls">
        <button
          onClick={() => setPause((prevVal) => !prevVal)}
          className="btn btn-icon secondaryLight"
        >
          {pause ? (
            <i class="fa-solid fa-play"></i>
          ) : (
            <i class="fa-solid fa-pause"></i>
          )}
        </button>
        <button
          onClick={() => setTimer(time)}
          className="btn btn-icon defaultLight"
        >
          <i class="fa-solid fa-rotate"></i>
        </button>
      </div>
    </div>
  );
};

export default Timer;
