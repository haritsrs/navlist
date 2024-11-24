"use client";

import React, { useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/components/auth';  // Import your existing auth context

const DashboardPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();  // Get authentication status from your auth context

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5]">
      {/* Profile Icon */}
      <div className="flex justify-end p-5">
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
            <Link href="/login" passHref>
              <button 
                className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200"
              >
                Log Out
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;