import React, { Component } from 'react';
import "./login.css";

class Signin extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-sub">Sign in to your account</p>
          </div>

          <form className="login-form">
            <div className="field-group">
              <label className="field-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                defaultValue="Ishani"
                className="field-input"
                placeholder="Enter username"
              />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                defaultValue="password"
                className="field-input"
                placeholder="Enter password"
              />
            </div>

            <input type="submit" value="Login" className="login-btn" />
          </form>

          <p className="login-footer">
            Don't have an account?{" "}
            <a className="login-link" href="/Registration">Sign Up</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Signin;