import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-white text-black relative dark:bg-black dark:text-white">
      {/* Gradient Overlay */}
      <div className="absolute -top-24 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white dark:to-black pointer-events-none" />

      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-2">Inventiff Analytics</h1>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
          Empowering insights through intelligent data.
        </p>

        {/* Navigation */}
        <nav className="flex gap-6 flex-wrap justify-center">
          <a href="#home" className="text-sm hover:underline transition-opacity hover:opacity-80">
            Home
          </a>
          <a href="#about" className="text-sm hover:underline transition-opacity hover:opacity-80">
            About
          </a>
          <a href="#contact" className="text-sm hover:underline transition-opacity hover:opacity-80">
            Contact
          </a>
        </nav>

        {/* Optional: Divider + Copyright */}
        <div className="mt-8 w-full border-t border-gray-200 dark:border-gray-800 pt-4 text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Inventiff Analytics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
