import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './welcome/LoginPage';
import SignupPageEmail from './welcome/SignupPageEmail';
import SignupPageInfo from './welcome/SignupPageInfo';
import HomePage from './layouts/HomePage/HomePage.jsx';
import ProtectedRoute from './components/ProtectedRoute/index.jsx';
import { SubscriptionsProvider } from './providers/SubscriptionsProvider.jsx';
import Dashboard from './layouts/Dashboard/Dashboard.jsx';

import Notifications from './layouts/Notifications/Notifications.jsx';

function App() {
    return (
        <SubscriptionsProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/notifications"
                        element={
                            <ProtectedRoute>
                                <Notifications />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPageEmail />} />
                    <Route path="/signup/info" element={<SignupPageInfo />} />
                </Routes>
            </Router>
        </SubscriptionsProvider>
    );
}

export default App;
