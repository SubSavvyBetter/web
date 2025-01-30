
import Sidebar from '../../components/SideBar/index.jsx'
import SubscriptionList from '../../components/SubscriptionList/index.jsx';
import SubscriptionsInfo from '../../components/SubscriptionsInfo/index.jsx'

const HomePage = () => {

    return (
        <div className="flex w-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-[#13111c]">
                <SubscriptionsInfo/>
              <SubscriptionList />
            </main>
          </div>
    );
  };

  export default HomePage;