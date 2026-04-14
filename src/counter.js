import React, { useState } from "react";
import "./counter.css";

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="counter-page">
      <div className="counter-card">

        <h2 className="counter-title">Counter</h2>

        {/* display */}
        <div className="counter-display">
          <p>Current count</p>
          <h1>{count}</h1>
        </div>

        {/* quick buttons */}
        <div className="counter-quick">
          <button onClick={() => setCount(count + 1)}>+1</button>
          <button onClick={() => setCount(count - 1)}>-1</button>
          <button onClick={() => setCount(count + 5)}>+5</button>
          <button onClick={() => setCount(count - 5)}>-5</button>
        </div>

        {/* input */}
        <input
          type="number"
          className="counter-input"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />

        {/* actions */}
        <div className="counter-actions">
          <button onClick={() => setCount(count + step)}>
            Add {step}
          </button>

          <button onClick={() => setCount(count - step)}>
            Subtract {step}
          </button>
        </div>

        {/* reset */}
        <button className="counter-reset" onClick={() => setCount(0)}>
          Reset
        </button>

      </div>
    </div>
  );
}

export default Counter;