import { useState, useEffect } from 'react';
import { SubscriptionsProvider } from '../../providers/SubscriptionsProvider.jsx';
import Sidebar from '../../components/SideBar/index.jsx';
import SubscriptionList from '../../components/SubscriptionList/index.jsx';
import SubscriptionsInfo from '../../components/SubscriptionsInfo/index.jsx';
import { Snackbar, Alert } from '@mui/material';
import { useSubscriptions } from '../../providers/SubscriptionsProvider.jsx';

const HomePage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { subscriptions } = useSubscriptions();

    const handleKeyPress = (event) => {
        // Check for Alt + N
        if (event.altKey && event.key.toLowerCase() === 'n') {
            checkTrialSubscriptions();
        }
    };

    const checkTrialSubscriptions = () => {
        const today = new Date();
        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(today.getDate() + 2);

        const nearingTrials = subscriptions.filter((sub) => {
            if (!sub.trial) return false;
            const endDate = new Date(sub.end_date);
            return endDate >= today && endDate <= twoDaysFromNow;
        });

        if (nearingTrials.length > 0) {
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        // Add event listener for keyboard shortcut
        window.addEventListener('keydown', handleKeyPress);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [subscriptions]); // Re-add listener when subscriptions change

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="flex w-screen">
            <Sidebar />
            <main className="flex flex-col p-8 bg-[#13111c] grow">
                <SubscriptionsInfo />
                <SubscriptionList />
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="warning"
                        sx={{
                            width: '100%',
                            backgroundColor: '#1e1b2e',
                            color: '#fff',
                            '& .MuiAlert-icon': {
                                color: '#facc15', // yellow-400
                            },
                        }}
                    >
                        Your Netflix trial subscription will expire in 2 days!
                    </Alert>
                </Snackbar>
            </main>
        </div>
    );
};

export default HomePage;
