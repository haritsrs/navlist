"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Floating Shapes Component
const FloatingShapes = () => {
  // Generate random shapes only once when the component is mounted
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const shapesArray = [...Array(15)].map(() => {
      const randomWidth = Math.random() * 150 + 50;
      const randomHeight = Math.random() * 150 + 50;
      const randomTop = Math.random() * 100;
      const randomLeft = Math.random() * 100;
      return {
        width: `${randomWidth}px`,
        height: `${randomHeight}px`,
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
      };
    });
    setShapes(shapesArray);
  }, []);

  return (
    <>
      {shapes.map((style, index) => (
        <div
          key={index}
          className={`absolute bg-white/10 rounded-full blur-lg floating-shape`}
          style={style}
        ></div>
      ))}
    </>
  );
};

const TodoPage = () => {
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    const task = {
      id: Date.now(),
      text: newTask,
      category,
      completed: false,
      completedAt: null,
      deadline: deadline || null,
      type: "task",
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setNewTask("");
    setDeadline("");
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : null,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const sortedAndFilteredTasks = () => {
    // Sort tasks by deadline, then by creation date
    const sortedTasks = [...tasks].sort((a, b) => {
      // Tasks without deadline go to the end
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      
      return new Date(a.deadline) - new Date(b.deadline);
    });

    // Filter tasks based on filter state
    return sortedTasks.filter(task => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });
  };

  const isTaskOverdue = (task) => {
    if (!task.deadline || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(task.deadline);
    return deadlineDate < today;
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5 overflow-hidden">
      {/* Floating Shapes */}
      <FloatingShapes />

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">To-Do List</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Task Input */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="New Task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-3 border rounded-md shadow-sm bg-white min-w-[200px]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-md shadow-sm bg-white text-black"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-3 border rounded-md shadow-sm bg-white text-black"
          />
          <button
            onClick={addTask}
            className="py-2 px-4 bg-[#9bbb98] hover:bg-[#8aa989] text-white rounded-md"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`py-2 px-4 rounded-md ${filter === "all" ? "bg-[#9bbb98] text-white" : "bg-gray-200"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`py-2 px-4 rounded-md ${filter === "active" ? "bg-[#9bbb98] text-white" : "bg-gray-200"}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`py-2 px-4 rounded-md ${filter === "completed" ? "bg-[#9bbb98] text-white" : "bg-gray-200"}`}
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {sortedAndFilteredTasks().map((task) => (
            <li 
              key={task.id} 
              className={`
                bg-[#F7F9F4] p-4 rounded-md shadow-md flex justify-between items-center
                ${isTaskOverdue(task) ? "border-2 border-red-400" : ""}
                ${task.completed ? "opacity-50" : ""}
              `}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="form-checkbox h-5 w-5"
                />
                <div>
                  <span className={`text-gray-800 ${task.completed ? "line-through" : ""}`}>
                    {task.text}
                  </span>
                  {task.deadline && (
                    <div className={`text-xs ${isTaskOverdue(task) ? "text-red-500" : "text-gray-500"}`}>
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                      {isTaskOverdue(task) && " (Overdue)"}
                    </div>
                  )}
                  <span className="text-xs text-gray-500 ml-2">{task.category}</span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="py-2 px-4 bg-red-400 hover:bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;