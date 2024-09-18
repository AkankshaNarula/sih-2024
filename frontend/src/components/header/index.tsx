import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider'; // Adjust the path as needed
import { doSignOut } from './../../firebase/auth.ts';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth(); // Now we have access to userLoggedIn

  const handleSignOut = async () => {
    try {
      await doSignOut(); // Ensure this function is correctly imported from your auth.ts
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>
      {
        userLoggedIn ? ( // Use userLoggedIn boolean
          <button onClick={handleSignOut} className='text-sm text-blue-600 underline'>
            Logout
          </button>
        ) : (
          <>
            <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
            <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
          </>
        )
      }
    </nav>
  );
};

export default Header;

