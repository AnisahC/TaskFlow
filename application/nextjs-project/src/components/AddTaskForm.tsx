"use client";
import React, { useState } from "react";

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [category, setCategory] = useState("Meeting");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask = {
      title,
      startDate,
      endDate,
      priority,
      category,
      description,
    };

    try {
      console.log("Adding task:", newTask);
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const data = await response.json();
      console.log("Task added successfully:", data);

      setSuccessMessage("Task added successfully!");
      setTitle("");
      setStartDate("");
      setEndDate("");
      setPriority("High");
      setCategory("Meeting");
      setDescription("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <section className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:max-w-full">
        <h1 className="self-start text-4xl font-bold leading-tight text-green-700">
          Add Task
        </h1>
        {/* <div className="flex shrink-0 mt-10 h-px bg-pink-200 max-md:mt-10 max-md:max-w-full" /> */}

        {successMessage && (
          <div className="mt-4 text-green-500 font-bold">{successMessage}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col pr-20 pl-8 mt-12 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          <div className="flex flex-wrap gap-2 text-md leading-loose text-center text-green-700 max-md:mr-1.5 w-1/2 max-md:max-w-full">
            <input
              type="text"
              placeholder="Task name"
              className="grow px-2 py-1 bg-pink-50 rounded-lg border border-green-300 w-24 max-md:w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Task name"
              required
            />
          </div>
          <div className="mt-2.5 ml-3 max-w-full w-[597px]">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow items-start max-md:mt-10">
                  <label
                    htmlFor="start-date"
                    className="text-xl leading-loose text-center text-green-700"
                  >
                    Start
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    className="mt-3 max-w-full aspect-[6.29] w-[239px] border border-green-300 rounded-lg"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="priority"
                    className="mt-6 text-xl leading-loose text-center text-green-700"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="flex gap-10 justify-between items-center px-5 py-3 w-full text-xs font-medium tracking-wide bg-pink-50 rounded-lg border-green-300 border-solid border-[1.3px] text-green-700 mt-3"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-start max-md:mt-10">
                  <label
                    htmlFor="end-date"
                    className="text-xl leading-loose text-center text-green-700 max-md:ml-2"
                  >
                    End
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    className="mt-3 max-w-full aspect-[5.95] w-[226px] max-md:ml-0.5 border border-green-300 rounded-lg"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="category"
                    className="mt-6 text-xl leading-10 text-center text-green-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="flex gap-10 justify-between items-center px-5 py-3 w-full text-xs font-medium tracking-wide bg-pink-50 rounded-lg border-green-300 border-solid border-[1.3px] text-green-700 mt-3 max-md:ml-0.5"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="Academic">Academic</option>
                    <option value="Personal">Personal</option>
                    <option value="Meal">Meal</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="description"
            className="mt-5 ml-3 text-xl leading-loose text-start text-green-700"
          >
            Descriptions
          </label>
          <textarea
            id="description"
            placeholder="Write something..."
            className="px-4 pt-2 pb-20 mt-6 ml-2.5 text-xl leading-loose text-left rounded-2xl border border-green-300 bg-pink-50 text-green-700 max-md:pr-5 max-md:max-w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex gap-5 justify-between self-center mt-7 mb-6 max-w-full text-xl leading-loose text-center w-[244px]">
            <button
              type="reset"
              className="z-10 px-5 pt-0 whitespace-nowrap rounded-lg bg-pink-100 hover:bg-pink-200 text-green-700"
            >
              Clear
            </button>
            <button
              type="submit"
              className="z-10 px-3.5 pt-0 rounded-lg bg-green-700 hover:bg-green-800 text-white"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTaskForm;
