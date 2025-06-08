import React from 'react'

function Footer() {
  const Logo = "/assets/Inventiff_logo.jpg"

  console.log(`devloped by Ak: ${"https://azeemkhan23.netlify.app/"}`)
  
  return (
    <footer className="w-full bg-white text-black relative dark:bg-black dark:text-white border-t border-gray-100 dark:border-gray-900">
      {/* Gradient overlay */}
      <div className="absolute -top-24 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white dark:to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Logo and brand section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center shadow-sm">
              <img 
                src={Logo} 
                alt="Inventiff Analytics Logo" 
                className="w-14 h-14 object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-afacad mb-1 tracking-tight">
                Inventiff Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Empowering insights through intelligent data
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a 
              href="/" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <a 
              href="/About" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
            <a 
              href="/Contact" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
              © {new Date().getFullYear()} Inventiff Analytics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer