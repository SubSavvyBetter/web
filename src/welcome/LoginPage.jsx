import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import logo from "/logo.svg";
import LoginAuthChecks from "./authChecks/LoginAuthChecks.jsx";

const LoginPage = () => {
  const {
    email,
    password,
    isFormValid,
    handleEmailChange,
    handlePasswordChange
  } = LoginAuthChecks();
  
  return (
    <div className="background-pattern">
      <div className="login-container">
        <div className="login-box">
          <div className="left-box">
            <div className="logo">
              <img src={logo} alt="SubSavvy logo" />
            </div>
            <h1 className="login-title">Log in</h1>
            <p className="login-subtext">
              Don't have an account? <br />
              <Link to='/signup' className="signup-link">Create your account</Link>
            </p>
          </div>

          <div className="right-box">
            <div className="input-container">
              <input 
                type="email" 
                placeholder="Email" 
                className="login-input"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="login-actions">
              <button className="google-login">
                Or log in with
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google logo"
                />
              </button>
              <button
                className={`submit-login ${isFormValid ? "" : "disabled"}`}
                disabled={!isFormValid}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
