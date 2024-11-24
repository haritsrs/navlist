"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // For regular navigation
import { useRouter } from "next/navigation"; // For programmatic navigation

const TodoPage = () => {
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [tasks, setTasks] = useState([]);
  const router = useRouter(); // Initialize router for programmatic navigation

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Add a new task and save it to local storage
  const addTask = () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    const task = {
      id: Date.now(),
      text: newTask,
      category,
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to local storage
    setNewTask("");
  };

  // Go back to the dashboard
  const handleBack = () => {
    router.push("/"); // Navigate to the dashboard page
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">To-Do List</h1>

      {/* Back Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleBack}
          className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Input for Adding Tasks */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="New Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-3 border rounded-md shadow-sm bg-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-md shadow-sm bg-white"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
        <button
          onClick={addTask}
          className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
        >
          Add Task
        </button>
      </div>

      {/* Display Tasks */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-[#F7F9F4] p-4 rounded-md shadow-md">
            <span className="text-gray-800">
              {task.text} <span className="text-sm text-gray-500">({task.category})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
