"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from "@heroui/react";
import { Search, SlidersHorizontal } from "lucide-react";
import PromptCard from '@/components/PromptCard';

// --- Mock Data ---
const mockPrompts = [
    {
        _id: "1",
        title: "Cum et earum dolores",
        description: "Qui veniam aut ad q...",
        category: "Idea Generation",
        aiTool: "Midjourney",
        difficulty: "Intermediate",
        creatorName: "Creator",
        copies: 0,
        rating: 0.0,
        isPremium: true,
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    },
    {
        _id: "2",
        title: "Claude 3.5 Sonnet Fullstack Architect",
        description: "Creates optimal database schemas and corresponding backend route templates with security validations.",
        category: "Coding",
        aiTool: "Claude",
        difficulty: "Pro",
        creatorName: "Prompt Engineer Creator",
        copies: 211,
        rating: 5.0,
        isPremium: false,
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
    },
    {
        _id: "3",
        title: "Gemini Long-form SEO Content Copywriter",
        description: "Structures comprehensive outline drafts for blog articles optimizing selected Google keywords.",
        category: "Writing",
        aiTool: "Gemini",
        difficulty: "Beginner",
        creatorName: "Prompt Engineer Creator",
        copies: 65,
        rating: 1.0,
        isPremium: false,
        thumbnail: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2670&auto=format&fit=crop"
    }
];

const FILTER_OPTIONS = {
    aiEngine: ["All", "ChatGPT", "Gemini", "Claude", "Midjourney", "Stable Diffusion", "Other"],
    category: ["All", "Coding", "Writing", "Marketing", "Graphics & Image", "Idea Generation", "System Assistant"],
    difficulty: ["All", "Beginner", "Intermediate", "Pro"]
};

export default function AllPromptsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSearch = searchParams.get('search') || "";
    const currentSort = searchParams.get('sort') || "Latest";
    const currentAIEngine = searchParams.get('aiEngine') || "All";
    const currentCategory = searchParams.get('category') || "All";
    const currentDifficulty = searchParams.get('difficulty') || "All";

    const [searchInput, setSearchInput] = useState(currentSearch);

    const updateQueryParams = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "All") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        updateQueryParams('search', searchInput);
    };

    const handleReset = () => {
        setSearchInput("");
        router.push(pathname, { scroll: false });
    };

    return (
        <div className="min-h-screen bg-[#050B14] p-4 lg:p-8">
            <div className="max-w-350 mx-auto flex flex-col lg:flex-row gap-8">

                {/* SIDEBAR FILTERS */}
                <aside className="w-full lg:w-72 shrink-0 space-y-6">
                    <div className="bg-[#0B1120] border border-zinc-800/80 rounded-2xl p-5 sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-white font-bold text-lg">
                                <SlidersHorizontal size={20} />
                                <span>Filters</span>
                            </div>
                            <button onClick={handleReset} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                Reset
                            </button>
                        </div>

                        {/* AI Engine Filter */}
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">AI Engine</h3>
                            <div className="flex flex-col gap-1">
                                {FILTER_OPTIONS.aiEngine.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => updateQueryParams('aiEngine', item)}
                                        className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${currentAIEngine === item
                                                ? "bg-[#1f1a36] text-[#a78bfa] font-medium border border-[#2e235e]"
                                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 border border-transparent"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Category</h3>
                            <div className="flex flex-col gap-1">
                                {FILTER_OPTIONS.category.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => updateQueryParams('category', item)}
                                        className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${currentCategory === item
                                                ? "bg-[#1f1a36] text-[#a78bfa] font-medium border border-[#2e235e]"
                                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 border border-transparent"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Difficulty</h3>
                            <div className="flex flex-col gap-1">
                                {FILTER_OPTIONS.difficulty.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => updateQueryParams('difficulty', item)}
                                        className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${currentDifficulty === item
                                                ? "bg-[#1f1a36] text-[#a78bfa] font-medium border border-[#2e235e]"
                                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 border border-transparent"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div className="flex-1 space-y-6 min-w-0">

                    {/* TOP BAR */}
                    <div className="flex flex-col md:flex-row items-center gap-4 bg-[#0B1120] border border-zinc-800/80 rounded-2xl p-2 pl-4">
                        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            <span className="text-sm text-zinc-500 mr-2 whitespace-nowrap">Sort By:</span>
                            {["Latest", "Most Popular", "Most Copied"].map(sortOption => (
                                <button
                                    key={sortOption}
                                    onClick={() => updateQueryParams('sort', sortOption)}
                                    className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${currentSort === sortOption
                                            ? "bg-[#1a1c29] text-white border border-zinc-700 font-medium"
                                            : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    {sortOption}
                                </button>
                            ))}
                        </div>

                        <div className="hidden md:block w-1px h-8 bg-zinc-800 mx-2"></div>

                        {/* Search Bar (Fixed using Standard HTML Input) */}
                        <form onSubmit={handleSearch} className="flex-1 w-full flex items-center relative">
                            <div className="relative w-full">
                                {/* Search Icon */}
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="text-zinc-500 w-4 h-4" />
                                </div>

                                {/* Custom Input Field */}
                                <input
                                    type="text"
                                    placeholder="Search by title, tags, or AI tool..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-full bg-[#121626] border border-zinc-800 hover:border-zinc-700 focus:border-[#8B5CF6] focus:outline-none text-white text-sm rounded-lg pl-10 pr-4 py-2.5 transition-colors"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Prompt Card! */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {mockPrompts.map((prompt) => (
                            <PromptCard key={prompt._id} prompt={prompt} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}