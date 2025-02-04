import { useNavigate } from 'react-router-dom';
import { logout } from '../../service/auth/index.jsx';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="bg-[#1e1b2e] h-screen w-52 p-4 flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex flex-col items-center">
                <div className="mb-8">
                    <img
                        src="/logo.svg"
                        alt="Logo"
                        className="w-12 h-12 cursor-pointer"
                        onClick={() => handleNavigate('/')}
                    />
                </div>

                <nav className="flex flex-col items-center space-y-4 w-full">
                    <div
                        className="text-gray-300 hover:text-white cursor-pointer w-full text-center py-2 hover:bg-[#2f2b3a] rounded transition-colors"
                        onClick={() => handleNavigate('/dashboard')}
                    >
                        Dashboard
                    </div>
                    <div
                        className="text-gray-300 hover:text-white cursor-pointer w-full text-center py-2 hover:bg-[#2f2b3a] rounded transition-colors"
                        onClick={() => handleNavigate('/notifications')}
                    >
                        Notifications
                    </div>
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                <div
                    className="text-gray-300 hover:text-white cursor-pointer w-full text-center py-2 hover:bg-[#2f2b3a] rounded transition-colors"
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
