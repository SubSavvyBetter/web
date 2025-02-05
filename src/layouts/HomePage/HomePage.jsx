import { useState, useEffect } from 'react';
import { SubscriptionsProvider } from '../../providers/SubscriptionsProvider.jsx';
import Sidebar from '../../components/SideBar/index.jsx';
import SubscriptionList from '../../components/SubscriptionList/index.jsx';
import SubscriptionsInfo from '../../components/SubscriptionsInfo/index.jsx';
import { Snackbar, Alert } from '@mui/material';
import { useSubscriptions } from '../../providers/SubscriptionsProvider.jsx';

const HomePage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { subscriptions } = useSubscriptions();

    const handleKeyPress = (event) => {
        if (event.shiftKey && event.key.toLowerCase() === 'n') {
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
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [subscriptions]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="flex flex-row max-h-full w-full">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 text-white bg-[#1e1b2e] p-2 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isMobileMenuOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Sidebar */}
            <div
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}
            >
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 bg-[#13111c] max-h-full">
                <div className="max-w-7xl mx-auto">
                    <SubscriptionsInfo />
                    <SubscriptionList />
                </div>
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
                                color: '#facc15',
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
