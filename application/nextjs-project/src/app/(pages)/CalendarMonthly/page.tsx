"use client";
import Calendar from "@/components/MonthlyCalendar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Calendar />
    </main>
  ) : (
    <div className="text-3xl flex items-center justify-center min-h-screen flex-col">
      Please Log in to see the calendar
    </div>
  );
}
