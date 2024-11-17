"use client";
import React, { useEffect, useState } from "react";
import { Task } from "@/components/TaskCard/types";
import { Modak } from "next/font/google";
// Constants for days and months
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
const modak = Modak({
  subsets: ["latin"],
  weight: "400",
});
const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Function to get the days in the month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Fill in dates for the calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const dates: (number | null)[] = Array.from<number | null>({
    length: firstDayOfMonth,
  })
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  useEffect(() => {
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
  }, [currentDate]);

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  // Function to check if a task falls on a specific date
  const isTaskOnDate = (task: Task, date: Date) => {
    const taskStartDate = parseDate(task.startDate);
    const taskEndDate = parseDate(task.endDate);

    // Ignore the time part of the date
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return dateOnly >= taskStartDate && dateOnly <= taskEndDate;
  };

  // Function to handle month change
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentDate(new Date(year, newMonth, 1));
  };

  // Function to handle year change
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, month, 1));
  };

  return (
    <div className="w-4/5 max-h-full mx-auto p-10">
      {/* Month and Year with Navigation */}
      <div className="flex justify-between items-center mb-4">
        {/* Display selected month and year */}
        <div
          className={`text-center text-5xl font-extrabold text-blue-300 mb-6 ${modak.className}`}
        >
          {monthNames[month]} {year}
        </div>

        <div className="flex items-center text-xs space-x-4">
          <div className="flex items-center">
            <label htmlFor="month" className="mr-2 text-gray-700 font-medium">
              Month:
            </label>
            <select
              id="month"
              value={month}
              onChange={handleMonthChange}
              className="border border-gray-300 rounded-lg p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              className="border border-gray-300 rounded-lg p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
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

      {/* Days of the Week Header */}
      <div className="grid grid-cols-7 text-center text-gray-700 font-medium">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 font-bold">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 text-center gap-0 border-t border-l">
        {dates.map((date, index) => {
          const currentDate = new Date(year, month, date || 1);
          return (
            <div
              key={index}
              className="border-r border-b p-2 flex flex-col items-start justify-start aspect-square overflow-y-auto"
            >
              {/* Date number */}
              <span
                className={`text-lg font-semibold ${
                  date ? "" : "text-transparent"
                }`}
              >
                {date !== null ? date : ""}
              </span>

              {/* Tasks for the current date */}
              {tasks
                .filter((task) => isTaskOnDate(task, currentDate))
                .map((task, taskIndex) => {
                  const Color =
                    task.priority === "High"
                      ? "bg-red-200"
                      : task.priority === "Medium"
                      ? "bg-yellow-200"
                      : task.priority === "Low"
                      ? "bg-green-200"
                      : "bg-gray-200"; // Default for no specific priority

                  return (
                    <div
                      key={taskIndex}
                      className={`mt-1 text-xs px-2 py-1 rounded-md w-full ${Color}`}
                    >
                      {task.title}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
