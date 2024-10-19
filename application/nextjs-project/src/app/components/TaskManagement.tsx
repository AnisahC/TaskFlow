import React from "react";
import Sidebar from "./Sidebar";
import AddTaskForm from "./AddTaskForm";
import PointsCard from "./PointsCard";
import RecentlyFinishedCard from "./RecentlyFinishedCard";

const TaskManagement: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f18264395bb134e2b567045ad7f423b160dccf49c8f5e6a675923c0ad6375d39?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
        alt=""
        className="object-contain w-full aspect-[14.71] max-md:max-w-full"
      />
      <div className="w-full max-md:max-w-full">
        <div className="flex max-md:flex-col">
          <Sidebar />
          <main className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
            <div className="mt-20 max-md:mt-10 max-md:max-w-full">
              <div className="flex max-md:flex-col">
                <AddTaskForm />
                <aside className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col mt-44 mr-6 max-md:mt-10">
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

export default TaskManagement;
