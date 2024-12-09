"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import PointsCard from "@/components/PointsCard";
import RecentlyFinishedCard from "@/components/RecentlyFinishedCard";
import { NavigationBar } from "@/components/NavigationBar";
import AddTask from "@/components/AddTaskForm";
import Quotes from "@/components/Quotes";

const AddTasksLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <NavigationBar
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/99e2affc11fdcfd002cdd03b4d6a47513b789117f146d1a8b312a2f0889246d4?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
        notificationIconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7e3b568c50d2970935b77846b25403c02e3a6f03019b8f1d9178cf749038cee4?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
      />
      <div className="w-full max-md:max-w-full">
        <div className="flex max-md:flex-col">
          <Sidebar />
          <main className="flex flex-col ml-5 w-full max-md:ml-0 ">
            <div className="mt-10 max-md:mt-5 max-md:max-w-full">
              <div className="flex flex-row max-md:flex-col">
                {children}

                <aside className="flex flex-col w-[35%] ml-auto max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col mt-44 mr-6 max-md:mt-10">
                    <Quotes />
                    <br></br>
                    <PointsCard />
                    <RecentlyFinishedCard />
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddTasksLayout;
