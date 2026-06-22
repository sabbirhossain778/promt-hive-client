"use client";

import Link from "next/link";
import { Magnifier, ArrowRight, Sparkles } from "@gravity-ui/icons";

export default function HeroSection() {
  const trendingTags = [
    "#SEO Optimize",
    "#React Component",
    "#Copywriter",
    "#Midjourney V6",
    "#Gemini Code Helper",
    "#Claude Architect",
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 py-20 bg-[#050B14] overflow-hidden">
      
      {/* Top Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-[#A78BFA] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full">
        <Sparkles width={16} height={16} />
        <span>The Ultimate Prompt Hub</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white text-center leading-tight mb-6 max-w-4xl tracking-tight">
        Unlock the True Potential of <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Generative AI
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-base md:text-lg lg:text-xl text-center max-w-2xl mb-10 leading-relaxed">
        Discover, bookmark, and run engineering-grade prompts for ChatGPT,
        Gemini, Claude, and Midjourney. Boost your productivity today.
      </p>

      {/* Search Form */}
      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="flex items-center w-full max-w-2xl bg-[#0B1120] border border-gray-700/60 rounded-full p-1.5 mb-8 focus-within:border-[#8B5CF6] focus-within:ring-1 focus-within:ring-[#8B5CF6]/50 transition-all shadow-lg"
      >
        <div className="pl-4 pr-2 text-gray-400">
          <Magnifier width={20} height={20} />
        </div>
        <input
          type="text"
          placeholder="Search by title, tag, or AI tool (e.g. 'React', 'Gemini')..."
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm md:text-base px-2 w-full"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium rounded-full transition-colors"
        >
          Explore
        </button>
      </form>

      {/* Trending Tags */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12 text-sm max-w-4xl">
        <span className="text-gray-400 flex items-center gap-1 cursor-default">
          <span className="text-lg leading-none">↗</span> Trending:
        </span>
        {trendingTags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 bg-[#0B1120] border border-gray-800 text-gray-300 rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          href="/all-prompts"
          className="flex items-center gap-2 px-8 py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
        >
          Explore All Prompts
          <ArrowRight width={18} height={18} />
        </Link>
        <Link 
          href="/auth/signup"
          className="px-8 py-3.5 bg-[#0B1120] hover:bg-gray-800 border border-gray-700 text-white font-semibold rounded-full transition-all"
        >
          Become a Creator
        </Link>
      </div>

    </section>
  );
}