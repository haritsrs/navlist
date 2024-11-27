"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle, UserCircle } from "lucide-react";

// Floating Shapes Component (identical to TodoPage)
const FloatingShapes = () => {
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

const CategoryPage = () => {
  const [tasks, setTasks] = useState([]);
  const categories = ["Work", "Personal", "Study"];
  const username = localStorage.getItem("username") || "User";
  const router = useRouter();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const getTasksByCategory = (category) => {
    return tasks.filter((task) => task.category === category);
  };

  const getCategoryStats = (category) => {
    const categoryTasks = getTasksByCategory(category);
    const totalTasks = categoryTasks.length;
    const completedTasks = categoryTasks.filter(task => task.completed).length;
    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;
    
    return { totalTasks, completedTasks, completionRate };
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5 overflow-hidden">
      {/* Floating Shapes */}
      <FloatingShapes />

      <div className="flex justify-end items-center mb-6 gap-2">
        <span className="text-gray-800">Hello, {username}</span>
        <UserCircle className="h-8 w-8 text-gray-800" />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Task Categories</h1>
          <button
            onClick={handleBack}
            className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const { totalTasks, completedTasks, completionRate } = getCategoryStats(category);
            
            return (
              <div key={category} className="bg-[#F7F9F4] p-4 rounded-md shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
                  <div className="py-1.5 px-3 bg-[#9bbb98] text-white rounded text-sm">
                    {completedTasks}/{totalTasks} Tasks ({completionRate}%)
                  </div>
                </div>

                <ul className="space-y-3">
                  {getTasksByCategory(category).map((task) => (
                    <li 
                      key={task.id} 
                      className={`
                        bg-white p-3 rounded-md shadow-sm flex justify-between items-center
                        ${task.completed ? "opacity-50" : ""}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`text-gray-800 ${
                          task.completed ? 'line-through text-gray-500' : ''
                        }`}>
                          {task.text}
                        </span>
                      </div>
                      {task.completed && task.completedAt && (
                        <span className="text-sm text-gray-600">
                          Completed: {new Date(task.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </li>
                  ))}
                  {getTasksByCategory(category).length === 0 && (
                    <li className="bg-white p-3 rounded-md text-gray-600 text-center italic shadow-sm">
                      No tasks in this category
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;