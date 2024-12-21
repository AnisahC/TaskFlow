import React from "react";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-pink-50">
      <div className="text-4xl font-bold text-green-700 mb-6">
        You are all set!
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-3 text-lg font-semibold text-white bg-green-700 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
