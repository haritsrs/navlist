"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Animated Background Component (Now a static component)
const CalendarPageAnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] opacity-100"></div>

      {/* Animated Layers */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#9bbb98]/40 via-[#a5c4a5]/30 to-[#a5dba5]/20 animate-pulse opacity-50"
        style={{
          animationDuration: "1s",
          animationIterationCount: "infinite",
        }}
      ></div>

      {/* Floating Organic Shapes */}
      {[...Array(15)].map((_, index) => (
        <div
          key={index}
          className={`absolute bg-white/10 rounded-full blur-sm floating-shape floating-shape-${index}`}
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const CalendarPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "event" });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    // Try to get tasks from both Todo page and calendar page storage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || 
                       JSON.parse(localStorage.getItem("calendarTasks")) || 
                       [];
    setTasks(savedTasks);
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const formatDate = (date) => {
    const localDate = new Date(date);
    return localDate.toLocaleDateString();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const addEvent = () => {
    if (!newEvent.title.trim()) {
      alert("Event title cannot be empty!");
      return;
    }

    const event = {
      id: Date.now(),
      text: newEvent.title,
      deadline: newEvent.date,
      type: "event",
      createdAt: new Date().toISOString(),
      completed: false,
      category: "Event"
    };

    const updatedTasks = [...tasks, event];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("calendarTasks", JSON.stringify(updatedTasks));
    setShowEventForm(false);
    setNewEvent({ title: "", date: "", type: "event" });
  };

  const handleDateClick = (date) => {
    const tasksForDate = tasks.filter(
      (task) => {
        const taskDate = task.deadline ? new Date(task.deadline) : null;
        return taskDate && formatDate(taskDate) === formatDate(date);
      }
    );
    
    setSelectedDate(date);
    setSelectedDateTasks(tasksForDate);
    setIsTaskModalOpen(true);
  };

  const renderMiniCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = formatDate(date);
      const isToday = today.toLocaleDateString() === date.toLocaleDateString();
      const hasItems = tasks.some(
        (task) => task.deadline && formatDate(new Date(task.deadline)) === dateString
      );

      days.push(
        <div
          key={day}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm text-black
            ${isToday ? "bg-green-800 text-white" : ""} 
            ${hasItems && !isToday ? "bg-green-100" : ""} cursor-pointer hover:bg-green-200`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const getUpcomingItems = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks
      .filter((item) => {
        const itemDate = new Date(item.deadline);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate >= today && !item.completed;
      })
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  };

  const formatItemDate = (item) => {
    const date = new Date(item.deadline);
    return date.toLocaleDateString();
  };

  const getItemColor = (item) => {
    if (item.type === "event") return "bg-blue-700";
    switch (item.category) {
      case "Work":
        return "bg-red-700";
      case "Personal":
        return "bg-green-700";
      case "Study":
        return "bg-blue-700";
      default:
        return "bg-green-700";
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("calendarTasks", JSON.stringify(updatedTasks));
    
    // Update selected date tasks if needed
    const updatedSelectedDateTasks = selectedDateTasks.filter((task) => task.id !== taskId);
    setSelectedDateTasks(updatedSelectedDateTasks);
  };

  return (
    <div className="relative min-h-screen">
      <CalendarPageAnimatedBackground />

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => router.push("/todo")}
            className="py-2 px-4 bg-[#9bbb98] hover:bg-[#8aa989] text-white rounded"
          >
            To-Do List
          </button>
        </div>

        {/* Box Container with Background Gradient */}
        <div className="bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-10 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-white mb-10 text-center">KALENDER</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Upcoming Items Section */}
            <div className="bg-[#e8f0e8] rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-black">
                Upcoming Tasks & Event Deadlines
              </h2>
              <div className="space-y-4">
                {getUpcomingItems().map((item) => (
                  <div
                    key={item.id}
                    className={`${getItemColor(item)} text-white p-4 rounded-lg`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.text}</span>
                        <span className="text-xs ml-2 bg-white bg-opacity-20 px-2 py-1 rounded">
                          {item.type === "event" ? "Event" : item.category}
                        </span>
                      </div>
                      <span className="text-sm text-white">{formatItemDate(item)}</span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowEventForm(true)}
                  className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Mini Calendar Section */}
            <div className="bg-white rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="py-2 px-4 bg-green-700 text-white rounded-lg"
                >
                  &lt;
                </button>
                <span className="text-xl font-semibold">{`${currentDate.toLocaleString("default", {
                  month: "long",
                })} ${currentDate.getFullYear()}`}</span>
                <button
                  onClick={handleNextMonth}
                  className="py-2 px-4 bg-green-700 text-white rounded-lg"
                >
                  &gt;
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">{renderMiniCalendar()}</div>
            </div>
          </div>

          {/* Task Modal for Selected Date */}
          {isTaskModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    Tasks for {selectedDate.toLocaleDateString()}
                  </h2>
                  <button
                    onClick={() => setIsTaskModalOpen(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>

                {selectedDateTasks.length === 0 ? (
                  <p className="text-gray-500">No tasks for this date.</p>
                ) : (
                  <ul className="space-y-4">
                    {selectedDateTasks.map((task) => (
                      <li 
                        key={task.id} 
                        className={`
                          p-4 rounded-lg 
                          ${getItemColor(task)}
                          text-white
                        `}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{task.text}</span>
                            <span className="text-xs ml-2 bg-white bg-opacity-20 px-2 py-1 rounded">
                              {task.type === "event" ? "Event" : task.category}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-white hover:text-red-200"
                          >
                            🗑️
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Event Form Modal */}
          {showEventForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Add New Event</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-3 border rounded-md"
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowEventForm(false)}
                      className="py-2 px-4 bg-gray-200 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addEvent}
                      className="py-2 px-4 bg-green-700 text-white rounded-md"
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;