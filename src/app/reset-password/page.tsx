'use client';

import { useState } from 'react';
import { Apple, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Simulate API call for password reset
    setTimeout(() => {
      console.log('Password reset requested for:', email);
      
      // In a real app, you'd make an API call to send a password reset email
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2 rounded-full bg-gray-100 p-3">
            <Apple className="h-8 w-8 text-black" />
          </div>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            {!submitted 
              ? "Enter your email address and we'll send you instructions to reset your password" 
              : "Check your email for instructions to reset your password"}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        {!submitted ? (
          <div className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="example@apple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? 'Sending...' : 'Send reset instructions'}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <p className="text-gray-700">
              We've sent an email to <span className="font-medium">{email}</span> with instructions to reset your password.
            </p>
            <p className="text-sm text-gray-500">
              If you don't see the email in your inbox, please check your spam folder.
            </p>
            <div>
              <Link 
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Return to login
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center">
          <Link href="/login" className="flex items-center text-sm text-gray-600 hover:text-blue-500">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}