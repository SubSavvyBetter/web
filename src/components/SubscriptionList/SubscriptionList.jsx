import { useState, useEffect, useContext } from 'react';
import SubscriptionCard from '../SubscriptionCard/index.jsx'
import { useSubscriptions } from '../../providers/SubscriptionsProvider.jsx';
import { createSubscription } from '../../service/subscriptions/index.jsx';
import  AddSubscriptionModal  from '../AddSubscriptionModal/index.jsx'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const SubscriptionList = ({filter= ""}) => {
    const {subscriptions, fetchSubscriptions} = useSubscriptions();
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
      setOpenModal(true);
    }

    const handleCloseModal = () => {
      setOpenModal(false);
    }

    const handleAddSubscriptions = async (props) => {
      try {
        const rawResponse = await createSubscription(props);
        await fetchSubscriptions();
      }catch (error){
        console.log(error)
      }
    }

    return (
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <span className="text-white">Trier par</span>
        </div>
        {subscriptions.map((sub, index) => (
          <SubscriptionCard key={index} {...sub} />
        ))}
        <div className="flex justify-center items-center mt-6">
          <button onClick={handleOpenModal} className="bg-[#1e1b2e] shadow-lg rounded-lg p-6 w-full">
            <span className="text-white text-center  "><AddCircleOutlineIcon/></span>
          </button>
          <AddSubscriptionModal open={openModal} handleSubmit={handleAddSubscriptions} handleClose={handleCloseModal}/>
        </div>
      </div>
    );
  };

  export default SubscriptionList;