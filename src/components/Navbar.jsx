'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null); // Mock auth state

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-green-600">
        CommunityCare
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-green-500">Home</Link>
        <Link href="/events" className="hover:text-green-500">Upcoming Events</Link>
        
        {user ? (
          <div className="relative group flex items-center gap-2">
            <div className="relative">
              <img 
                src={user.photoURL || "/default-avatar.png"} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border cursor-pointer object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            
            {/* Hover Name & Dropdown */}
            <div className="absolute right-0 top-12 hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 w-48 border dark:border-gray-700">
              <span className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">{user.name}</span>
              <Link href="/create-event" className="text-sm py-1 hover:text-green-500">Create Event</Link>
              <Link href="/manage-events" className="text-sm py-1 hover:text-green-500">Manage Events</Link>
              <Link href="/joined-events" className="text-sm py-1 hover:text-green-500">Joined Events</Link>
              <button 
                onClick={() => setUser(null)} 
                className="mt-2 text-left text-sm text-red-500 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}