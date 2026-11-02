'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client'; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নিন

export default function RegisterPage() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password validation checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      setErrorMsg('Please fulfill all password requirements.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: image || undefined,
        callbackURL: '/upcoming-events',
      }, {
        onSuccess: () => {
          alert('Account created successfully!');
          router.push('/upcoming-events');
        },
        onError: (ctx) => {
          setErrorMsg(ctx.error.message || 'Registration failed.');
        }
      });

      if (error) {
        setErrorMsg(error.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-gray-900 border border-gray-800/80 w-full max-w-md p-8 rounded-3xl shadow-2xl">
        
        {/* Top Logo / Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xl font-bold mb-3 shadow-inner">
            🤝
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Create Account
          </h1>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Join the community and start driving social change
          </p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-800/50 rounded-xl text-red-400 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 text-sm">
                👤
              </span>
              <input
                type="text"
                required
                placeholder="Tanvir Ahmed"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 text-sm">
                ✉️
              </span>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Profile Photo URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Profile Photo URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 text-sm">
                🖼️
              </span>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Optional: Leave empty for default avatar</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 text-sm">
                🔒
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 text-xs"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Validation Feedback List */}
            <div className="mt-2.5 space-y-1 text-xs">
              <p className={hasUppercase ? 'text-emerald-400 flex items-center gap-1.5' : 'text-gray-500 flex items-center gap-1.5'}>
                <span>{hasUppercase ? '✓' : '✕'}</span> At least one uppercase letter (A-Z)
              </p>
              <p className={hasLowercase ? 'text-emerald-400 flex items-center gap-1.5' : 'text-gray-500 flex items-center gap-1.5'}>
                <span>{hasLowercase ? '✓' : '✕'}</span> At least one lowercase letter (a-z)
              </p>
              <p className={hasMinLength ? 'text-emerald-400 flex items-center gap-1.5' : 'text-gray-500 flex items-center gap-1.5'}>
                <span>{hasMinLength ? '✓' : '✕'}</span> Minimum 6 characters length
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-3 rounded-xl transition duration-200 text-sm shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : 'Register →'}
          </button>

        </form>

        {/* Footer Login Redirect */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-400 hover:underline font-semibold">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}