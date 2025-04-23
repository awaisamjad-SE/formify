import React, { useState, useEffect } from "react";

const Alert = ({ type, message, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(100); // Initially full width

  // Determine the background color based on alert type
  const alertStyles = type === "success"
    ? "bg-green-500"
    : "bg-red-500"; // success: green, danger: red

  // Use effect to hide alert after a certain time
  useEffect(() => {
    const timer = setTimeout(() => {
      setSidebarWidth(0); // Start the transition of the sidebar
      setTimeout(() => {
        setIsVisible(false); // Hide the alert after the transition
      }, 500); // Delay the visibility change after transition
    }, duration); // Alert will disappear after `duration` time

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [duration]);

  if (!isVisible) return null; // If not visible, do not render the alert

  return (
    <div
      className={`fixed top-4 left-0 z-50 p-4 rounded-lg shadow-lg transition-all duration-500 ${alertStyles}`}
    >
      {/* Sidebar transition */}
      <div
        className="h-full bg-gray-900 absolute top-0 left-0"
        style={{ width: `${sidebarWidth}%`, transition: "width 0.5s ease" }}
      ></div>

      <div className="relative z-10">
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
