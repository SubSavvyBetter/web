import React from "react";
import "./SignupPageEmail.css";
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
            <h1 className="login-title">Sign up</h1>
            <p className="login-subtext">
              Already have an account? <br />
              <span>Log in</span>
            </p>
          </div>

          <div className="right-box">
            <div className="input-container">
              <input type="email" placeholder="Email" className="login-input" />
            </div>

            <div className="login-actions">
              <button className="google-login">
                Or sign up with
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google logo"
                />
              </button>
              <button className="submit-login">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
