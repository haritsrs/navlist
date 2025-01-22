"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { 
  collection, 
  query, 
  onSnapshot,
  where,
  orderBy 
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
          className="absolute bg-white/10 rounded-full blur-sm floating-shape animate-floatingShape"
          style={style}
        ></div>
      ))}
    </>
  );
};

const CategoryPage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const categories = ["Work", "Personal", "Study"];
  const router = useRouter();

  // Check authentication
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      {/* Floating Shapes Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#9bbb98]/40 via-[#a5c4a5]/30 to-[#a5dba5]/20 animate-pulse opacity-50"></div>
        <FloatingShapes />
      </div>

      {/* Back to Dashboard Button */}
      <button
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800 animate-bounceOnHover"
      >
        Back to Dashboard
      </button>

      {/* Main Content */}
      <div className="w-[90%] max-w-[1200px] mx-auto bg-white rounded-lg shadow-lg p-6 relative z-10 animate-formSlideIn">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Task Categories</h1>
          {user && (
            <div className="text-gray-600">
              {user.email}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const { totalTasks, completedTasks, completionRate } = getCategoryStats(category);
            
            return (
              <div key={category} className="bg-[#F7F9F4] p-4 rounded-md shadow-md animate-categoryCard">
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
                      className={`bg-white p-3 rounded-md shadow-sm flex justify-between items-center
                        ${task.completed ? "opacity-50" : ""}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`text-gray-800 ${task.completed ? 'line-through text-gray-500' : ''}`}>
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

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes formSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounceOnHover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes categoryCard {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes floatingShape {
          0% { opacity: 0.3; transform: scale(0.5); }
          25% { opacity: 0.6; transform: scale(0.75); }
          50% { opacity: 0.9; transform: scale(1); }
          75% { opacity: 0.6; transform: scale(0.75); }
          100% { opacity: 0.3; transform: scale(0.5); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        .animate-formSlideIn {
          animation: formSlideIn 0.5s ease-out;
        }
        .animate-bounceOnHover:hover {
          animation: bounceOnHover 0.5s ease-in-out;
        }
        .animate-categoryCard {
          animation: categoryCard 0.5s ease-in;
        }
        .animate-floatingShape {
          animation: floatingShape 2s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;