import { useRouter } from "next/router";
import Head from "next/head";
import data from "./data";
import Loader from "@/components/utility/Loader";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default function IndustryDetails() {
  const { query } = useRouter();
  const industry = data.find((ind) => ind.slug === query.slug);

  if (!industry) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{industry.name} | Inventiff Analytics</title>
        <meta name="description" content={industry.short_description} />
        <meta name="keywords" content={industry.seo_tags?.join(", ")} />
      </Head>

      <div className="relative min-h-max bg-gradient-to-tr from-white to-blue-100 dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:40px_40px] opacity-20 dark:opacity-65 pointer-events-none z-0"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
          <div className="max-w-4xl mt-12 mb-8 flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold font-afacad text-black dark:text-white">
              {industry.name}
            </h1>
            <p className="text-gray-700 dark:text-gray-400 my-2 text-lg sm:text-xl font-afacad font-bold">
              {industry.short_description}
            </p>

            <div className="backdrop-blur-sm my-10 bg-gradient-to-tr from-white to-blue-100/25 dark:from-black/10 dark:to-purple-800/10 px-6 sm:px-10 py-4 transition-all hover:shadow-sm rounded-2xl">
              <h2 className="text-2xl font-afacad font-bold flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-400 my-2 text-lg">
                {industry.long_description}
              </p>
            </div>

            {/* Key Focus Areas */}
            <div className="backdrop-blur-sm my-10 bg-gradient-to-tr from-white to-blue-100/25 dark:from-black/10 dark:to-purple-800/10 px-6 sm:px-10 py-4 transition-all hover:shadow-sm rounded-2xl">
              <h2 className="text-2xl font-afacad font-bold flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Key Focus Areas
              </h2>
              <div className="grid gap-4 my-4">
                {industry.key_focus_areas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-900/40 border border-slate-400/25 dark:border-slate-800 px-4 py-4 rounded-lg flex items-center"
                  >
                    <CircleCheck className="mr-4 text-blue-500" />
                    <p className="text-left">{area}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="w-full lg:w-96 bg-gradient-to-br from-white to-blue-100/25 dark:from-black/10 dark:to-purple-800/10 rounded-2xl md:mt-7 p-6 dark:text-white shadow-xl h-max">
              <h3 className="text-lg font-bold font-afacad mb-4">
                Industry Insights
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="dark:text-blue-100">Focus Areas</span>
                  <span className="font-bold">
                    {industry.key_focus_areas.length}
                  </span>
                </div>
                <div className="w-full bg-blue-400/30 rounded-full h-2">
                  <div
                    className="dark:bg-white bg-purple-950 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 bg-gradient-to-br from-white to-blue-100/25 dark:from-black/10 dark:to-purple-800/10  rounded-2xl mt-7 p-6 dark:text-white shadow-xl h-max">
              <h3 className="text-lg font-bold font-afacad mb-4">
                See Our Products
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p>
                    Innovative data analytics tools designed to transform your
                    business intelligence
                  </p>
                </div>
              </div>
              <div className="w-full mt-10">
                <Link 
                href={'/products/Products'}
                className="w-full dark:bg-slate-900 bg-slate-300 dark:text-white font-semibold py-3 px-4 rounded-xl">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-slate-100 {
          background-image: radial-gradient(
            circle,
            #3d0b52 1px,
            transparent 1px
          );
        }

        .dark .bg-grid-slate-700\\/25 {
          background-image: radial-gradient(
            circle,
            rgba(51, 65, 85) 1px,
            transparent 1px
          );
        }
      `}</style>
    </>
  );
}
