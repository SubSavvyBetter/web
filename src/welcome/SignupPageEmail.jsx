import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPageEmail.css';
import logo from '/logo.svg';
import SignupAuthChecks from './authChecks/SignupAuthChecks';

const SignupPageEmail = () => {
    const { email, isValidEmail, handleEmailChange } = SignupAuthChecks();

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
                                type="email"
                                placeholder="Email"
                                className="login-input"
                                value={email}
                                onChange={handleEmailChange}
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
                                className={`submit-login ${isValidEmail ? '' : 'disabled'}`}
                                disabled={!isValidEmail}
                            >
                                {isValidEmail ? (
                                    <Link
                                        to="/signup/info"
                                        className="submit-link"
                                    >
                                        Next
                                    </Link>
                                ) : (
                                    'Next'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPageEmail;
