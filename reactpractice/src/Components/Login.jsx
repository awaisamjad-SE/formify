import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const demoUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'teacher', password: 'teacher123', role: 'teacher' },
  { username: 'student', password: 'student123', role: 'student' },
];

const roleToDashboard = {
  admin: '/dashboard/admin',
  teacher: '/dashboard/teacher',
  student: '/dashboard/student',
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const user = demoUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Redirect to respective dashboard
      navigate(roleToDashboard[user.role]);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex justify-center items-center px-6 py-6 mx-auto">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto mb-6">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt="logo"
          />
        </div>

        <div className="flex items-center justify-center mb-6">
          <Link
            to="/login"
            className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
          >
            Sign Up
          </Link>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="relative flex items-center mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="block w-full py-3 px-11 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        </div>

        <div className="relative flex items-center mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Sign In
        </button>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          >
            Don’t have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
