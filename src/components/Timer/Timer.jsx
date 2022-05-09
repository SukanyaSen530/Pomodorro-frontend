import { useState, useEffect } from "react";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import useSound from "use-sound";
import alarm from "../../assets/audio/audio.mp3";

import "./timer.scss";

const Timer = ({ work = 1, shortBreak = 1, longBreak = 1 }) => {
  const [time, setTime] = useState(work * 60);
  const [timer, setTimer] = useState(time);
  const [pause, setPause] = useState(true);
  const [session, setSession] = useState(1);
  const [tabState, setTabState] = useState("work");

  const [play] = useSound(alarm);

  //Get Remaining time for timer to display
  const getTimeRemaining = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}m : ${seconds}s`;
  };

  const getEmoji = (tabState) => {
    if (tabState === "work") return "💻";
    else if (tabState === "shortBreak") return "☕";
    else return "😌";
  };

  //Play the timer
  const playTimer = () => setPause(true);

  const setTimerWithTab = (mode, tab) => {
    setTime(mode * 60);
    setTimer(mode * 60);
    setTabState(tab);
  };

  //Running the timer
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

  //Toggle Work and short Break mode until session is completed
  useEffect(() => {
    if (timer === 0) {
      if (session < 3) {
        if (tabState === "work") {
          setTimerWithTab(shortBreak, "shortBreak");
          playTimer();
        } else if (tabState === "shortBreak") {
          setTimerWithTab(work, "work");
          playTimer();
          setSession((session) => session + 1);
        }
      }
      setPause((val) => !val);
      play();
    }
    // eslint-disable-next-line
  }, [timer]);

  //Switch to Long break mode once session is comlpeted
  useEffect(() => {
    if (session === 3) setTimerWithTab(longBreak, "longBreak");
  }, [session, longBreak]);

  useEffect(() => {
    document.title = `${getTimeRemaining(timer)} | ${getEmoji(
      tabState
    )} | Pomodorro `;
  }, [timer, tabState]);

  return (
    <div className="timer">
      <div className="timer__tabs flex flex-space-between">
        <button
          className={`timer__tabs__option ${
            tabState === "work" ? "active" : ""
          }`}
          onClick={() => setTimerWithTab(work, "work")}
          disabled={!pause && tabState !== "work"}
        >
          Work
        </button>
        <button
          className={`timer__tabs__option ${
            tabState === "shortBreak" ? "active" : ""
          }`}
          onClick={() => setTimerWithTab(shortBreak, "shortBreak")}
          disabled={!pause && tabState !== "shortBreak"}
        >
          Short Break
        </button>
        <button
          className={`timer__tabs__option ${
            tabState === "longBreak" ? "active" : ""
          }`}
          onClick={() => setTimerWithTab(longBreak, "longBreak")}
          disabled={(!pause && tabState !== "longBreak") || session !== 3}
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
          styles={buildStyles({
            rotation: 0.25,
            textSize: "1rem",
            pathColor: `${
              tabState === "work" ? "var(--dark)" : "var(--defaultDark)"
            }`,
            trailColor: `var(--text)`,
            pathTransitionDuration: 0.05,
          })}
        >
          <p>{getTimeRemaining(timer)}</p>
          <p>{session < 3 ? session : session - 1} of 2 sessions</p>
        </CircularProgressbarWithChildren>
      </div>

      <div className="timer__controls">
        <button
          onClick={() => setPause((prevVal) => !prevVal)}
          className="btn btn-icon secondaryDark"
        >
          {pause ? (
            <i className="fa-solid fa-play"></i>
          ) : (
            <i className="fa-solid fa-pause"></i>
          )}
        </button>
        <button
          onClick={() => setTimer(time)}
          className="btn btn-icon defaultDark"
        >
          <i className="fa-solid fa-rotate"></i>
        </button>
        <button
          onClick={() => {
            setSession(1);
            setTimerWithTab(work, "work");
          }}
          className="btn btn-contained btn-sm defaultDark"
        >
          Reset Session
        </button>
      </div>
    </div>
  );
};

export default Timer;
