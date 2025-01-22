"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  collection, 
  addDoc, 
  deleteDoc,
  updateDoc,
  doc,
  query,
  onSnapshot,
  orderBy,
  where
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase';

// Floating Shapes Component
const FloatingShapes = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const shapesArray = [...Array(15)].map(() => ({
      width: `${Math.random() * 150 + 50}px`,
      height: `${Math.random() * 150 + 50}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Subscribe to Firestore updates
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  const addTask = async () => {
    if (!newTask.trim() || !user) {
      alert("Task cannot be empty!");
      return;
    }

    try {
      const task = {
        text: newTask,
        category,
        completed: false,
        completedAt: null,
        deadline: deadline || null,
        type: "task",
        createdAt: new Date().toISOString(),
        userId: user.uid,
      };

      await addDoc(collection(db, 'tasks'), task);
      setNewTask("");
      setDeadline("");
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const deleteTask = async (taskId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    if (!user) return;

    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        completed: !currentStatus,
        completedAt: !currentStatus ? new Date().toISOString() : null,
      });
    } catch (error) {
      console.error("Error updating task: ", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const sortedAndFilteredTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    });

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5 overflow-hidden">
      <FloatingShapes />
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">To-Do List</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => window.history.back()}
          className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800 transition-transform transform hover:translate-x-0 hover:translate-y-1 animate-bounceOnHover"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-4 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="New Task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="text-black flex-grow p-3 border rounded-md shadow-sm bg-white min-w-[200px]"
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

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`py-2 px-4 rounded-md ${filter === "all" ? "bg-[#9bbb98] text-white" : "bg-gray-200 text-black"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`py-2 px-4 rounded-md ${filter === "active" ? "bg-[#9bbb98] text-white" : "bg-gray-200 text-black"}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`py-2 px-4 rounded-md ${filter === "completed" ? "bg-[#9bbb98] text-white" : "bg-gray-200 text-black"}`}
          >
            Completed
          </button>
        </div>

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
                  onChange={() => toggleTaskCompletion(task.id, task.completed)}
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