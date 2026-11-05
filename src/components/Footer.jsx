import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900 pt-16 pb-8 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Column 1: Logo & Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl text-gray-950 flex items-center justify-center font-bold text-lg shadow-md">
              <Image src={logo} alt="Logo" className="h-8 w-auto inline-block mr-2" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              CommunityCare
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            A community-driven event management platform empowering everyday citizens to create, join, and track impactful social development drives.
          </p>
          <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
            <span>📍</span> Dhaka, Bangladesh • Nationwide Impact
          </p>
        </div>

        {/* Column 2: Explore Platform */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Explore Platform
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/upcoming-events" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span>📅</span> Upcoming Events
              </Link>
            </li>
            <li>
              <Link href="/create-event" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span>✨</span> Create an Event
              </Link>
            </li>
            <li>
              <Link href="/manage-events" className="hover:text-emerald-400 transition">
                Manage My Events
              </Link>
            </li>
            <li>
              <Link href="/joined-events" className="hover:text-emerald-400 transition">
                My Joined Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Active Causes */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Active Causes
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Winter Clothes & Blanket Relief</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>City Clean-up & Waste Segregation</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Urban Tree Plantation Drives</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Underprivileged Meal Sharing</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Free Medical & Health Camps</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Community Spirit */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Community Spirit
          </h4>
          <p className="text-xs leading-relaxed text-gray-400">
            Every small action counts. Connect with local volunteers, turn compassion into direct community aid, and be the change your city needs.
          </p>
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-medium">
            <span>🌐</span> 100% Volunteer Driven
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Credit */}
      <div className="max-w-7xl mx-auto border-t border-gray-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 GoodGather. Built with care for community service and social development.</p>
        <p className="flex items-center gap-1">
          Made with <span className="text-red-500">❤️</span> for a better tomorrow
        </p>
      </div>
    </footer>
  );
}