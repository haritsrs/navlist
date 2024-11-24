"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const CategoryPage = () => {
  const [tasks, setTasks] = useState([]);
  const categories = ["Work", "Personal", "Study"];

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const getTasksByCategory = (category) => {
    return tasks.filter((task) => task.category === category);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Task Categories</h1>

      {/* Back to Todo List */}
      <div className="text-center mb-6">
        <Link href="/todo">
          <button className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800">
            Back to To-Do List
          </button>
        </Link>
      </div>

      {/* Display Tasks by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category} className="bg-[#F7F9F4] p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{category}</h2>
            <ul>
              {getTasksByCategory(category).map((task) => (
                <li key={task.id} className="text-gray-800 mb-2">
                  {task.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
