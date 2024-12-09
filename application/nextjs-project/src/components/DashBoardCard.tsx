"use client";
import React, { useState } from "react";
import { ChartCardProps, Task } from "./types";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DashBoardCard: React.FC<ChartCardProps> = ({
  tasks,
  legendItems,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Function to handle month change
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentDate(new Date(year, newMonth, 1));
    const { labels, values, inprogress, completed } =
      tasks.length > 0
        ? filterTasksByMonthAndYear(tasks, month, year)
        : { labels: [], values: [], inprogress: 0, completed: 0 };
  };

  // Function to handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, month, 1));
    const { labels, values, inprogress, completed } =
      tasks.length > 0
        ? filterTasksByMonthAndYear(tasks, month, year)
        : { labels: [], values: [], inprogress: 0, completed: 0 };
  };

  const filterTasksByMonthAndYear = (
    tasks: Task[],
    month: number,
    year: number
  ): {
    labels: string[];
    values: number[];
    inprogress: number;
    completed: number;
    filteredTasks: Task[];
  } => {
    const filteredTasks = tasks.filter((task) => {
      const taskDate = new Date(task.startDate);
      return taskDate.getMonth() === month && taskDate.getFullYear() === year;
    });

    const priorityCounts: { [priority: string]: number } = {};
    const inprogress = filteredTasks.filter(
      (task) => task.isCompleted === false
    ).length;
    const completed = filteredTasks.filter(
      (task) => task.isCompleted === true
    ).length;
    filteredTasks.forEach((task) => {
      if (!priorityCounts[task.priority]) {
        priorityCounts[task.priority] = 0;
      }
      priorityCounts[task.priority]++;
    });

    const labels = Object.keys(priorityCounts);
    const values = labels.map((label) => priorityCounts[label]);

    return { labels, values, inprogress, completed, filteredTasks };
  };

  const { labels, values, inprogress, completed, filteredTasks } =
    tasks.length > 0
      ? filterTasksByMonthAndYear(tasks, month, year)
      : {
          labels: [],
          values: [],
          inprogress: 0,
          completed: 0,
          filteredTasks: [],
        };

  const chartData: ChartData<"pie", number[], string> = {
    labels: labels,
    datasets: [
      {
        label: "proportion",
        data: values,
        backgroundColor: ["#40916c", "#52b788", "#95d5b2"],
        hoverBackgroundColor: ["#ff8fab", "#ffb3c6", "#fae0e4"],
      },
    ],
  };

  return (
    <div className="flex relative overflow-hidden flex-col flex-1 px-6 pt-4 pb-6 w-full bg-transparent rounded border-none">
      <div className="flex pb-2 w-full font-medium text-black">
        {/* <div className="flex flex-1 shrink gap-10 justify-center self-stretch text-base bg-white basis-0 min-h-[24px]">
          <div className="whitespace-nowrap text-2xl">Statistical Table</div>
        </div> */}
      </div>
      <div className="gap-2.5 self-stretch w-full text-lg tracking-tighter font-bold whitespace-nowrap mb-1">
        {inprogress} <span className="text-green-600 mr-5">in progress</span>
        {completed} <span className="text-pink-400 mr-5">completed</span>
      </div>
      <div className="gap-2.5 self-start text-base text-gray-500">
        {filteredTasks.length} tasks in {monthNames[month]} {year}
      </div>
      <div className="flex flex-1 gap-2.5 p-2.5 bg-transparent size-full">
        {filteredTasks.length > 0 ? (
          <div className="w-1/2 h-1/2 mx-auto mb-10">
            <Pie data={chartData} />
          </div>
        ) : (
          <div className="flex flex-col flex-1 shrink justify-center items-center p-2.5 basis-0">
            <p>No tasks available for the selected period.</p>
          </div>
        )}
        {/* select month and year */}
        <div className="absolute bottom-4 right-4 flex flex-row items-end text-xs space-y-2 gap-3">
          <div className="flex items-center">
            <label htmlFor="month" className="mr-2 text-gray-700 font-medium">
              Month:
            </label>
            <select
              id="month"
              value={month}
              onChange={handleMonthChange}
              className="border border-gray-300 rounded-lg p-1 bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {monthNames.map((monthName, index) => (
                <option key={index} value={index}>
                  {monthName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="year" className="mr-2 text-gray-700 font-medium">
              Year:
            </label>
            <select
              id="year"
              value={year}
              onChange={handleYearChange}
              className="border border-gray-300 rounded-lg p-1 bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {Array.from({ length: 10 }, (_, i) => year - 5 + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
