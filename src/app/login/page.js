// app/login/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword 
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
    <div className="min-h-screen flex items-center justify-center bg-[#4d665e]">
      <div className="bg-white p-12 rounded-lg shadow-lg w-96 relative">
        <h2 className="absolute top-0 left-0 right-0 bg-[#4d665e] text-white py-3 rounded-t-lg text-center text-xl">
          {isLogin ? 'LOG IN' : 'REGISTER'}
        </h2>
        
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label htmlFor="email" className="block text-black text-sm mb-2">Email / Account</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-full border-2 border-gray-200 bg-gray-50 focus:border-[#4d665e] focus:outline-none"
              style={{ color: 'black' }} // Set the text color to black
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-black text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-full border-2 border-gray-200 bg-gray-50 focus:border-[#4d665e] focus:outline-none"
              style={{ color: 'black' }} // Set the text color to black
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#4d665e] text-white py-3 rounded-full hover:bg-[#3b524b] transition-colors"
          >
            {isLogin ? 'Log In' : 'Register'}
          </button>

          {isLogin && (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full mt-4 bg-white text-gray-700 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="20" viewBox="0 0 50 50">
                <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
              </svg>
              Sign in with Google
            </button>
          )}
        </form>

        <div className="mt-6 text-center">
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