import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import blogService from "../../appwrite_controller/service";
import Loader from "../../components/utility/Loader";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false); // for animation

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await blogService.getBlogById(slug);
        setBlog(response);

        // Wait a tick before showing (blur animation)
        setTimeout(() => {
          setShowContent(true);
        }, 100); 
      } catch (err) {
        setError("Unable to load the blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-black text-red-500">
        {error}
      </div>
    );

  if (!blog) return null;

  return (
    <>
      <Head>
        <title>{blog.Title} | Inventiff Blogs</title>
        <meta name="description" content={blog.Description?.slice(0, 150)} />
        <meta property="og:title" content={blog.Title} />
        <meta property="og:description" content={blog.Description?.slice(0, 150)} />
      </Head>

      <div className="min-h-screen bg-gradient-to-tr dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8 flex items-start justify-center">
        <div
          className={`
            w-full max-w-4xl mt-12 transition-all duration-700 ease-out
            ${showContent ? "blur-0 opacity-100" : "blur-sm opacity-0"}
          `}
        >
          <h2 className="text-gray-500 dark:text-gray-400 uppercase font-michroma_regular text-sm mb-2">
            {new Date(blog.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </h2>

          <h1 className="text-3xl sm:text-4xl font-bold font-afacad text-black dark:text-white mb-6 leading-snug">
            {blog.Title}
          </h1>

          <div className="text-base sm:text-lg leading-relaxed font-poppins text-gray-800 dark:text-gray-300 mb-12 whitespace-pre-line">
            {blog.Description}
          </div>

          <p className="text-sm font-medium text-gray-700 dark:text-gray-400 pb-28">
            — {blog.Author}
          </p>
        </div>
      </div>
    </>
  );
}
