'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client";

export default function CreateEvent() {
  const { data, isPending } = useSession();
  const user = data?.user;

  console.log('User data:', user); // Debugging line to check user data
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'Cleanup',
    thumbnail: '',
    location: '',
    date: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    
    // Validation: Date must be in the future
    if (formData.date <= today) {
      alert('Event date must be in the future!');
      return;
    }

    const eventPayload = {
      ...formData,
      createdBy: user?.email, // Replace with logged-in user's email
    };

    const res = await fetch(`https://hermione-server.vercel.app/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(eventPayload),
    });

    if (res.ok) {
      alert('Event created successfully!');
      router.push('/events');
    } else {
      alert('Failed to create event.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <span className="inline-block bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            🌱 Social Service Drive
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create a Community Event
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Organize a local relief effort, environmental cleanup, or community support drive.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm outline-none transition"
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Event Type & Date Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Event Type <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm outline-none transition"
                onChange={e => setFormData({ ...formData, eventType: e.target.value })}
              >
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm outline-none transition"
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
              <span className="text-xs text-gray-400 mt-1 block">Dates must be in the future (today or later)</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Location / Venue <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Mohammadpur Town Hall, Dhaka"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm outline-none transition"
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Thumbnail Image URL <span className="text-red-500">*</span>
            </label>
            <input 
              type="url" 
              required 
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm outline-none transition"
              onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Event Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              required 
              rows={4}
              placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm outline-none transition resize-none"
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Organizer Email Info Box */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Organizer Email attached:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{user?.email}</span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3.5 px-4 rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className='border w-4 h-4 rounded-2xl flex items-center justify-center '>+</span> Publish Event
          </button>
        </form>
      </div>
    </div>
  );
}