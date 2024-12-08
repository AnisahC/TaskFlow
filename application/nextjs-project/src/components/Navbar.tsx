"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Mock API call to check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth");
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <nav className="bg-pink-50 p-4 border-b border-green-300 shadow-md">
      <ul className="flex space-x-6 text-green-700 justify-center font-semibold">
        <li className="hover:text-pink-600 transition duration-200">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-pink-600 transition duration-200">
          <Link href="/about">About</Link>
        </li>
        {isLoggedIn && (
          <li className="hover:text-pink-600 transition duration-200">
            <Link href="/MyCenter">My Center</Link>
          </li>
        )}
        <li className="hover:text-pink-600 transition duration-200">
          <Link href="/CalendarMonthly">Calendar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
