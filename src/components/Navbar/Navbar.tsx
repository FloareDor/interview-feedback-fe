import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${backendUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          Interview Tracker
        </Link>
        {isLoggedIn ? (
          <div>
            <span className="mr-4 text-gray-300">{username}</span>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link
              href="/login"
              className={`mx-4 text-gray-300 hover:text-white ${
                router.pathname === '/login' ? 'font-bold' : ''
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`mx-4 text-gray-300 hover:text-white ${
                router.pathname === '/signup' ? 'font-bold' : ''
              }`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;