import Sidebar from '../../components/SideBar/index.jsx';
import Dashboard from '../../components/Dashboard/index.jsx';
const HomePage = () => {
    return (
        <div className="flex w-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-[#13111c]">
                <Dashboard />
            </main>
        </div>
    );
};

export default HomePage;
