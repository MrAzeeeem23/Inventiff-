'use client';

import React, { useState, useEffect } from 'react';
import blogService from '@/appwrite_controller/service';
import Loader from '@/components/utility/Loader';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery'; // You'll need to create this custom hook


function AllBlogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Check if device is mobile/small screen
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogService.getBlog();
        setPosts(response.documents);
      } catch (error) {
        console.error('Failed to fetch Blogs from server', error);
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-tr dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mt-12 mb-8">
        <h1 className="text-5xl font-bold font-afacad text-black dark:text-white">
          All Blogs
        </h1>
      </div>

      {loading && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6">
        {posts.map((post, index) => (
          <div
            key={post.$id}
            className={`flex flex-col overflow-hidden transition-all duration-300 ${
              !isMobile && hoveredIndex !== null && hoveredIndex !== index
                ? 'opacity-50 blur-sm scale-[0.98]'
                : 'hover:scale-[1.01] opacity-100'
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="aspect-square w-full overflow-hidden">
              <img
                src="https://images.pexels.com/photos/25626446/pexels-photo-25626446/free-photo-of-black-and-white-geometric-representation-of-data.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Blog cover"
                className="object-cover w-full h-full hover:scale-105 transition-all"
              />
            </div>

            <div className="flex flex-col flex-grow py-4">
              <h2 className="text-2xl font-bold font-afacad text-black dark:text-white mb-2">
                {post.Title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                {post.Description.length > 100
                  ? `${post.Description.slice(0, 120)}...`
                  : post.Description}
              </p>

              <div className="mt-6 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="uppercase font-michroma_regular">
                  {new Date(post.$createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  })}
                </span>
                <Link
                  href={`/blogs/${post.$id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  aria-label={`Read more about ${post.Title}`}
                >
                  Read more <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllBlogs;