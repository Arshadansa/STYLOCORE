'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from '../../lib/firebase'; 
import { doc, setDoc } from 'firebase/firestore'; 
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.email), {
        fullName,
        email,
        createdAt: new Date(),
      });

      setSuccessMessage('Account created successfully!');
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(firestore, 'users', user.email), {
        fullName: user.displayName || '',
        email: user.email,
        createdAt: new Date(),
      });

      setSuccessMessage('Signed in successfully!');
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="py-12 lg:py-24 border-primary border-t border-b bg-white flex gap-10 lg:gap-0 flex-col md:flex-row items-center justify-center px-3 sm:px-3 lg:px-6">
    <div className="md:w-1/3 w-[90%] space-y-2">
      <div>
        <h2 className="mt-6 text-center text-lg  lg:text-3xl font-extrabold text-gray-900">
          Create your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-blue-500"
          >
            Login here
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="full-name" className="sr-only">
              Full Name
            </label>
            <input
              id="full-name"
              name="full-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-center">{successMessage}</div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-[#5b5c70] font-bold hover:bg-primary text-white p-2 px-7 w-full hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
          >
            Create an account
          </button>
        </div>
      </form>
      <div className="flex items-center my-4">
        <hr className="w-full border-gray-300" />
        <span className="mx-3 text-gray-500">or</span>
        <hr className="w-full border-gray-300" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <button
            className="w-full bg-white text-gray-600 py-2 px-4 gap-2 rounded-md shadow-md flex justify-center items-center border"
            onClick={handleGoogleSignIn}
          >
            <Image
              src="/images/google.png"
              width={20}
              height={20}
              alt="Google logo"
            />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
    <div className="md:w-1/2 w-[90%] flex items-center justify-center">
      <Image
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
        width={500}
        height={500}
        alt="Illustration"
      />
    </div>
  </div>
);
}