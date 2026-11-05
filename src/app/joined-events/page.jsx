'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from "@/lib/auth-client";

export default function JoinedEventsPage() {
  const { data, isPending } = useSession();
  const userEmail = data?.user?.email;

  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`https://hermione-server.vercel.app/joined-events/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setJoinedEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch joined events:', err);
        setLoading(false);
      });
  }, [userEmail]);

  if (isPending || (loading && !userEmail)) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <p className="text-xl animate-pulse">Loading your joined events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 border-b border-gray-800 pb-6">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
            🤝 My Volunteer Commitments
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight text-white">
            Joined Events
          </h1>
          <p className="text-gray-400 text-sm mt-1 max-w-xl">
            Here are all the social development and community service drives you have signed up for, sorted by event date.
          </p>
        </div>

        {/* Events Grid */}
        {joinedEvents.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/40 rounded-3xl border border-gray-800/80">
            <p className="text-gray-400 text-lg mb-4">You haven't joined any events yet.</p>
            <Link
              href="/upcoming-events"
              className="inline-block bg-emerald-500 text-gray-950 font-semibold px-6 py-2.5 rounded-xl text-sm"
            >
              Explore Upcoming Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((event) => {
              const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={event._id}
                  className="bg-gray-900/90 border border-gray-800/90 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-950/20"
                >
                  <div>
                    {/* Thumbnail & Badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-950">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent"></div>
                      <span className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-medium shadow">
                        {event.eventType}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-gray-950/80 backdrop-blur-md text-gray-200 text-xs px-2.5 py-1 rounded-lg border border-gray-800 flex items-center gap-1.5">
                        📅 {formattedDate}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-bold text-white tracking-wide line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        📍 {event.location}
                      </p>

                      {/* Organizer & Status Badge */}
                      <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                        <span>Host: <strong className="text-gray-300">{event.createdBy}</strong></span>
                        <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-md font-medium">
                          ✓ Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Event Button */}
                  <div className="p-5 pt-0">
                    <Link
                      href={`/events/${event._id}`}
                      className="block text-center bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-2.5 rounded-xl transition duration-200 text-sm shadow-md"
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