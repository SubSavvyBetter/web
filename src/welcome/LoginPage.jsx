import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '/logo.svg';
import { login } from '../service/auth/index.jsx';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleKeyPress = (ev) => {
        if (ev.key === 'Enter') handleActionLogin();
    };
    const handleActionLogin = () => {
        login(username, password)
            .then(() => {
                console.log('test');
                navigate('/');
            })
            .catch((error) => {
                console.log('login failed');
                setIsError(true);
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
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isError && (
                                <div className="text-red-600 text-sm mt-2 text-left">
                                    Invalid username or password. Please try
                                    again.
                                </div>
                            )}
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
