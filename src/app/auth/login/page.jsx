'use client';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import Logo from '@/app/Components/Logo';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage({ text: 'Login successful!', type: 'success' });
      router.push('/');
    } catch (error) {
      setMessage({ text: 'Invalid email or password. Please try again.', type: 'error' });
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage('Logged in successfully with Google!');
      setError('');
      router.push('/');
    } catch (err) {
      console.error('Google sign-in error: ', err);
      setError(err.message || 'Error signing in with Google. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 sm:p-12 flex">
        <div className="hidden sm:flex flex-col w-1/2 gap-10 p-6">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg">Discover the Latest Trends in Fashion</h2>
              <p className="text-sm text-gray-500">
                Explore our curated collections featuring the latest styles and seasonal trends. Shop with confidence and stay ahead in fashion.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Find the Perfect Fit for Every Occasion</h2>
              <p className="text-sm text-gray-500">
                Whether you're looking for casual wear, formal attire, or everything in between, our diverse range of clothing has something for everyone. Experience quality and style tailored to your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Welcome back</h2>
          {message.text && (
            <div className={`text-center mb-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {message.text}
            </div>
          )}

          {/* Google Login Button */}
          <div className="flex gap-2 justify-center mb-4">
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded w-full flex items-center justify-center"
              onClick={handleGoogleSignIn}
            >
              <Image src="/images/google.png" width={20} height={20} alt="Google logo" />
              <span className="ml-2">Log in with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="mx-3 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Email & Password Login */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="••••••••"
              />
            </div>

            {message.text && (
              <div className={`text-center mb-4 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message.text}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/auth/forgot" className="text-sm text-indigo-600 hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="bg-[#5b5c70] mt-4 font-bold hover:bg-primary text-white p-2 px-7 w-full hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
            >
              Sign in to your account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{' '}
              <Link href="/auth/signup" className="text-indigo-600 hover:underline">Sign up here</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
