"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
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

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-pink-50 p-4 border-b border-green-300 shadow-md">
      <ul className="flex space-x-6 text-green-700 justify-center font-semibold">
        <li
          className={`hover:text-pink-600 transition duration-200 ${
            isActive("/") ? "bg-[#b08968] text-white px-4 py-2 rounded-md" : ""
          }`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`hover:text-pink-600 transition duration-200 ${
            isActive("/about")
              ? "bg-[#b08968] text-white px-4 py-2 rounded-md"
              : ""
          }`}
        >
          <Link href="/about">About</Link>
        </li>
        {isLoggedIn && (
          <li
            className={`hover:text-pink-600 transition duration-200 ${
              isActive("/MyCenter")
                ? "bg-[#b08968] text-white px-4 py-2 rounded-md"
                : ""
            }`}
          >
            <Link href="/MyCenter">My Center</Link>
          </li>
        )}
        <li
          className={`hover:text-pink-600 transition duration-200 ${
            isActive("/CalendarMonthly")
              ? "bg-[#b08968] text-white px-4 py-2 rounded-md"
              : ""
          }`}
        >
          <Link href="/CalendarMonthly">Calendar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
