"use client";

import React, { useState, useEffect } from "react";
import { User, Mail } from "lucide-react";
import { useAuth } from "@/app/components/auth";

const AccountPage = () => {
  const { user } = useAuth();
  const [editingSection, setEditingSection] = useState(null);
  const [message, setMessage] = useState({ type: "", content: "" });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, section) => {
    e.preventDefault();
    try {
      if (section === "password") {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        // Implement password change logic
      } else if (section === "profile") {
        localStorage.setItem("username", formData.displayName);
      }

      setMessage({ type: "success", content: "Changes saved successfully!" });
      setEditingSection(null);
    } catch (error) {
      setMessage({ type: "error", content: error.message });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#9bbb98] via-[#a5c4a5] to-[#a5dba5] p-5 animate-fadeIn bg-animated">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slideIn">Account Settings</h1>

      <div className="text-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800 transition-transform transform hover:translate-x-0 hover:translate-y-1 animate-bounceOnHover"
        >
          Back to Dashboard
        </button>
      </div>

      {message.content && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          } animate-messageFadeIn`}
        >
          {message.content}
        </div>
      )}

      <form className="max-w-2xl mx-auto bg-[#F7F9F4] p-6 rounded-md shadow-md animate-formSlideIn">
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
                  } animate-inputFocus`}
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
                  className="w-full p-3 border rounded-md shadow-sm bg-white text-black animate-inputFocus"
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
                  className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 animate-bounceOnHover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, "profile")}
                  className="ml-2 py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800 animate-bounceOnHover"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditingSection("profile")}
                className="py-2 px-4 bg-[#F7F9F4] hover:bg-[#e0e4d4] rounded text-gray-800 animate-bounceOnHover"
              >
                Edit Profile
              </button>
            )}
          </div>
        </section>
      </form>

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
        @keyframes inputFocus {
          from { border-color: #e0e4d4; }
          to { border-color: #9bbb98; }
        }
        @keyframes bounceOnHover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes messageFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bgAnimate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
        .animate-inputFocus {
          animation: inputFocus 0.3s ease-in-out;
        }
        .animate-bounceOnHover:hover {
          animation: bounceOnHover 0.5s ease-in-out;
        }
        .animate-messageFadeIn {
          animation: messageFadeIn 0.5s ease-in;
        }
        .bg-animated {
          background-size: 200% 200%;
          animation: bgAnimate 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AccountPage;
