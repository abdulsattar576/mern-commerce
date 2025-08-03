 import React from 'react';

const Loader = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-400 border-t-transparent shadow-md"></div>
      <p className="mt-4 text-gray-600 text-sm font-medium">Loading, please wait...</p>
    </div>
  );
};

export default Loader;
