import React from 'react';

const Header = () => {
  return (
    <header className="bg-indigo-600 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 md:h-20">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            User Profile Management
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
