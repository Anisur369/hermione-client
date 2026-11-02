'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEvent() {
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
    
    // Validation: Date must be in the future[cite: 4]
    if (formData.date <= today) {
      alert('Event date must be in the future!');
      return;
    }

    const eventPayload = {
      ...formData,
      createdBy: 'user@example.com', // Replace with logged-in user's email
    };

    const res = await fetch('http://localhost:5000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(eventPayload),
    });

    if (res.ok) {
      alert('Event created successfully!');
      router.push('/upcoming-events');
    } else {
      alert('Failed to create event.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Social Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input 
            type="text" required 
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea required 
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Type</label>
          <select 
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            onChange={e => setFormData({ ...formData, eventType: e.target.value })}
          >
            <option value="Cleanup">Cleanup</option>
            <option value="Plantation">Plantation</option>
            <option value="Donation">Donation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail Image URL</label>
          <input type="url" required 
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input type="text" required 
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            onChange={e => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Date</label>
          <input type="date" required 
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            onChange={e => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Create Event
        </button>
      </form>
    </div>
  );
}