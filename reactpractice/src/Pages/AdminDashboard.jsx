import React, { useState } from "react";
import { Menu, X } from "lucide-react";

// Import separate components
import DashboardAdmin from "./admin/DashboardAdmin";
import AdminSetting from "./admin/AdminSetting";
import Messages from "./admin/Messages";


// Sidebar menu items
const menuItems = [
  { name: "Dashboard", component: <DashboardAdmin /> },
  { name: "Messages", component: <Messages /> },
  { name: "Settings", component: <AdminSetting /> },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState(menuItems[0].name);

  const renderContent = () => {
    const activeComponent = menuItems.find((item) => item.name === activePage);
    return activeComponent ? activeComponent.component : <div>No content available</div>;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 p-4 shadow-lg fixed md:relative z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            <X />
          </button>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`cursor-pointer px-4 py-2 rounded-lg ${
                activePage === item.name
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Open Sidebar Button (Mobile) */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-white shadow px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all ${!isSidebarOpen ? "ml-16" : ""}`}
      >
        <h2 className="text-3xl font-bold mb-6">{activePage}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
