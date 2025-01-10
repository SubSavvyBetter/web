import React, {useState, useEffect} from "react";

const LoginAuthChecks = () => {
    const [email, setEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [password, setPassword] = useState("")
    const [isFormValid, setIsFormValid] = useState(false);
    
    //TODO: Add email check for Login with email in DB
    //TODO: Add password check for Login with password in DB

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isPasswordValid = password.trim().length > 0;

        setIsValidEmail(emailRegex.test(email));
        setIsFormValid(emailRegex.test(email) && isPasswordValid);
    }, [email, password]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    return {
        email,
        password,
        isFormValid,
        handleEmailChange,
        handlePasswordChange,
    };
};

export default LoginAuthChecks;