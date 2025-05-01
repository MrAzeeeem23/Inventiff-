import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div> */}
      <span className='loader invert dark:invert-0'></span>
    </div>
  );
}

export default Loader;
