import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";

export default function IndustryCard({ industry }) {
    const [isHover, setIsHover] = useState(false)

  return (
    <div className="bg-white dark:bg-black/40 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-lg transition-all hover:scale-105"
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex justify-between">
        <h3 className="text-xl font-afacad font-bold dark:text-white text-gray-900 mb-2">
          {industry.name}
        </h3>
        <Building2 />
      </div>
      <p className="dark:text-gray-400 text-sm mb-4">
        {industry.short_description}
      </p>
      <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>Industry Focus</span>
            <span>{industry.key_focus_areas?.length || 0} areas</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-700 to-purple-400 rounded-full transform origin-left transition-all duration-1000 group-hover:scale-x-110"
              style={{ width: `${Math.min(((industry.key_focus_areas?.length || 0) / 8) * 100, 100)}%` }}
            />
          </div>
        </div>
      <Link
        href={`/industries/${industry.slug}`}
        className="text-sm font-afacad text-purple-500 dark:text-purple-400 font-semibold flex items-center gap-2 border-t pt-4 border-gray-200 dark:border-gray-700 w-fit"
      >
        <span className="border-b border-purple-400/70">Know more</span>
        <ArrowUpRight
          size={16}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
