"use client";

import { useState } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  console.log(session);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await updateUser(userData);

      if (error) {
        setMessage({ type: "error", text: error.message || "Update failed!" });
      } else {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong!" });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-medium">Please login in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-500 rounded-2xl shadow-md p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <Image 
            width={80}
            height={80}
            src={session.user.image || "https://via.placeholder.com/150"}
            alt={session.user.name || "User Avatar"}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
            unoptimized
            />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{session.user.name}</h1>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>

        {/* Status Message */}
        {message.text && (
          <div
            className={`mt-4 p-3 rounded-lg text-sm ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form using native onSubmit and FormData */}
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={session.user.name || ""}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <input
              type="url"
              name="image"
              defaultValue={session.user.image || ""}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Email (Read Only)
            </label>
            <input
              type="email"
              defaultValue={session.user.email || ""}
              disabled
              className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}