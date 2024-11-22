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
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div className="text-4xl">You are all set!</div>
      <button
        onClick={handleLogout}
        className=" text-white bg-rose-500 rounded p-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
