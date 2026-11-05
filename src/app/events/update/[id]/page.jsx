'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UpdateEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'Cleanup',
    thumbnail: '',
    location: '',
    date: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ১. নির্দিষ্ট ইভেন্টের আগের ডাটাগুলো ফেচ করে ফর্মে বসানো
  useEffect(() => {
    if (!id) return;

    fetch(`https://hermione-server.vercel.app/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch event data');
        return res.json();
      })
      .then((data) => {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          eventType: data.eventType || 'Cleanup',
          thumbnail: data.thumbnail || '',
          location: data.location || '',
          date: data.date ? data.date.split('T')[0] : '', // YYYY-MM-DD ফরম্যাট করার জন্য
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching event:', err);
        setLoading(false);
      });
  }, [id]);

  // ২. ফর্ম সাবমিট হ্যান্ডলার (আপডেট রিকোয়েস্ট পাঠানো)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    
    // ভ্যালিডেশন: তারিখ ভবিষ্যতের হতে হবে[cite: 4]
    if (formData.date <= today) {
      alert('Event date must be in the future!');
      return;
    }

    setUpdating(true);

    try {
      const res = await fetch(`https://hermione-server.vercel.app/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Event updated successfully!');
        router.push('/events/manage'); // আপডেট শেষে ম্যানেজ পেজে রিডাইরেক্ট করবে
      } else {
        alert('Failed to update event.');
      }
    } catch (err) {
      console.error('Error updating event:', err);
      alert('Something went wrong!');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center">
        <p className="text-xl animate-pulse">Loading event data for editing...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto">
        
        {/* Back Link */}
        <Link href="/events/manage" className="text-xs text-emerald-400 hover:underline mb-4 inline-block">
          ← Back to Manage Events
        </Link>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 text-center">
            Update Social Event
          </h1>
          <p className="text-xs text-gray-400 text-center mb-6">
            Modify the details of your published community drive.
          </p>

          <form onSubmit={handleUpdate} className="space-y-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
                Description
              </label>
              <textarea
                required
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
                Event Type
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Donation">Donation</option>
                <option value="Winter Relief">Winter Relief</option>
                <option value="Health">Health</option>
              </select>
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                required
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">
                Event Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={updating}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-3 rounded-xl transition duration-200 text-sm shadow-lg disabled:opacity-50"
            >
              {updating ? 'Updating Event...' : 'Save Changes →'}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}