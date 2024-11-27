"use client";

import React, { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/auth"; // Update this import path as needed
import './globals.css';

const DashboardAnimatedBackground = () => {
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


const DashboardPage = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if user is not authenticated
    } else {
      // Retrieve the username from local storage
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername); // Use the saved username if available
      } else {
        // Fallback to email prefix if username is not stored
        setUsername(user?.email.split("@")[0]);
      }
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Animated Background */}
      <DashboardAnimatedBackground />

      {/* Dashboard Content - Positioned above background */}
      <div className="relative z-10">
        <div className="flex justify-end items-center p-5 gap-2">
          <span className="text-gray-800">Hello, {username}</span>
          <UserCircle className="h-8 w-8 text-gray-800" />
        </div>

        <div className="p-5">
          <div className="bg-[#DCE3CB] rounded-lg p-5 w-64 space-y-6">
            <section>
              <h2 className="text-gray-800 text-lg font-semibold mb-3">Homepage</h2>
              <div className="space-y-2">
                <Link href="/tasks-category" passHref>
                  <button className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200">
                    Tasks by Category
                  </button>
                </Link>
                <Link href="/calendar" passHref>
                  <button className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200">
                    Calendar & Deadline
                  </button>
                </Link>
                <Link href="/progresstracker" passHref>
                  <button className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200">
                    Progress Tracker
                  </button>
                </Link>
              </div>
            </section>

            {/* Add & Manage Task Section */}
            <section>
              <h2 className="text-gray-800 text-lg font-semibold mb-3">Add & Manage Task(s)</h2>
              <Link href="/todo" passHref>
                <button className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200">
                  Add Task
                </button>
              </Link>
            </section>

            {/* Account Settings Section */}
            <section>
              <h2 className="text-gray-800 text-lg font-semibold mb-3">Account Settings</h2>
              <Link href="/account" passHref>
                <button className="w-full py-2.5 px-3 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-left text-gray-800 text-base transition-colors duration-200">
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
    </div>
  );
};

export default DashboardPage;
