import "./Registration.css";
import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => { setName(e.target.value); setSubmitted(false); };
  const handleEmail = (e) => { setEmail(e.target.value); setSubmitted(false); };
  const handlePassword = (e) => { setPassword(e.target.value); setSubmitted(false); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-card">
        <div className="reg-header">
          <h2 className="reg-title">Create Account</h2>
          <p className="reg-sub">Fill in the details to register</p>
        </div>

        {error && (
          <div className="reg-message error-msg">
            Please fill in all fields before submitting.
          </div>
        )}

        {submitted && (
          <div className="reg-message success-msg">
            User <strong>{name}</strong> successfully registered!
          </div>
        )}

        <form className="reg-form">
          <div className="field-group">
            <label className="field-label">Name</label>
            <input
              onChange={handleName}
              className="field-input"
              value={name}
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="field-group">
            <label className="field-label">Email</label>
            <input
              onChange={handleEmail}
              className="field-input"
              value={email}
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              onChange={handlePassword}
              className="field-input"
              value={password}
              type="password"
              placeholder="Create a password"
            />
          </div>

          <button onClick={handleSubmit} className="reg-btn" type="submit">
            Register
          </button>
        </form>

        <p className="reg-footer">
          Already have an account?{" "}
          <a className="reg-link" href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
}