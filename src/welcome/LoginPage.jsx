import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '/logo.svg';
import { login } from '../service/auth/index.jsx';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleActionLogin = () => {
        login(username, password)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                            <Link to="/signup" className="signup-link">
                                Create your account
                            </Link>
                        </p>
                    </div>

                    <div className="right-box">
                        <div className="input-container">
                            <input
                                placeholder="Username"
                                className="login-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                className={`submit-login`}
                                onClick={handleActionLogin}
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
