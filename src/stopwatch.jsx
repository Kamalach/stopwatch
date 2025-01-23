import React, { useEffect, useRef, useState } from "react";

function Stopwatch() {
  const [isRunning, setISRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIDRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIDRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 100);
    } else {
      // Clear the interval when stopwatch is not running
      clearInterval(intervalIDRef.current);
    }
    return () => clearInterval(intervalIDRef.current);
  }, [isRunning]);

  function start() {
    setISRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setISRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setISRunning(false);
  }

  function formatTime() {
    // let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let miliseconds = Math.floor((elapsedTime % 1000) / 10);
    return `${minutes}:${seconds}:${miliseconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          Start
        </button>
        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
