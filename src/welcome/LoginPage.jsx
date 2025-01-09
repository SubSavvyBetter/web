import React from "react";
import "./LoginPage.css";
import logo from "/logo.svg";

const LoginPage = () => {
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
              <span>Create your account</span>
            </p>
          </div>

          <div className="right-box">
            <div className="input-container">
              <input type="email" placeholder="Email" className="login-input" />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
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
              <button className="submit-login">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
