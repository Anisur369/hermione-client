'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    // Fetch 6 recent upcoming events using limit
    fetch(`https://hermione-server.vercel.app/events?limit=6`)
      .then(res => res.json())
      .then(data => setRecentEvents(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      
      {/* Banner Section */}
      <section className="bg-green-700 text-white py-40 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Empower Communities Through Service</h1>
        <p className="text-lg max-w-2xl mx-auto mb-10">Join hands to create a sustainable impact. Participate in local charity, cleanup, and tree plantation events.</p>
        <Link href="/events" className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
          Explore Events
        </Link>
      </section>

      {/* Feature Section */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          {/* <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-950/60 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50">
            Platform Capabilities
          </span> */}
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-2">Why Choose CommunityCare</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Everything you need to organize, connect, and drive impactful social initiatives seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/60">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xl">
              ✨
            </div>
            <h3 className="text-xl font-bold mb-2">Create & Manage</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Easily organize social drives and manage participation with intuitive tools and dashboard controls.</p>
          </div>
          
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/60">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xl">
              🤝
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Join</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Connect with volunteers instantly and track all your community contributions in real time.</p>
          </div>
          
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/60">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-xl">
              🛡️
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Protected routes and modern session authentication ensure data privacy and platform security.</p>
          </div>
        </div>
      </section>

      {/* Recent Upcoming Events Section */}
      <section className="py-20 bg-gray-800">
        <div className="py-16 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-950/60 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50">
              Active Drives
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-2">Recent Upcoming Events</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Discover verified volunteer initiatives scheduled for upcoming dates and register to participate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentEvents.map(event => (
              <div key={event._id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between transition hover:border-green-500/50">
                <div>
                  <img src={event.thumbnail} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <span className="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-semibold">
                      {event.eventType}
                    </span>
                    <h3 className="text-lg font-bold mt-3 mb-1 line-clamp-1">{event.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">📍 {event.location}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">📅 {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link href={`/events/${event._id}`} className="block text-center bg-green-600 text-white font-semibold py-2.5 rounded-xl hover:bg-green-700 transition text-sm shadow">
                    View Event →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section (Static) */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-950/60 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50">
              Visual Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-2">Community Moments Gallery</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Glimpses of dedication, teamwork, and positive change from our past community service events.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433" alt="Gallery" className="rounded-2xl h-48 w-full object-cover shadow-md hover:scale-105 transition duration-300" />
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a" alt="Gallery" className="rounded-2xl h-48 w-full object-cover shadow-md hover:scale-105 transition duration-300" />
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" alt="Gallery" className="rounded-2xl h-48 w-full object-cover shadow-md hover:scale-105 transition duration-300" />
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c" alt="Gallery" className="rounded-2xl h-48 w-full object-cover shadow-md hover:scale-105 transition duration-300" />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
          Subscribe to our newsletter to receive real-time updates on upcoming social service events and community drives.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-4 py-3 border rounded-xl dark:bg-gray-800 dark:border-gray-700 text-sm focus:outline-none focus:border-green-500" 
          />
          <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition text-sm shadow">
            Subscribe Now
          </button>
        </div>
      </section>

    </div>
  );
}