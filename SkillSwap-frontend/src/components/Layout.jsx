import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;