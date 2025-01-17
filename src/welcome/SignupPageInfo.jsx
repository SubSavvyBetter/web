import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPageInfo.css';
import logo from '/logo.svg';
import SignupAuthChecks from './authChecks/SignupAuthChecks';

const SignupPageInfo = () => {
    const {
        username,
        password,
        confirmPassword,
        isFormValid,
        handleUsernameChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
    } = SignupAuthChecks();

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
                            <Link to="/login" className="login-link">
                                Log in
                            </Link>
                        </p>
                    </div>

                    <div className="right-box">
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Username"
                                className="login-input"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="login-input"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="login-input"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>

                        <div className="login-actions">
                            <button className="google-login">
                                Or sign up with
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                    alt="Google logo"
                                />
                            </button>
                            <button
                                className={`submit-login ${isFormValid ? '' : 'disabled'}`}
                                disabled={!isFormValid}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPageInfo;
