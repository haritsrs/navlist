// app/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

export default function Dashboard() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && mounted) {
        router.push('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [mounted]);

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  const getDaysInMonth = (date) => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];
    
    // Add empty days for padding
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add the actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="max-w-6xl mx-auto bg-gray-100 rounded-lg p-6 grid grid-cols-3 gap-6"
           style={{
             backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.6))`,
           }}>
        
        {/* Profile Section */}
        <div className="space-y-4">
          <div className="text-2xl">👤</div>
        </div>

        {/* Todo List Section */}
        <div className="bg-[#c8d6b9] rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-bold text-center">TO - DO LIST</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">TUGAS PROJECT PBW</p>
              <div className="w-10 h-2 bg-red-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">TUGAS GRAF & ANALISIS ALGORITMA</p>
              <div className="w-10 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-3">
          <button className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            KATEGORI 1
          </button>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            KATEGORI 2
          </button>
          <button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            KATEGORI 3
          </button>
        </div>

        {/* Calendar Section */}
        <div className="col-span-2 bg-[#c8d6b9] rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-200 rounded-full">←</button>
            <h3 className="font-bold">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-200 rounded-full">→</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-bold text-sm py-1">
                {day}
              </div>
            ))}
            
            {getDaysInMonth(currentMonth).map((date, i) => {
              if (!date) {
                return <div key={`empty-${i}`} className="p-1"></div>;
              }
              const isToday = new Date().toDateString() === date.toDateString();
              return (
                <div
                  key={i}
                  className={`p-1 text-sm rounded ${
                    isToday ? 'bg-[#344C3D] text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}