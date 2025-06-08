import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Container from "../components/container/Container";
import blogService from "../appwrite_controller/service";
import Head from "next/head";
import { Spotlight } from "@/components/ui/Spotlight";

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
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      <Head>
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
      </Head>

      <Container>
        <section
          ref={sectionRef}
          id="Blogs"
          className="py-10 px-4 relative"
          aria-labelledby="relative latest-blogs-heading "
        >
          <Spotlight
            className="-top-10 left-20 md:-top-20 md:left-60 -z-10 dark:invert"
            fill="black"
          />
          <h2
            id="latest-blogs-heading"
            className={`text-4xl md:text-5xl font-bold font-afacad mb-8 text-gray-800 dark:text-white transition-all duration-1000 ${
              isVisible
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-50px]"
            }`}
          >
            Latest Blogs
          </h2>

          {loading && (
            <div className="animate-fade-in-up">
              <Loader />
            </div>
          )}

          {error && (
            <p className="text-center text-red-500 animate-fade-in-up">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div
              className={`w-full max-w-6xl mx-auto mb-10 transition-all duration-1000 delay-300 ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative overflow-hidden" ref={carouselRef}>
                {/* Carousel container */}
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * cardWidth}%)`,
                  }}
                >
                  {posts.map((post, index) => (
                    <div
                      key={post.$id}
                      className={`flex-shrink-0 pb-8 px-2 stagger-animation ${
                        isVisible ? "visible" : ""
                      }`}
                      style={{
                        width: `${cardWidth}%`,
                        animationDelay: `${index * 0.15}s`,
                      }}
                    >
                      <div className="blog-card bg-gray-200 dark:bg-gray-950/30 rounded-xl overflow-hidden h-full flex flex-col relative group">
                        <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

                        <div className="h-60 flex items-center justify-center overflow-hidden">
                          <img
                            src={post.thumbnail_URL}
                            alt="Blog cover"
                            loading="lazy"
                            className="blog-image object-cover p-2 rounded-2xl w-full h-full"
                          />
                        </div>

                        <div className="p-5 flex flex-col flex-grow relative z-20">
                          <p className="text-gray-500 text-sm font-afacad mb-2 transform transition-transform duration-300 group-hover:translate-x-1">
                            {new Date(post.$createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                              }
                            )}
                          </p>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transform transition-transform duration-300 group-hover:translate-x-1">
                            {post.Title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow mb-4 transform transition-transform duration-300 group-hover:translate-x-1">
                            {post.Description.length > 100
                              ? `${post.Description.slice(0, 120)}...`
                              : post.Description}
                          </p>
                          <Link
                            href={`/blogs/${post.$id}`}
                            className="flex items-center dark:text-white text-sm mt-auto transform transition-all duration-300 group-hover:translate-x-2"
                          >
                            <div className="w-6 h-6 rounded-md bg-gray-600 dark:bg-white flex items-center justify-center mr-2 transition-all duration-300 ">
                              <ArrowUpRight
                                size={16}
                                className="text-white dark:text-black transition-all duration-300 group-hover:scale-110"
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
              <div
                className={`flex px-2 space-x-4 mt-8 transition-all duration-1000 delay-500 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-4"
                }`}
              >
                <button
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  className={`nav-button w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-300 ${
                    currentIndex === 0
                      ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-400 hover:text-blue-600 hover:scale-110"
                  }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} className="relative z-10" />
                </button>

                <button
                  onClick={goToNext}
                  disabled={currentIndex >= maxIndex}
                  className={`nav-button w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-300 ${
                    currentIndex >= maxIndex
                      ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-blue-400 hover:text-blue-600 hover:scale-110"
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} className="relative z-10" />
                </button>
              </div>
            </div>
          )}

          <div
            className={`text-center mt-10 transition-all duration-1000 delay-700`}
          >
            <Link href="/blogs/AllBlogs" passHref>
              <ShinyText
                text="Show More Blogs"
                disabled={false}
                speed={2}
                className="text-xl bg-black mb-4 drop-shadow-md font-afacad border-gray-300 border px-7 py-3 rounded-full"
              />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}

export default Blog;
