'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from "@/lib/auth-client";
import Swal from 'sweetalert2'; // SweetAlert2 ইম্পোর্ট করা হলো

export default function ManageEventsPage() {
  const { data, isPending } = useSession();
  const user = data?.user;
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email;
  console.log("user:", user, "events:", events, "loading:", loading);

  useEffect(() => {
    // যদি userEmail না থাকে, তবে API কল করার দরকার নেই
    if (!userEmail) return;

    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://hermione-server.vercel.app/my-events/${userEmail}`);
        const data = await res.json();
        if (res.ok) {
          setEvents(data);
        }
      } catch (err) {
        console.error('Failed to fetch user events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [userEmail]); // userEmail পাওয়া মাত্রই এটি আবার রান হবে

  // Delete Event Handler with SweetAlert2 Confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      background: '#111827', // gray-900
      color: '#f3f4f6',      // gray-100
      confirmButtonColor: '#ef4444', // red-500
      cancelButtonColor: '#374151',  // gray-700
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://hermione-server.vercel.app/events/${id}`, {
            method: 'DELETE',
          });
          
          if (res.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Event has been deleted successfully.',
              background: '#111827',
              color: '#f3f4f6',
              confirmButtonColor: '#10b981', // emerald-500
              timer: 2000,
              showConfirmButton: false
            });
            setEvents(events.filter((event) => event._id !== id));
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Failed to delete event.',
              background: '#111827',
              color: '#f3f4f6',
              confirmButtonColor: '#10b981',
            });
          }
        } catch (err) {
          console.error('Error deleting event:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong.',
            background: '#111827',
            color: '#f3f4f6',
            confirmButtonColor: '#10b981',
          });
        }
      }
    });
  };

  if (isPending || (loading && !userEmail)) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <p className="text-xl animate-pulse">Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-gray-800 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
              Organizer Dashboard
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight text-white">
              Manage My Events
            </h1>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              View, edit, and manage the social drives you have published. Only you have permission to edit or delete your created initiatives.
            </p>
          </div>
          
          <Link
            href="/events/create"
            className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 text-sm"
          >
            <span>+ Create New Event</span>
          </Link>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/40 rounded-3xl border border-gray-800/80">
            <p className="text-gray-400 text-lg mb-4">You haven't created any events yet.</p>
            <Link
              href="/events/create"
              className="inline-block bg-emerald-500 text-gray-950 font-semibold px-6 py-2.5 rounded-xl text-sm"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={event._id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition hover:border-gray-700"
                >
                  <div>
                    {/* Thumbnail & Badges */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-950">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-medium">
                        {event.eventType}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-gray-950/80 backdrop-blur-md text-gray-200 text-xs px-2.5 py-1 rounded-lg border border-gray-800">
                        📅 {formattedDate}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white tracking-wide mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                        📍 {event.location}
                      </p>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: View, Edit, Delete */}
                  <div className="p-5 pt-0 grid grid-cols-3 gap-2">
                    <Link
                      href={`/events/${event._id}`}
                      className="text-center bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold py-2 rounded-xl transition"
                    >
                      View
                    </Link>
                    <Link
                      href={`/events/update/${event._id}`}
                      className="text-center bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-800/50 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-center bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-800/50 text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1"
                    >
                      🗑️ Delete
                    </button>
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