import { useRouter } from 'next/router'
import React, { useState } from 'react'

function strategyAdvisory() {

  const router = useRouter();
  const { slug } = router.query;

  console.log(slug)

  const [serviceBlog, SetServiceBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  // const [showContent]

  return (
    <>
      <section className='min-h-screen bg-gradient-to-tr dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8'>
        <div className="max-w-4xl mt-12 mb-8">
          <h1 className="text-5xl font-bold font-afacad text-black dark:text-white capitalize">
            {slug}
          </h1>
        </div>
      </section>
    </>
  )
}

export default strategyAdvisory