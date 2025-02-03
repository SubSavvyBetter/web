import { use, useState, useEffect } from 'react';
import {
    deleteSubscription,
    updateSubscription,
} from '../../service/subscriptions/index.jsx';
import SubscriptionsContext from '../../contexts/SubscriptionsContext.jsx';

const SubscriptionCard = ({
    id,
    name,
    price,
    status,
    trial,
    start_date,
    end_date,
}) => {
    const { fetchSubscriptions } = use(SubscriptionsContext);
    const [editing, setEditing] = useState({
        name: false,
        price: false,
        start_date: false,
        end_date: false,
    });
    const [values, setValues] = useState({
        id,
        name,
        price,
        status,
        trial,
        start_date,
        end_date,
    });

    useEffect(() => {
        checkSubscriptionStatus();
    }, [end_date]);

    const checkSubscriptionStatus = () => {
        const currentDate = new Date();
        const endDate = new Date(end_date);

        if (endDate < currentDate && values.status !== 'INACTIVE') {
            handleStatusUpdate('INACTIVE');
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            const updatedValues = {
                ...values,
                status: newStatus,
            };
            await updateSubscription(id, updatedValues);
            setValues(updatedValues);
            await fetchSubscriptions();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubscriptionAction = async () => {
        const statusTransitions = {
            ACTIVE: 'CANCELED',
            CANCELED: 'PENDING',
            INACTIVE: 'PENDING',
            PENDING: 'ACTIVE',
        };

        const newStatus = statusTransitions[values.status] || 'PENDING';

        // If transitioning from PENDING to ACTIVE, update the dates
        if (values.status === 'PENDING' && newStatus === 'ACTIVE') {
            const today = new Date();
            const newEndDate = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
            );

            const updatedValues = {
                ...values,
                status: newStatus,
                start_date: new Date().toISOString(),
                end_date: newEndDate.toISOString(),
            };

            await updateSubscription(id, updatedValues);
            setValues(updatedValues);
        } else {
            const updatedValues = {
                ...values,
                status: newStatus,
            };
            await updateSubscription(id, updatedValues);
            setValues(updatedValues);
        }

        await fetchSubscriptions();
    };
    const handleDeleteSubscription = async () => {
        try {
            await deleteSubscription(id);
            await fetchSubscriptions();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDoubleClick = (field) => {
        setEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (field, value) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleBlur = async (field) => {
        try {
            if (values[field] !== eval(field)) {
                await updateSubscription(id, values);
                await fetchSubscriptions();
            }
            setEditing((prev) => ({ ...prev, [field]: false }));
        } catch (error) {
            console.log(error);
            setValues((prev) => ({ ...prev, [field]: eval(field) }));
            setEditing((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleKeyPress = (e, field) => {
        if (e.key === 'Enter') {
            handleBlur(field);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'text-green-400';
            case 'INACTIVE':
                return 'text-red-400';
            case 'CANCELED':
                return 'text-yellow-400';
            case 'PENDING':
                return 'text-blue-400';
            default:
                return 'text-gray-400';
        }
    };

    const getActionButton = () => {
        switch (values.status) {
            case 'ACTIVE':
                return (
                    <button
                        onClick={handleSubscriptionAction}
                        className="text-white bg-transparent border border-yellow-600 px-4 py-1 rounded hover:bg-yellow-600/10"
                    >
                        Cancel
                    </button>
                );
            case 'CANCELED':
                return (
                    <button
                        onClick={handleSubscriptionAction}
                        className="text-white bg-transparent border border-blue-500 px-4 py-1 rounded hover:bg-blue-500/10"
                    >
                        Request Renewal
                    </button>
                );
            case 'INACTIVE':
                return (
                    <button
                        onClick={handleSubscriptionAction}
                        className="text-white bg-transparent border border-blue-500 px-4 py-1 rounded hover:bg-blue-500/10"
                    >
                        Reactivate
                    </button>
                );
            case 'PENDING':
                return (
                    <button
                        onClick={handleSubscriptionAction}
                        className="text-white bg-transparent border border-green-500 px-4 py-1 rounded hover:bg-green-500/10"
                    >
                        Activate
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-[#1e1b2e] p-4 rounded-lg flex items-center justify-between mb-4">
            {/* Rest of the JSX remains the same */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white">
                        {values.name ? values.name[0] : 'N'}
                    </span>
                </div>
                <div>
                    {editing.name ? (
                        <input
                            type="text"
                            value={values.name ?? ''}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                            onBlur={() => handleBlur('name')}
                            onKeyPress={(e) => handleKeyPress(e, 'name')}
                            className="bg-[#2f2b3a] text-white px-2 py-1 rounded outline-none"
                            autoFocus
                        />
                    ) : (
                        <div
                            className="text-white cursor-pointer"
                            onDoubleClick={() => handleDoubleClick('name')}
                        >
                            {values.name ?? ''}
                        </div>
                    )}
                    {editing.price ? (
                        <input
                            type="number"
                            value={values.price}
                            onChange={(e) =>
                                handleChange(
                                    'price',
                                    parseFloat(e.target.value)
                                )
                            }
                            onBlur={() => handleBlur('price')}
                            onKeyPress={(e) => handleKeyPress(e, 'price')}
                            className="bg-[#2f2b3a] text-gray-400 px-2 py-1 rounded outline-none w-20"
                            autoFocus
                        />
                    ) : (
                        <div
                            className="text-gray-400 cursor-pointer"
                            onDoubleClick={() => handleDoubleClick('price')}
                        >
                            ${values.price}
                        </div>
                    )}
                    {trial && <div className="text-yellow-400">Trial</div>}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className={getStatusColor(values.status)}>
                        {values.status}
                    </span>
                    <div className="flex gap-2">
                        {editing.start_date ? (
                            <input
                                type="date"
                                value={values.start_date.split('T')[0]}
                                onChange={(e) =>
                                    handleChange('start_date', e.target.value)
                                }
                                onBlur={() => handleBlur('start_date')}
                                className="bg-[#2f2b3a] text-gray-400 px-2 py-1 rounded outline-none"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="text-gray-400 text-sm cursor-pointer"
                                onDoubleClick={() =>
                                    handleDoubleClick('start_date')
                                }
                            >
                                {new Date(
                                    values.start_date
                                ).toLocaleDateString()}
                            </span>
                        )}
                        -
                        {editing.end_date ? (
                            <input
                                type="date"
                                value={values.end_date.split('T')[0]}
                                onChange={(e) =>
                                    handleChange('end_date', e.target.value)
                                }
                                onBlur={() => handleBlur('end_date')}
                                className="bg-[#2f2b3a] text-gray-400 px-2 py-1 rounded outline-none"
                                autoFocus
                            />
                        ) : (
                            <span
                                className="text-gray-400 text-sm cursor-pointer"
                                onDoubleClick={() =>
                                    handleDoubleClick('end_date')
                                }
                            >
                                {new Date(values.end_date).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
                {getActionButton()}
                <button
                    onClick={handleDeleteSubscription}
                    className="text-white bg-transparent border border-red-600 px-4 py-1 rounded hover:bg-red-600/10"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SubscriptionCard;
