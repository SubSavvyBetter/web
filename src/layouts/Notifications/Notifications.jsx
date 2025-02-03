import Sidebar from '../../components/SideBar/index.jsx';
import NotificationsPage from '../../components/NotificationsPage/NotificationsPage.jsx';

const HomePage = () => {
    return (
        <div className="flex w-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-[#13111c] h-screen overscroll-y-auto">
                <NotificationsPage />
            </main>
        </div>
    );
};

export default HomePage;
