
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

import Container from "../components/container/Container";
import blogService from "../appwrite_controller/service";

const ShinyText = dynamic(() => import("../animations/ShinyText"), {
  ssr: false,
});

const Loader = dynamic(() => import("../components/utility/Loader"), {
  ssr: false,
});

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(3);
  const carouselRef = useRef(null);

  // Update display count based on container width
  useEffect(() => {
    const updateDisplayCount = () => {
      if (window.innerWidth < 768) {
        setDisplayCount(1);
      } else if (window.innerWidth < 1024) {
        setDisplayCount(2);
      } else {
        setDisplayCount(3);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);

    return () => {
      window.removeEventListener("resize", updateDisplayCount);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogService.getBlog();
        setPosts(response.documents);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const maxIndex = Math.max(0, posts.length - displayCount);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const cardWidth = 100 / displayCount;

  return (
    <>
      {/* <Head>
        <title>Latest Blogs | Inventiff Analytics</title>
        <meta
          name="description"
          content="Read the latest insights and thought leadership from our data science experts at Inventiff Analytics."
        />
        <meta
          name="keywords"
          content="data science blogs, analytics insights, data analysis, machine learning articles"
        />
        <meta
          property="og:title"
          content="Latest Blogs | Inventiff Analytics"
        />
        <meta
          property="og:description"
          content="Expert insights and thought leadership on data science, analytics, and digital transformation."
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head> */}
      <Container>
        <section
          id="Blogs"
          className="py-10 px-4"
          aria-labelledby="latest-blogs-heading"
        >
          <h2
            id="latest-blogs-heading"
            className="text-4xl md:text-5xl font-bold font-afacad mb-8 text-gray-800 dark:text-white"
          >
            Latest Blogs
          </h2>

          {loading && <Loader />}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="w-full max-w-6xl mx-auto mb-10">
              <div className="relative overflow-hidden" ref={carouselRef}>
                {/* Carousel container */}
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * cardWidth}%)`,
                  }}
                >
                  {posts.map((post) => (
                    <div
                      key={post.$id}
                      className="flex-shrink-0 pb-8 px-2 hover:scale-105 transition-all"
                      style={{ width: `${cardWidth}%` }}
                    >
                      <div className="bg-gray-200 dark:bg-gray-950/30 rounded-xl overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                        {/* Optional: You can add a placeholder image here */}
                        <div className="h-60 flex items-center justify-center">
                          <img
                            src={post.thumbnail_URL}
                            alt="Blog cover"
                            className="object-cover p-2 rounded-xl w-full h-full"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {post.Title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow mb-4">
                            {post.Description.length > 100
                              ? `${post.Description.slice(0, 120)}...`
                              : post.Description}
                          </p>
                          <p className="text-gray-500 text-sm font-afacad mb-5">
                            {new Date(post.$createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                              }
                            )}
                          </p>
                          <Link
                            href={`/blogs/${post.$id}`}
                            className="flex items-center dark:text-white text-sm mt-auto"
                          >
                            <div className="w-6 h-6 rounded-md bg-gray-600 dark:bg-white flex items-center justify-center mr-2">
                              <ArrowUpRight
                                size={16}
                                className="text-white dark:text-black"
                              />
                            </div>
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex px-2 space-x-4 mt-8">
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  className={`w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center ${
                    currentIndex === 0
                      ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentIndex >= maxIndex}
                  className={`w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center ${
                    currentIndex >= maxIndex
                      ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/blogs/AllBlogs" passHref>
              <ShinyText
                text="Show More Blogs"
                disabled={false}
                speed={2}
                className="text-xl mb-4 drop-shadow-md font-afacad border px-4 rounded-full"
              />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}

export default Blog;
