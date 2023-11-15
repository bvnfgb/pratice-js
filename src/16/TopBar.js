// TopBar.js

import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">Your Logo</Link>

        <div className="flex space-x-4">
          <Link to="/login" className="hover:text-gray-400">Login</Link>
          <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
