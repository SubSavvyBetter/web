import { useState, useContext } from 'react';
import SubscriptionsContext from '../contexts/SubscriptionsContext.jsx';
import { getSubscriptions } from '../service/subscriptions/index.jsx';

const MOCK = [
    { name: 'Abo 1', amount: '89,759', status: 'Actif', color: 'purple' },
    { name: 'Abo 2', amount: '89,759', status: 'Actif', color: 'red' },
    { name: 'Abo 3', amount: '89,759', status: 'Actif', color: 'gray' },
];

const SubscriptionsProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState(MOCK);

    const fetchSubscriptions = async () => {
        try {
            const subscriptions = await getSubscriptions();
            setSubscriptions(subscriptions);
        } catch (error) {
            console.log(error);
            throw 'No subscriptions fond :)';
        }
    };

    const value = { subscriptions, fetchSubscriptions };
    return (
        <SubscriptionsContext value={value}>{children}</SubscriptionsContext>
    );
};
const useSubscriptions = () => {
    return useContext(SubscriptionsContext);
};
export { SubscriptionsProvider, useSubscriptions };
