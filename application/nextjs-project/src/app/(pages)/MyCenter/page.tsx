"use client";
import React, { useEffect, useState } from "react";
import { Task } from "@/components/TaskCard/types";
import WelcomeCard from "@/components/WelcomeDashboard";
import { useRouter } from "next/navigation";
import { DashBoardCard } from "@/components/DashBoardCard";
interface User {
  userName: string;
  Address: string;
  UserId: string;
}

const OverviewPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const legendItems = [
    { color: "bg-red-500", label: "High" },
    { color: "bg-yellow-500", label: "Medium" },
    { color: "bg-green-500", label: "Low" },
  ];
  useEffect(() => {
    // verify user status and fetch user data
    const checkAuth = async () => {
      try {
        const authResponse = await fetch("/api/auth", {
          method: "GET",
          credentials: "include",
        });

        if (authResponse.status === 200) {
          const userInfoResponse = await fetch("/api/getUserInfo", {
            method: "GET",
            credentials: "include",
          });

          const userPointsResponse = await fetch("/api/getUsersPoints", {
            method: "GET",
            credentials: "include",
          });

          if (userInfoResponse.ok && userPointsResponse.ok) {
            const userInfoData = await userInfoResponse.json();
            const userPointsData = await userPointsResponse.json();

            setUser({
              userName: userInfoData.userName,
              Address: userInfoData.Address,
              UserId: userInfoData.UserId,
            });
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            router.push("/CreateAccount");
          }
        } else {
          setIsAuthenticated(false);
          router.push("/CreateAccount");
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        setIsAuthenticated(false);
        router.push("/CreateAccount");
      } finally {
        setLoading(false);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch("../api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchTasks();
    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && user ? (
    <div className="p-6 bg-green-50 rounded-lg shadow-md">
      <h1 className="pt-0 text-4xl font-bold leading-tight text-black-900 mb-6">
        Welcome, {user.userName}!
      </h1>
      <div className="flex gap-10 items-start leading-tight">
        <section className="flex flex-col whitespace-nowrap">
          <h2 className="text-xs text-blue-700">USER ID</h2>
          <div className="flex gap-1 items-center mt-1 text-base font-medium text-blue-900">
            {user.UserId}
            <img
              loading="lazy"
              src="https://example.com/user_icon.png"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-4 aspect-[1.07]"
            />
          </div>
        </section>
        <section className="flex flex-col whitespace-nowrap">
          <h2 className="text-xs text-blue-700">Account</h2>
          <div className="flex gap-1 items-center mt-1 text-base font-medium text-blue-900">
            {user.Address}
          </div>
        </section>
      </div>
      <div className="mt-10">
        {!tasks ? (
          <WelcomeCard />
        ) : (
          <DashBoardCard
            title="CHART TITLE"
            value="5.000,00"
            subtitle="50 Orders"
            tasks={tasks}
            legendItems={legendItems}
            chartImageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f341deacca44efbaf7ee4bc6868e08d35c29fd59bc40fbb233d07135deb07778?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
            periodIconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/244466fca9aa2befb8413d03cf438e99139a4e06a5002ddffbe6e5fc9bd9bde9?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          />
        )}
      </div>
    </div>
  ) : null;
};

export default OverviewPage;
