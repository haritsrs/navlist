"use client";

import React, { useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/components/auth';

const DashboardPage = () => {
  const router = useRouter();
  const { user, logout } = useAuth();  // Updated to get user and logout function

  useEffect(() => {
    if (!user) {
      router.push('/auth');  // Updated to match your auth route
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
      // You might want to show an error message to the user
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5]">
      {/* Profile Icon with User Email */}
      <div className="flex justify-end items-center p-5 gap-2">
        <span className="text-gray-800">{user?.email}</span>
        <UserCircle className="h-8 w-8 text-gray-800" />
      </div>

      {/* Menu Section */}
      <div className="p-5">
        <div className="bg-[#DCE3CB] rounded-lg p-5 w-64 space-y-6">
          {/* Homepage Navigation */}
          <section>
            <h2 className="text-gray-800 text-lg font-semibold mb-3">Homepage</h2>
            <div className="space-y-2">
              <Link href="/tasks-category" passHref>
                <button 
                  className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200"
                >
                  Tasks by Category
                </button>
              </Link>
              <Link href="/calendar" passHref>
                <button 
                  className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200"
                >
                  Calendar & Deadline
                </button>
              </Link>
            </div>
          </section>

          {/* Add & Manage Task Section */}
          <section>
            <h2 className="text-gray-800 text-lg font-semibold mb-3">Add & Manage Task(s)</h2>
            <Link href="/todo" passHref>
              <button 
                className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200"
              >
                Add Task
              </button>
            </Link>
          </section>

          {/* Account Settings Section */}
          <section>
            <h2 className="text-gray-800 text-lg font-semibold mb-3">Account Settings</h2>
            <Link href="/account" passHref>
              <button 
                className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200"
              >
                Profile
              </button>
            </Link>
          </section>

          {/* Log Out Section */}
          <section>
            <h2 className="text-gray-800 text-lg font-semibold mb-3">Log Out</h2>
            <button 
              onClick={handleLogout}
              className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200"
            >
              Log Out
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;