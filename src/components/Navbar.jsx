'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data, isPending } = useSession();
  const router = useRouter();
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // বাইরে কোথাও ক্লিক করলে ড্রপডাউন বন্ধ হয়ে যাবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  // ইউজারের নামের প্রথম অক্ষর বের করার ফাংশন (যেমন: "Tanvir" হলে "T")
  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-green-600">
        CommunityCare
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-green-500">Home</Link>
        <Link href="/events" className="hover:text-green-500">Upcoming Events</Link>
        
        {isPending ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ) : user ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              onClick={() => setIsOpen((prev) => !prev)} 
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="relative">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border object-cover pointer-events-none"
                  />
                ) : (
                  /* user.image না থাকলে নামের প্রথম বর্ণ দেখাবে */
                  <div className="w-10 h-10 rounded-full border border-green-500 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 font-bold flex items-center justify-center text-lg pointer-events-none">
                    {getInitial(user.name)}
                  </div>
                )}
                {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span> */}
              </div>
            </div>
            
            {/* ড্রপডাউন মেনু */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 shadow-xl rounded-md border dark:border-gray-700 p-3 flex flex-col z-50">
                <span className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 truncate border-b pb-1 dark:border-gray-700">
                  {user.name}
                </span>
                <Link 
                  href="/create-event" 
                  onClick={() => setIsOpen(false)} 
                  className="text-sm py-1.5 hover:text-green-500 transition"
                >
                  Create Event
                </Link>
                <Link 
                  href="/manage-events" 
                  onClick={() => setIsOpen(false)} 
                  className="text-sm py-1.5 hover:text-green-500 transition"
                >
                  Manage Events
                </Link>
                <Link 
                  href="/joined-events" 
                  onClick={() => setIsOpen(false)} 
                  className="text-sm py-1.5 hover:text-green-500 transition"
                >
                  Joined Events
                </Link>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }} 
                  className="mt-2 text-left text-sm text-red-500 font-medium py-1 hover:bg-red-50 dark:hover:bg-red-950/30 rounded px-1 transition"
                >
                  Logout
                </button>
              </div>
            )}
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