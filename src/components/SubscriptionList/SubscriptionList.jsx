import { useState, useEffect, useContext } from 'react';
import SubscriptionCard from '../SubscriptionCard/index.jsx';
import { useSubscriptions } from '../../providers/SubscriptionsProvider.jsx';
import { createSubscription } from '../../service/subscriptions/index.jsx';
import AddSubscriptionModal from '../AddSubscriptionModal/index.jsx';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SubscriptionList = ({ filter = '' }) => {
    const { subscriptions, fetchSubscriptions } = useSubscriptions();
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Adjust this number as needed

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddSubscriptions = async (props) => {
        try {
            const rawResponse = await createSubscription(props);
            await fetchSubscriptions();
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight) {
            // When user scrolls to bottom, increase page
            setPage((prev) => prev + 1);
        }
    };

    const displayedSubscriptions = subscriptions.slice(0, page * itemsPerPage);
    const hasMore = displayedSubscriptions.length < subscriptions.length;

    return (
        <div className="mt-6 flex flex-col grow">
            {' '}
            {/* Adjust height as needed */}
            <div className="flex items-center mb-4">
                <span className="text-white">Trier par</span>
            </div>
            <div
                className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#2f2b3a] scrollbar-track-[#1e1b2e]"
                onScroll={handleScroll}
            >
                {displayedSubscriptions.map((sub, index) => (
                    <SubscriptionCard key={sub.id || index} {...sub} />
                ))}

                {hasMore && (
                    <div className="text-center py-4">
                        <div className="text-gray-400">Scroll for more</div>
                    </div>
                )}
            </div>
            <div className="flex justify-center items-center mt-6">
                <button
                    onClick={handleOpenModal}
                    className="bg-[#1e1b2e] shadow-lg rounded-lg p-6 w-full hover:bg-[#2f2b3a] transition-colors"
                >
                    <span className="text-white text-center">
                        <AddCircleOutlineIcon />
                    </span>
                </button>
                <AddSubscriptionModal
                    open={openModal}
                    handleSubmit={handleAddSubscriptions}
                    handleClose={handleCloseModal}
                />
            </div>
        </div>
    );
};

export default SubscriptionList;
