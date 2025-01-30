import { Navigate, useLocation } from 'react-router-dom';
import {useEffect, useState, use} from 'react';
import SubscriptionsContext from '../../contexts/SubscriptionsContext.jsx';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const context = use(SubscriptionsContext);

    const deleteTokenFromStorage = () => {
        localStorage.removeItem('authToken');
    }

    useEffect(()=> {
        context.fetchSubscriptions()
            .then(() => {
                setIsAuthenticated(true)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                deleteTokenFromStorage()
                setIsAuthenticated(false)
                setLoading(false)
            })
    },[])

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />;
    return children;
};

export default ProtectedRoute;