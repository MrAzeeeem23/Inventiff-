import PixelCard from '@/animations/PixelCard'
import Link from 'next/link'
import React from 'react'

function ContactCard() {
  return (
    <section className="w-full py-16 lg:py-24">
      <PixelCard variant="white" className='w-full invert dark:invert-0'>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center p-8 lg:p-12'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-bold font-afacad text-white mb-4 lg:mb-6'>
            Contact us
          </h1>
          
          <p className='text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 lg:mb-8 max-w-2xl leading-relaxed'>
            Ready to start your next project? Let's discuss how we can help bring your ideas to life.
          </p>
          
          <Link 
            href="/Contact" 
            className='inline-flex items-center px-8 py-3 bg-black text-white font-Poppins rounded-full border border-white transition-colors duration-200 group'
          >
            Get in Touch
            <svg 
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </PixelCard>
    </section>
  )
}

export default ContactCard