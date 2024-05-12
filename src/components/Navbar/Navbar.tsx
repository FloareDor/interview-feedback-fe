import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          Interview Tracker
        </Link>
        <div>
          <Link
            href="/login"
            className={`mx-4 text-gray-300 hover:text-white ${isActive('/login') ? 'font-bold' : ''}`}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={`mx-4 text-gray-300 hover:text-white ${isActive('/signup') ? 'font-bold' : ''}`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;