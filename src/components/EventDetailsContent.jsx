'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from "@/lib/auth-client";
import Swal from 'sweetalert2'; // SweetAlert2 ইম্পোর্ট করা হলো

export default function EventDetailsContent() {
  const params = useParams();
  const id = params?.id;
  const { data } = useSession();
  const userEmail = data?.user?.email;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Fetch single event details from backend
  useEffect(() => {
    if (!id) return;

    fetch(`https://hermione-server.vercel.app/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch event details:', err);
        setLoading(false);
      });
  }, [id]);

  console.log(id, userEmail);

  // Handle Join Event functionality with SweetAlert2
  const handleJoinEvent = async () => {
    setJoining(true);
    try {
      const res = await fetch(`https://hermione-server.vercel.app/join-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: id,
          userEmail: userEmail,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Joined!',
          text: 'You have successfully joined this event.',
          background: '#111827', // gray-900
          color: '#f3f4f6',      // gray-100
          confirmButtonColor: '#10b981', // emerald-500
          timer: 2500,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Notice',
          text: data.message || 'Failed to join event.',
          background: '#111827',
          color: '#f3f4f6',
          confirmButtonColor: '#10b981',
        });
      }
    } catch (err) {
      console.error('Error joining event:', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        background: '#111827',
        color: '#f3f4f6',
        confirmButtonColor: '#10b981',
      });
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <p className="text-xl animate-pulse">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center gap-4">
        <p className="text-xl text-red-400">Event not found or invalid ID!</p>
        <Link href="/events" className="bg-emerald-500 text-gray-950 px-4 py-2 rounded-xl font-semibold">
          ← Back to Upcoming Events
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 mb-6 transition"
        >
          <span>← Back to Events</span>
        </Link>

        {/* Main Details Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Thumbnail Header */}
          <div className="relative h-72 md:h-96 w-full overflow-hidden bg-gray-950">
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80"></div>
            <span className="absolute top-4 left-4 bg-gray-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs px-3.5 py-1.5 rounded-full font-semibold">
              {event.eventType}
            </span>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-10 space-y-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                  {event.title}
                </h1>
                <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                  <span>📍 {event.location}</span>
                  <span>•</span>
                  <span>📅 {formattedDate}</span>
                </p>
              </div>

              {/* Join Event Button */}
              <button
                onClick={handleJoinEvent}
                disabled={joining}
                className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-6 py-3 rounded-xl transition shadow-lg duration-200 disabled:opacity-50 text-sm whitespace-nowrap cursor-pointer"
              >
                {joining ? 'Joining...' : 'Join Event 🤝'}
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">About this Initiative</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {event.description}
              </p>
            </div>

            {/* Organizer Info */}
            <div className="bg-gray-950/60 border border-gray-800/80 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  {event.createdBy?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Organized by</p>
                  <p className="text-sm font-medium text-gray-200">{event.createdBy}</p>
                </div>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
                Verified Host
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}