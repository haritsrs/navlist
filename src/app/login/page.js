'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../firebase';
import { useAuth } from '../components/auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (error) {
      setError(
        isLogin
          ? 'Failed to log in. Please check your credentials.'
          : 'Failed to create account. ' + error.message
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      setError('Failed to sign in with Google.');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#9bbb98]">
      {/* Animated Header */}
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-4xl font-bold text-[#4d665e] mb-2 animate-fade-slide-in-left">
          NavList: Make your daily task(s) easier.
        </h1>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200 animate-fade-slide-in-left relative z-0">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4d665e] transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4d665e] transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#4d665e] text-white py-3 rounded-lg hover:bg-[#3b524b] transition"
          >
            {isLogin ? 'Log In' : 'Register'}
          </button>
        </form>

        {/* Google Sign-in */}
        {isLogin && (
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full mt-4 bg-white text-gray-700 py-3 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 10l4-3m0 0l-4-3m4 3H3" />
            </svg>
            Sign in with Google
          </button>
        )}

        {/* Toggle Between Log In and Register */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 mb-2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={toggleMode}
            className="text-[#4d665e] font-bold hover:underline text-sm"
          >
            {isLogin ? 'Create an Account' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}
