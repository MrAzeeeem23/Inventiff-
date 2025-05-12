import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import blogService from "../../appwrite_controller/service";
import Loader from "../../components/utility/Loader";
import ShinyText from "@/animations/ShinyText";
import Link from "next/link";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await blogService.getBlogById(slug);
        setBlog(response);
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
        <meta
          property="og:description"
          content={blog.Description?.slice(0, 150)}
        />
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

          <div className="prose prose-lg max-w-none dark:prose-invert font-poppins text-gray-800 dark:text-gray-300 mb-12">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold mt-5 mb-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
                ),
                p: ({ node, ...props }) => <p className="my-3" {...props} />,
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 my-3" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 my-3" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="ml-2 my-1" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto my-4"
                    {...props}
                  />
                ),
              }}
            >
              {blog.Description || ""}
            </ReactMarkdown>
          </div>

          <p className="text-sm font-medium text-gray-700 dark:text-gray-400 pb-28">
            — {blog.Author}
          </p>
        <div className="text-center">
          <Link href="/blogs/AllBlogs" passHref>
            <ShinyText
              text="More Blogs"
              disabled={false}
              speed={2}
              className="text-2xl mb-4 drop-shadow-md font-afacad border px-4 rounded-full"
            />
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}
