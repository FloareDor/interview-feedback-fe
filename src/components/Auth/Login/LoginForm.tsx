import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoginField from './LoginField';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
		const response = await axios.post(`${backendUrl}/login`, { username, password });
		const accessToken = response.data.access_token; // the access token is returned in the response data
  
		// Save the access token in localStorage
		localStorage.setItem('accessToken', accessToken);

		console.log(accessToken)
		console.log(localStorage.getItem('accessToken'))
  
		// Redirect to the desired page after successful login
		router.push('/interviews');
	  } catch (err) {
		setError('Invalid username or password');
	  }
  };

  return (


      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <LoginField
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <LoginField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default LoginForm;