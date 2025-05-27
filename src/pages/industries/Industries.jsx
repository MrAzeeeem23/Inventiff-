import React from "react";
import data from "./data";
import IndustryCard from "./IndustryCard";

function Industries() {
  return (
    <>
      <section className="relative min-h-max bg-gradient-to-tr from-white to-blue-900/20 dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:40px_40px] opacity-20 dark:opacity-70"></div>
        <div className="max-w-4xl mt-12 mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-afacad text-black dark:text-white">
            Industries
          </h1>
          <p className="text-lg font-Poppins dark:text-white my-8 ">
            At Inventiff Analytics, we bring deep domain expertise and advanced
            analytics capabilities to a range of industries. Our mission is to
            empower organizations with data-driven decision-making, tailored
            insights, and cutting-edge technology—ensuring growth, innovation,
            and competitive advantage.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>
      </section>
      <style jsx>{`
        .bg-grid-slate-100 {
          background-image: radial-gradient(
            circle,
            #3d0b52 1px,
            transparent 1px
          );
        }

        .dark .bg-grid-slate-700\/25 {
          background-image: radial-gradient(
            circle,
            rgba(51, 65, 85, 0.25) 1px,
            transparent 1px
          );
        }
      `}</style>
    </>
  );
}

export default Industries;
