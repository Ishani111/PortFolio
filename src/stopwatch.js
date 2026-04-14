import React, { useState, useEffect } from "react";
import "./stopwatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="sw-page">
      <div className="sw-card">
        <h2 className="sw-title">Stopwatch</h2>

        <div className="sw-display">
          <span className="sw-unit">{hours}</span>
          <span className="sw-sep">:</span>
          <span className="sw-unit">{minutes}</span>
          <span className="sw-sep">:</span>
          <span className="sw-unit">{seconds}</span>
        </div>

        <div className="sw-labels">
          <span>HH</span>
          <span>MM</span>
          <span>SS</span>
        </div>

        <div className="sw-status">
          <span className={`sw-dot ${running ? "active" : ""}`} />
          <span>{running ? "Running" : "Stopped"}</span>
        </div>

        <div className="sw-buttons">
          <button
            className="sw-btn start"
            onClick={() => setRunning(true)}
            disabled={running}
          >
            Start
          </button>
          <button
            className="sw-btn stop"
            onClick={() => setRunning(false)}
            disabled={!running}
          >
            Stop
          </button>
          <button
            className="sw-btn reset"
            onClick={() => { setTime(0); setRunning(false); }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;