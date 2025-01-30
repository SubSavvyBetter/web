import React, { useState, useEffect } from 'react';

const SignupAuthChecks = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isUsernameValid = username.trim().length > 0;
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isPasswordValid = passwordRegex.test(password);
        const isConfirmPasswordValid = password === confirmPassword;

        setIsFormValid(
            isUsernameValid && isPasswordValid && isConfirmPasswordValid
        );
        console.log(
            isUsernameValid,
            isPasswordValid,
            isConfirmPasswordValid,
            isFormValid
        );
    }, [username, password, confirmPassword]);

    //TODO: Add email + username + password to DB

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(emailValue));
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return {
        email,
        isValidEmail,
        username,
        password,
        confirmPassword,
        isFormValid,
        handleEmailChange,
        handleUsernameChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
    };
};

export default SignupAuthChecks;
