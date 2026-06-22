"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, SlidersHorizontal } from "lucide-react";
import { ChevronDown, ChevronUp } from '@gravity-ui/icons';
import PromptCard from '@/components/PromptCard';
import { getAllPrompts } from '@/lib/api/prompts';


const FILTER_OPTIONS = {
    aiEngine: ["All", "ChatGPT", "Gemini", "Claude", "Midjourney", "Stable Diffusion", "Other"],
    category: ["All", "Coding", "Writing", "Marketing", "Graphics & Image", "Idea Generation", "System Assistant"],
    difficulty: ["All", "Beginner", "Intermediate", "Pro"]
};

export default function AllPromptsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [openFilters, setOpenFilters] = useState({
        aiEngine: true,
        category: false,
        difficulty: false
    });

    useEffect(() => {
        const fetchPrompts = async () => {
            setIsLoading(true);
            try {
                const params = Object.fromEntries(searchParams.entries());
                const data = await getAllPrompts(params);
                console.log('All Prompts from API:', data);
                setPrompts(data);
            } catch (error) {
                console.error("Failed to fetch prompts", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrompts();
    }, [searchParams]);

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
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="bg-[#0B1120] border border-zinc-800/80 rounded-2xl p-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#0B1120] z-10 pb-2">
                            <div className="flex items-center gap-2 text-white font-bold text-lg">
                                <SlidersHorizontal size={20} />
                                <span>Filters</span>
                            </div>
                            <button onClick={handleReset} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                Reset
                            </button>
                        </div>

                        {/* AI Engine Filter */}
                        <div className="mb-4">
                            <button
                                onClick={() => setOpenFilters({ ...openFilters, aiEngine: !openFilters.aiEngine })}
                                className="flex items-center justify-between w-full text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 hover:text-zinc-300 transition-colors"
                            >
                                AI Engine
                                {openFilters.aiEngine ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {openFilters.aiEngine && (
                                <div className="flex flex-col gap-1 transition-all">
                                    {FILTER_OPTIONS.aiEngine.map(item => (
                                        <button
                                            key={item}
                                            onClick={() => updateQueryParams('aiEngine', item)}
                                            className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${currentAIEngine === item
                                                ? "bg-[#1f1a36] text-[#a78bfa] font-medium border border-[#2e235e]"
                                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="mb-4">
                            <button
                                onClick={() => setOpenFilters({ ...openFilters, category: !openFilters.category })}
                                className="flex items-center justify-between w-full text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 hover:text-zinc-300 transition-colors"
                            >
                                Category
                                {openFilters.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {openFilters.category && (
                                <div className="flex flex-col gap-1 transition-all">
                                    {FILTER_OPTIONS.category.map(item => (
                                        <button
                                            key={item}
                                            onClick={() => updateQueryParams('category', item)}
                                            className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${currentCategory === item
                                                ? "bg-[#1f1a36] text-[#a78bfa] font-medium border border-[#2e235e]"
                                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <button
                                onClick={() => setOpenFilters({ ...openFilters, difficulty: !openFilters.difficulty })}
                                className="flex items-center justify-between w-full text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 hover:text-zinc-300 transition-colors"
                            >
                                Difficulty
                                {openFilters.difficulty ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                            {openFilters.difficulty && (
                                <div className="flex flex-col gap-1 transition-all">
                                    {FILTER_OPTIONS.difficulty.map(item => (
                                        <button
                                            key={item}
                                            onClick={() => updateQueryParams('difficulty', item)}
                                            className={`text-left px-3 py-2 rounded-xl text-sm transition-all ${currentDifficulty === item
                                                ? "bg-[#1f1a36] text-[#a78bfa] font-medium border border-[#2e235e]"
                                                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
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
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearchInput(value);
                                        updateQueryParams('search', value);
                                    }}
                                    className="w-full bg-[#121626] border border-zinc-800 hover:border-zinc-700 focus:border-[#8B5CF6] focus:outline-none text-white text-sm rounded-lg pl-10 pr-4 py-2.5 transition-colors"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Prompt Card! */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {prompts.map((prompt) => (
                            <PromptCard key={prompt._id} prompt={prompt} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}