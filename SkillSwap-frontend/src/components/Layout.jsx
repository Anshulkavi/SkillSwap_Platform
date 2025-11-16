import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />   {/* FIXED */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
