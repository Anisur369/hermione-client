'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    // Fetch top 6 upcoming events using limit
    fetch('http://localhost:5000/events?limit=6')
      .then(res => res.json())
      .then(data => setRecentEvents(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Banner Section */}
      <section className="bg-green-700 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Empower Communities Through Service</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">Join hands to create a sustainable impact. Participate in local charity, cleanup, and tree plantation events.</p>
        <Link href="/events" className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100">
          Explore Events
        </Link>
      </section>

      {/* Feature Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">Create & Manage</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Easily organize social drives and manage participation with intuitive tools.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">Real-time Join</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Connect with volunteers instantly and track all your community contributions.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Protected routes and JWT validation ensure data privacy and security.</p>
        </div>
      </section>

      {/* Recent Upcoming Events Section (2 or 3 Column Grid) */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentEvents.map(event => (
            <div key={event._id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow border dark:border-gray-700 flex flex-col justify-between">
              <div>
                <img src={event.thumbnail} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">{event.eventType}</span>
                  <h3 className="text-lg font-bold mt-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
                  <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link href={`/events/${event._id}`} className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  View Event
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section (Static) */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Community Moments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433" alt="Gallery" className="rounded-lg h-48 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a" alt="Gallery" className="rounded-lg h-48 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c" alt="Gallery" className="rounded-lg h-48 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb9" alt="Gallery" className="rounded-lg h-48 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Newsletter Section (No Functionality Required) */}
      <section className="py-16 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Subscribe to our newsletter to receive updates on upcoming social service events.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Subscribe</button>
        </div>
      </section>
    </div>
  );
}