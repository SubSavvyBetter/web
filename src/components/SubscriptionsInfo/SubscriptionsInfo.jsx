import { use, useEffect, useState } from 'react';
import SubscriptionsContext from '../../contexts/SubscriptionsContext.jsx';

const SubscriptionsInfo = () => {
    const [totalSubs, setTotalSubs] = useState(0)
    const [sumPrice, setSumPrice] = useState(0)
    const {subscriptions} = use(SubscriptionsContext);

    const calculateTotalSubs = () => {
        return subscriptions.length
    }

    const calculateSumPrice = () => {
        return subscriptions.reduce((acc, item) => acc + item.price, 0);
    }

    useEffect(() => {
        setSumPrice(calculateSumPrice())
        setTotalSubs(calculateTotalSubs());
    }, [subscriptions])

    return (
        <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='bg-[#1e1b2e] rounded-lg p-6 text-center'>
                <h3 className='text-gray-400 text-sm mb-2'>Total Subscriptions</h3>
                <p className='text-white text-2xl font-bold'>{totalSubs}</p>
            </div>
            <div className='bg-[#1e1b2e] rounded-lg p-6 text-center'>
                <h3 className='text-gray-400 text-sm mb-2'>Total Amount</h3>
                <p className='text-white text-2xl font-bold'>${sumPrice}</p>
            </div>
        </div>
    )
}

export default SubscriptionsInfo;