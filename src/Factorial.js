import React, { useState } from "react";
import "./Factorial.css";

function Factorial() {
  const [num, setNum] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateFactorial = () => {
    if (num === "" || num < 0) {
      setError("Please enter a valid non-negative number.");
      setResult(null);
      return;
    }
    if (num > 20) {
      setError("Please enter a number between 0 and 20.");
      setResult(null);
      return;
    }
    setError("");
    let fact = 1;
    for (let i = 1; i <= num; i++) fact *= i;
    setResult(fact);
  };

  return (
    <div className="fact-page">
      <div className="fact-card">

        <div className="fact-header">
          <h2 className="fact-title">Factorial Calculator</h2>
          <p className="fact-sub">Compute n! for any number 0 – 20</p>
        </div>

        <div className="fact-input-group">
          <label className="fact-label">Enter a number</label>
          <input
            className="fact-input"
            type="number"
            value={num}
            min="0"
            max="20"
            onChange={(e) => {
              setNum(Number(e.target.value));
              setResult(null);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && calculateFactorial()}
            placeholder="e.g. 7"
          />
        </div>

        {error && <p className="fact-error">{error}</p>}

        <button className="fact-btn" onClick={calculateFactorial}>
          Calculate
        </button>

        {result !== null && (
          <div className="fact-result">
            <span className="fact-result-label">{num}! =</span>
            <span className="fact-result-value">{result.toLocaleString()}</span>
          </div>
        )}

      </div>
    </div>
  );
}

export default Factorial;