"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  onSnapshot
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase';

// Animated Background Component
const ProgressTrackerPageAnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] opacity-100"></div>
    <div
      className="absolute inset-0 bg-gradient-to-br from-[#9bbb98]/40 via-[#a5c4a5]/30 to-[#a5dba5]/20 animate-pulse opacity-50"
      style={{ animationDuration: "1s", animationIterationCount: "infinite" }}
    ></div>
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

const ProgressBar = ({ category, percentage, color, completedTasks, totalTasks }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-gray-700">{category}</span>
      <span className="text-gray-600">
        {percentage.toFixed(1)}% ({completedTasks}/{totalTasks} tasks)
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="h-4 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

const DonutChart = ({ data }) => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const strokeWidth = 40;
  let startAngle = 0;
  const total = data.reduce((sum, item) => sum + item.percentage, 0) || 100;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {data.map((item, index) => {
        const percentage = (item.percentage / total) * 100;
        const angle = (percentage / 100) * 360;
        const endAngle = startAngle + angle;

        const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
        const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
        const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
        const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);

        const largeArcFlag = angle > 180 ? 1 : 0;
        const pathData = [`M ${x1} ${y1}`, `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`].join(" ");

        startAngle += angle;

        return (
          <path
            key={index}
            d={pathData}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
          />
        );
      })}
      <circle cx={center} cy={center} r={radius - strokeWidth / 2} fill="white" />
    </svg>
  );
};

const ProgressTrackerPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState([
    { category: "Work", percentage: 0, color: "#ff4444", completedTasks: 0, totalTasks: 0 },
    { category: "Personal", percentage: 0, color: "#66cc66", completedTasks: 0, totalTasks: 0 },
    { category: "Study", percentage: 0, color: "#4444ff", completedTasks: 0, totalTasks: 0 }
  ]);
  const [recentTasks, setRecentTasks] = useState([]);

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

  // Subscribe to Firestore updates for tasks
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

      // Calculate progress data
      const updatedProgressData = progressData.map(category => {
        const categoryTasks = tasksData.filter(task => task.category === category.category);
        const completedTasks = categoryTasks.filter(task => task.completed).length;
        const totalTasks = categoryTasks.length;
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

        return { ...category, completedTasks, totalTasks, percentage };
      });

      setProgressData(updatedProgressData);

      // Update recent completed tasks
      const recentCompleted = tasksData
        .filter(task => task.completed)
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
        .slice(0, 5);
      
      setRecentTasks(recentCompleted);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5]">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <ProgressTrackerPageAnimatedBackground />
      <div className="p-5 relative z-10">
        <div className="text-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800 transition-transform transform hover:translate-x-0 hover:translate-y-1 animate-bounceOnHover"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="bg-white rounded-lg overflow-hidden max-w-2xl mx-auto relative z-10">
          <div className="bg-[#2F5233] p-4 rounded-t-lg">
            <h1 className="text-2xl font-bold text-white text-center">PROGRESS TRACKER</h1>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-48 h-48">
                <DonutChart data={progressData} />
              </div>
              <div className="flex-1 w-full">
                {progressData.map((item, index) => (
                  <ProgressBar
                    key={index}
                    category={item.category}
                    percentage={item.percentage}
                    color={item.color}
                    completedTasks={item.completedTasks}
                    totalTasks={item.totalTasks}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-black">Recently Completed Tasks</h2>
              <div className="space-y-2">
                {recentTasks.map(task => (
                  <div key={task.id} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">{task.text}</span>
                      <div className="text-sm text-gray-500">
                        <span className="mr-3">{task.category}</span>
                        {new Date(task.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scaleOnHover {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default ProgressTrackerPage;