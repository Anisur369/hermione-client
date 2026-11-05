'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/logo.png';

export default function Navbar() {
  const { data, isPending } = useSession();
  const router = useRouter();
  const user = data?.user;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Toggle Menu"]')) {
        setMobileMenuOpen(false);
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

  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
        
        {/* লোগো */}
        <Link href="/" className="text-xl font-bold text-green-600 flex items-center">
          <Image src={logo} alt="Logo" className="h-8 w-auto inline-block mr-2" />
          <span className="hidden sm:inline">CommunityCare</span>
        </Link>
        
        {/* ডেস্কটপ নেভিগেশন লিংকস */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-green-500 transition">Home</Link>
          <Link href="/events" className="hover:text-green-500 transition">Upcoming Events</Link>
        </div>

        {/* ডানপাশের অংশ */}
        <div className="flex items-center gap-4">
          
          {/* ডেস্কটপের জন্য ইউজার সেকশন */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : user ? (
              <>
              <div className="relative group flex items-center py-2">
                
                {/* প্রোফাইল পিকচার */}
                <div className="flex items-center gap-2 cursor-pointer select-none">
                  <div className="relative">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full border object-cover pointer-events-none transition group-hover:ring-2 group-hover:ring-green-500"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-green-500 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 font-bold flex items-center justify-center text-lg pointer-events-none transition group-hover:ring-2 group-hover:ring-green-500">
                        {getInitial(user.name)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Hover Dropdown Menu */}
                <div className="absolute right-0 top-full pt-1 hidden group-hover:flex flex-col z-50">
                  <div className="w-52 bg-white dark:bg-gray-800 shadow-2xl rounded-xl border dark:border-gray-700 p-4 flex flex-col">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 pb-2.5 border-b dark:border-gray-700 dark:text-gray-400 mb-2 truncate">
                      {user.email}
                    </span>
                    
                    <Link 
                      href="/events/create" 
                      className="text-sm py-1.5 text-gray-700 dark:text-gray-200 hover:text-green-500 transition font-medium"
                    >
                      Create Event
                    </Link>
                    <Link 
                      href="/events/manage" 
                      className="text-sm py-1.5 text-gray-700 dark:text-gray-200 hover:text-green-500 transition font-medium"
                    >
                      Manage Events
                    </Link>
                    <Link 
                      href="/joined-events" 
                      className="text-sm py-1.5 text-gray-700 dark:text-gray-200 hover:text-green-500 transition font-medium"
                    >
                      Joined Events
                    </Link>

                    <button 
                      onClick={handleSignOut} 
                      className="mt-2 pt-2 border-t dark:border-gray-700 text-left text-sm text-red-500 font-semibold hover:text-red-600 transition flex items-center gap-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                
              </div>

                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }} 
                  className="text-sm text-red-500 font-semibold px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition rounded-md cursor-pointer"
                >
                  Logout
                </button>

              </>
            ) : (
              <Link href="/login" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                Login
              </Link>
            )}
          </div>

          {/* মোবাইল ডিভাইসের জন্য হ্যামবার্গার মেনু বাটন */}
          <button 
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)} 
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-4 space-y-3 shadow-lg">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-gray-700 dark:text-gray-200 hover:text-green-500 transition py-1"
          >
            Home
          </Link>
          <Link 
            href="/events" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-gray-700 dark:text-gray-200 hover:text-green-500 transition py-1"
          >
            Upcoming Events
          </Link>

          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse my-2" />
          ) : user ? (
            <div className="pt-3 border-t dark:border-gray-700 space-y-2">
              <div className="flex items-center gap-3 pb-2">
                {user.image ? (
                  <img src={user.image} alt="Profile" className="w-9 h-9 rounded-full border object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full border border-green-500 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 font-bold flex items-center justify-center text-sm">
                    {getInitial(user.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{user.email}</p>
                </div>
              </div>

              <Link 
                href="/events/create" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-green-500 py-1"
              >
                Create Event
              </Link>
              <Link 
                href="/events/manage" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-green-500 py-1"
              >
                Manage Events
              </Link>
              <Link 
                href="/joined-events" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-sm text-gray-700 dark:text-gray-300 hover:text-green-500 py-1"
              >
                Joined Events
              </Link>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }} 
                className="w-full text-left text-sm text-red-500 font-semibold py-2 mt-2 border-t dark:border-gray-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="block text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}