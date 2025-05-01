import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

import Container from "../components/container/Container";
import blogService from "../appwrite_controller/service";

// Dynamically import components that might use browser-specific APIs
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogService.getBlog();
        setPosts(response.documents.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        <section className="py-10 px-4" id="Blogs" aria-labelledby="latest-blogs-heading">
          <h2
            id="latest-blogs-heading"
            className="text-4xl md:text-5xl font-bold font-afacad mb-8 text-gray-800 dark:text-white"
          >
            Latest Blogs
          </h2>

          {loading && <Loader />}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 rounded-lg p-6 hover:shadow-lg transition-all hover:bg-white/5"
              >
                <h2 className="text-gray-500 uppercase font-michroma_regular dark:text-gray-400 text-sm mb-2">
                  {new Date(post.$createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </h2>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {post.Title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {post.Description.length > 100
                      ? `${post.Description.slice(0, 100)}...`
                      : post.Description}
                  </p>
                </div>

                <Link
                  href={`/blogs/${post.$id}`}
                  className="mt-4 text-blue-600 dark:text-blue-400 text-center"
                  aria-label={`Read more about ${post.Title}`}
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>

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
