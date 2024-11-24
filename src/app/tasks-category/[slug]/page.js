"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Check, X, Calendar, Clock } from 'lucide-react';

const CategoryDetailPage = () => {
  const params = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [showCompleted, setShowCompleted] = useState(true);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem(`tasks-${params.slug}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [params.slug]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`tasks-${params.slug}`, JSON.stringify(tasks));
  }, [tasks, params.slug]);

  const categoryName = params.slug ? 
    params.slug.charAt(0).toUpperCase() + params.slug.slice(1) : 
    '';

  const getCategoryColor = (category) => {
    const colors = {
      work: "from-blue-100 to-blue-50",
      personal: "from-green-100 to-green-50",
      study: "from-purple-100 to-purple-50",
      health: "from-red-100 to-red-50",
      shopping: "from-yellow-100 to-yellow-50",
      others: "from-gray-100 to-gray-50"
    };
    return colors[category.toLowerCase()] || "from-gray-100 to-gray-50";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-red-500",
      medium: "text-yellow-500",
      low: "text-green-500"
    };
    return colors[priority] || "text-yellow-500";
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now(),
        title: newTask,
        completed: false,
        dueDate: dueDate,
        priority: priority,
        createdAt: new Date().toISOString(),
        category: params.slug
      };
      setTasks([newTaskItem, ...tasks]);
      setNewTask("");
      setDueDate("");
      setPriority("medium");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null } 
        : task
    ));
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Filter tasks based on completion status
  const filteredTasks = tasks.filter(task => showCompleted || !task.completed);

  // Sort tasks by priority and due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    
    // Then sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Finally sort by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5`}>
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link href="/category" className="inline-flex items-center text-gray-800 hover:text-gray-600 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className={`bg-gradient-to-r ${getCategoryColor(params.slug)} p-6 rounded-lg shadow-md mb-6`}>
          <h1 className="text-2xl font-semibold text-gray-800">{categoryName} Tasks</h1>
          <p className="text-gray-600 mt-2">
            {tasks.length} total tasks • {tasks.filter(t => t.completed).length} completed
          </p>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="space-y-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9bbb98]"
            />
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9bbb98]"
                />
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9bbb98]"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <button
                type="submit"
                className="bg-[#9bbb98] hover:bg-[#8aa987] text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Task
              </button>
            </div>
          </div>
        </form>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showCompleted" className="text-gray-700">
              Show completed tasks
            </label>
          </div>
          <div className="text-gray-600 text-sm">
            {sortedTasks.length} tasks shown
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {sortedTasks.map(task => (
            <div
              key={task.id}
              className={`bg-white rounded-lg shadow-sm p-4 ${
                task.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${task.completed ? 'bg-[#9bbb98] border-[#9bbb98]' : 'border-gray-300'}`}
                  >
                    {task.completed && <Check className="h-4 w-4 text-white" />}
                  </button>
                  <div className="flex-1">
                    <span className={task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}>
                      {task.title}
                    </span>
                    <div className="flex gap-4 mt-1 text-sm">
                      {task.dueDate && (
                        <span className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                      <span className={`flex items-center ${getPriorityColor(task.priority)}`}>
                        <Clock className="h-4 w-4 mr-1" />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 ml-4"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          {sortedTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
              No tasks yet. Add your first task!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;