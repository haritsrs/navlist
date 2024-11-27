"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "@/app/components/auth"; // Assuming useAuth hook is available

const AccountPage = () => {
  const { user } = useAuth(); // Get user info from authentication hook
  const [editingSection, setEditingSection] = useState(null); // Track section being edited (profile/password)
  const [message, setMessage] = useState({ type: "", content: "" }); // Message for success/error notifications

  // State to hold form data
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const isGoogleUser = user?.providerData?.some(
    (provider) => provider.providerId === "google.com"
  );

  // Update form data whenever user info changes
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // Handle input changes for all form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (both profile and password sections)
  const handleSubmit = async (e, section) => {
    e.preventDefault();
    try {
      if (section === "password") {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        // Call API or update password logic
      } else if (section === "profile") {
        // Update localStorage with new username
        localStorage.setItem("username", formData.displayName);
      }

      setMessage({ type: "success", content: "Changes saved successfully!" });
      setEditingSection(null); // Reset editing state after success
    } catch (error) {
      setMessage({ type: "error", content: error.message });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Account Settings</h1>

      <div className="text-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
        >
          Back to Dashboard
        </button>
      </div>

      {message.content && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message.content}
        </div>
      )}

      <form className="max-w-2xl mx-auto bg-[#F7F9F4] p-6 rounded-md shadow-md">
        {/* Profile Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  disabled={editingSection !== "profile"}
                  className={`w-full p-3 border rounded-md shadow-sm bg-white text-black ${
                    editingSection === "profile" && formData.displayName.trim() === "" ? "border-red-500" : ""
                  }`}
                />
                {editingSection === "profile" && formData.displayName.trim() === "" && (
                  <span className="text-red-500 text-sm">Display name cannot be empty</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={editingSection !== "profile"}
                  className="w-full p-3 border rounded-md shadow-sm bg-white text-black"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            {editingSection === "profile" ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, "profile")}
                  className="ml-2 py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditingSection("profile")}
                className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800"
              >
                Edit Profile
              </button>
            )}
          </div>
        </section>
      </form>
    </div>
  );
};

export default AccountPage;
