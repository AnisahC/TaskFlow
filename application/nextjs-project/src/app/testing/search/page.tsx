"use client";
import React, { useState } from 'react';

const TaskSearch = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // Ensure it's always an array

  const handleSearch = () => {
    let query = `?title=${title}&category=${category}`;
    fetch(`/api/tasks/search${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Check the data from the API
        // Ensure that 'data' is an array
        if (Array.isArray(data)) {
          setSearchResults(data);
        } else {
          setSearchResults([]); // Fallback to empty array if not
        }
      })
      .catch((error) => console.error('Error searching tasks:', error));
  };

  return (
    <div style={{marginLeft: '20px'}}>
      <h2 style={{marginBottom: '20px', marginTop: '20px'}}>Search Tasks</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.length > 0 ? (
          searchResults.map((task) => (
            <li key={task._id} style={{marginTop: '20px'}}>
              <strong>{task.title}</strong>
              <p>Start Date: {task.startDate}</p>
              <p>End Date: {task.endDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
              <p>Description: {task.description}</p>
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskSearch;


