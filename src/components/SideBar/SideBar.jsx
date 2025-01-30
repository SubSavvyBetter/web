const Sidebar = () => {
    return (
      <div className="bg-[#1e1b2e] h-screen w-52 p-4 text-white d-flex">
        <div className="mb-8">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12 m-auto" />
        </div>

        <nav className="space-y-4">
          <div className="text-gray-300 hover:text-white cursor-pointer">Dashboard</div>
          <div className="text-gray-300 hover:text-white cursor-pointer">Notifications</div>
        </nav>

        <div className="absolute bottom-8 space-y-4 m-auto">
          <div className="w-8 h-8 rounded-full bg-gray-400 m-auto" ></div>
          <div className="flex flex-row items-center gap-3">
            <p className="text-gray-300">Besoin d'aide ?</p>
          </div>
          <div className="text-gray-300 hover:text-white cursor-pointer">Paramètres</div>
          <div className="text-gray-300 hover:text-white cursor-pointer">Se déconnecter</div>
        </div>
      </div>
    );
  };

  export default Sidebar;