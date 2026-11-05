'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/sliderImage1.jpg',
      title: 'Empower Communities Through Service',
      description: 'Join hands to create a sustainable impact. Participate in local charity, cleanup, and tree plantation events.',
    },
    {
      image: '/sliderImage2.jpg',
      title: 'Drive Positive Social Change',
      description: 'Connect with active volunteers and make a real difference in your neighborhood.',
    },
    {
      image: '/sliderImage3.jpg',
      title: 'Support Winter & Relief Drives',
      description: 'Help distribute food, clothes, and essentials to underprivileged communities in need.',
    },
    {
      image: '/sliderImage4.jpg',
      title: 'Protect Our Green Planet',
      description: 'Take part in tree plantation drives and urban environmental cleanup campaigns.',
    },
  ];

  // অটো-স্লাইডার ইফেক্ট (প্রতি ৩ সেকেন্ড পর পর স্লাইড চেঞ্জ হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    // Fetch 6 recent upcoming events using limit
    fetch(`https://hermione-server.vercel.app/events?limit=6`)
      .then(res => res.json())
      .then(data => setRecentEvents(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      
      {/* Dynamic Banner / Carousel Section with Fixed Height */}
      <section className="relative bg-gray-900 text-white h-[550px] md:h-[650px] w-full flex items-center justify-center overflow-hidden text-center px-4">
        
        {/* Background Slider Images Container */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-40 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={`Slider ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-center transition-transform duration-1000"
              />
            </div>
          </div>
        ))}

        {/* Content Layer */}
        <div className="relative z-10 max-w-4xl mx-auto transition-all duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-200 leading-relaxed drop-shadow">
            {slides[currentSlide].description}
          </p>
          <Link href="/events" className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition duration-200 text-sm inline-block">
            Explore Events →
          </Link>
        </div>

        {/* Slider Indicator Dots */}
        <div className="absolute bottom-6 z-20 flex gap-2 justify-center w-full">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
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
      <section className="py-20 bg-gray-800 text-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            {/* <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
              Active Drives
            </span> */}
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-2 text-white">Recent Upcoming Events</h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              Discover verified volunteer initiatives scheduled for upcoming dates and register to participate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentEvents.map(event => (
              <div key={event._id} className="bg-gray-950/80 rounded-2xl overflow-hidden shadow-xl border border-gray-800 flex flex-col justify-between transition hover:border-gray-700">
                <div>
                  <div className="relative h-48 w-full">
                    <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs bg-gray-900 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full font-semibold">
                      {event.eventType}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-3 mb-1 line-clamp-1">{event.title}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">📍 {event.location}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">📅 {new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link href={`/events/${event._id}`} className="block text-center bg-emerald-500 text-gray-950 font-bold py-2.5 rounded-xl hover:bg-emerald-400 transition text-sm shadow">
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
            {/* <span className="text-xs uppercase tracking-widest text-green-600 dark:text-green-400 font-bold bg-green-100 dark:bg-green-950/60 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50">
              Visual Impact
            </span> */}
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