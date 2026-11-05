'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch events from backend API
  useEffect(() => {
    fetch(`https://hermione-server.vercel.app/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch events:', err);
        setLoading(false);
      });
  }, []);

  // Filter based on Category and Search Query
  useEffect(() => {
    let result = events;

    if (selectedCategory !== 'All') {
      result = result.filter((event) => event.eventType === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(result);
  }, [selectedCategory, searchQuery, events]);

  const categories = ['All', 'Donation', 'Cleanup', 'Plantation', 'Winter Relief', 'Food Drive', 'Health Camp'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <p className="text-xl animate-pulse">Loading upcoming events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-800 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
              Future Community Drives
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">
              Upcoming Events
            </h1>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Discover verified volunteer initiatives scheduled for upcoming dates. Past events are automatically excluded so you can focus on active drives that need support.
            </p>
          </div>
          
          <Link
            href="/events/create"
            className="bg-emerald-500 hover:bg-emerald-600 text-gray-950 font-bold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 text-sm"
          >
            <span>+ Create Event</span>
          </Link>
        </div>

        {/* Filters and Search Bar Section */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-10">
          
          {/* Categories Pill List */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-gray-950 font-bold shadow-md'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search events or areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/40 rounded-2xl border border-gray-800/60">
            <p className="text-gray-400 text-lg">No upcoming events found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={event._id}
                  className="bg-gray-900/80 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-gray-700 transition duration-300"
                >
                  <div>
                    {/* Thumbnail with Event Type Tag */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-950">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-medium">
                        {event.eventType}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-gray-950/80 backdrop-blur-md text-gray-200 text-xs px-2.5 py-1 rounded-lg border border-gray-800 flex items-center gap-1.5">
                        📅 {formattedDate}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white tracking-wide mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                        📍 {event.location}
                      </p>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        👤 {event.createdBy}
                      </p>
                    </div>
                  </div>

                  {/* View Event Button */}
                  <div className="p-5 pt-0">
                    <Link
                      href={`/events/${event._id}`}
                      className="block text-center bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold py-2.5 rounded-xl transition duration-200 text-sm shadow-md"
                    >
                      View Event →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}