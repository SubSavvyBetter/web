import {use} from 'react';
import { deleteSubscription } from '../../service/subscriptions/index.jsx';
import SubscriptionsContext from '../../contexts/SubscriptionsContext.jsx';

const SubscriptionCard = ({ id ,name, price, status, trial, start_date, end_date }) => {
    const {fetchSubscriptions} = use(SubscriptionsContext);
    const handleDeleteSubscription = async () => {
      try{
        await deleteSubscription(id);
        await fetchSubscriptions();
      }catch(error){
        console.log(error)
      }
    }

    return (
      <div className="bg-[#1e1b2e] p-4 rounded-lg flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white">{name[0]}</span>
          </div>
          <div>
            <div className="text-white">{name}</div>
            <div className="text-gray-400">${price}</div>
            {trial && <div className="text-yellow-400">Trial</div>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-green-400">{status}</span>
            <span className="text-gray-400 text-sm">
              {new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}
            </span>
          </div>
          <button className="text-white bg-transparent border border-white px-4 py-1 rounded">
            Unsubscribe
          </button>
          <button onClick={handleDeleteSubscription} className="text-white bg-transparent border border-red-600 px-4 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    );
};

export default SubscriptionCard;