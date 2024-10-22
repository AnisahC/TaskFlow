"use client";
import React, { useState } from "react";

const AddTaskForm: React.FC = () => {
  // State variables for form fields
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("High"); // Default value
  const [category, setCategory] = useState("Meeting"); // Default value
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission

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

      // Clear the form after successful submission
      setSuccessMessage("Task added successfully!");
      setTitle("");
      setStartDate("");
      setEndDate("");
      setPriority("High");
      setCategory("Meeting");
      setDescription("");

      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };


  return (
    <section className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:max-w-full">
        <h1 className="self-start text-4xl font-bold leading-tight text-stone-900">
          Add Task
        </h1>
        <div className="flex shrink-0 mt-20 h-px bg-gray-100 max-md:mt-10 max-md:max-w-full" />
        
        {/* Display success message if it exists */}
        {successMessage && (
          <div
            className="mt-4 text-green-500 font-bold">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col pr-20 pl-8 mt-12 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-3.5 text-base leading-loose text-center text-stone-400 max-md:mr-1.5 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fcf485f2029ba0883430ac563b843f84a91530598e0af72044ef56348f39b02?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
              alt=""
              className="object-contain shrink-0 self-start aspect-square w-[43px]"
            />
            <input
              type="text"
              placeholder="Task name"
              className="grow px-3 pt-px pb-11 bg-white rounded-xl border-solid border-[1.304px] border-slate-800 w-fit max-md:px-5 max-md:max-w-full"
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
                  <label htmlFor="start-date" className="text-xl leading-loose text-center text-black">
                    Start
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    className="mt-3 max-w-full aspect-[6.29] w-[239px]"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                  <label htmlFor="priority" className="mt-6 text-xl leading-loose text-center text-black">
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="flex gap-10 justify-between items-center px-5 py-3 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-black border-solid border-[1.3px] text-zinc-700 mt-3"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <label htmlFor="description" className="mt-5 text-xl leading-loose text-center text-black">
                    Descriptions
                  </label>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-start max-md:mt-10">
                  <label htmlFor="end-date" className="text-xl leading-loose text-center text-black max-md:ml-2">
                    End
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    className="mt-3 max-w-full aspect-[5.95] w-[226px] max-md:ml-0.5"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                  <label htmlFor="category" className="mt-6 text-xl leading-10 text-center text-black">
                    Category
                  </label>
                  <select
                    id="category"
                    className="flex gap-10 justify-between items-center px-5 py-3 w-full text-xs font-medium tracking-wide bg-white rounded-lg border-black border-solid border-[1.3px] text-zinc-700 mt-3 max-md:ml-0.5"
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
          <textarea
            id="description"
            placeholder="Write something..."
            className="px-4 pt-2 pb-20 mt-6 ml-2.5 text-xl leading-loose text-left rounded-2xl border border-black border-solid bg-white bg-opacity-0 text-stone-400 max-md:pr-5 max-md:max-w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex gap-5 justify-between self-center mt-7 mb-6 max-w-full text-xl leading-loose text-center text-black w-[244px]">
            <button
              type="reset"
              className="z-10 px-5 pt-0 whitespace-nowrap rounded-lg bg-zinc-300 max-md:pl-5"
            >
              Clear
            </button>
            <button
              type="submit"
              className="z-10 px-3.5 pt-0 rounded-lg bg-stone-500"
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

