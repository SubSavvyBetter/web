import React from 'react';

const NotificationsPage = () => {
    // Fake notification data
    const notifications = [
        {
            id: 1,
            image: 'https://placehold.co/100x100',
            title: 'Netflix Announces Price Increase for Premium Subscriptions',
            content:
                'Netflix is raising its premium subscription prices by 15% starting next month.',
            date: '2024-02-03',
        },
        {
            id: 2,
            image: 'https://placehold.co/100x100',
            title: 'Spotify Premium Family Plan Cost to Increase',
            content:
                'Spotify announces a 10% increase in Family Plan subscription costs effective March 1st.',
            date: '2024-02-02',
        },
        {
            id: 3,
            image: 'https://placehold.co/100x100',
            title: 'Disney+ Subscription Price Update',
            content:
                'Disney+ reveals new pricing structure with 20% increase for annual subscriptions.',
            date: '2024-02-01',
        },
        {
            id: 4,
            image: 'https://placehold.co/100x100',
            title: 'Amazon Prime Membership Fee Adjustment',
            content:
                'Amazon announces Prime membership fee increase due to expanded services.',
            date: '2024-01-31',
        },
    ];

    return (
        <>
            <h1 className="text-2xl text-white mb-6">Notifications</h1>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="bg-[#1e1b2e] rounded-lg p-4 flex gap-4 hover:bg-[#2f2b3a] transition-colors cursor-pointer"
                    >
                        <div className="w-[30%] max-w-[150px]">
                            <img
                                src={notification.image}
                                alt={notification.title}
                                className="rounded-lg w-full h-auto object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-white text-lg font-semibold mb-2">
                                {notification.title}
                            </h2>
                            <p className="text-gray-400 mb-2">
                                {notification.content}
                            </p>
                            <span className="text-sm text-gray-500">
                                {new Date(
                                    notification.date
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NotificationsPage;
