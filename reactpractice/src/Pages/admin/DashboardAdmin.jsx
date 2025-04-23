import React from "react";

const DashboardAdmin = () => {
  // Sample data for the dashboard
  const dashboardStats = [
    { title: "Total Users", value: "1,420", status: "+8%" },
    { title: "Active Plans", value: "321", status: "+2.4%" },
    { title: "Revenue", value: "$12,500", status: "-1.3%" },
    { title: "New Messages", value: "88", status: "+10%" },
    { title: "Feedbacks", value: "45", status: "+5.1%" },
    { title: "Pending Tasks", value: "12", status: "-3%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dashboardStats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition-all"
        >
          <p className="text-gray-500">{item.title}</p>
          <h2 className="text-2xl font-bold">{item.value}</h2>
          <p
            className={`text-sm mt-1 ${item.status.startsWith("-") ? "text-red-500" : "text-green-500"}`}
          >
            {item.status} this week
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardAdmin;
