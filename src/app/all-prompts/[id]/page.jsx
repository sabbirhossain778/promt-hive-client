import { getPromptById } from '@/lib/api/prompts';
import React from 'react';
import Image from 'next/image';
import {
    Bookmark, Flag, Copy, Star,
    User, Eye, Target, Sparkles, AlertCircle, MessageSquare
} from 'lucide-react';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    const prompt = await getPromptById(id);
    const user = await getUserSession();


    const {
        promptTitle: title = "Untitled Prompt",
        promptDescription: description = "No description provided.",
        promptContent: content = "Prompt content goes here...",
        aiTool = "UNKNOWN",
        category = "Uncategorized",
        difficulty = "BEGINNER",
        visibility = "Public",
        copies = 0,
        rating = 0,
        creatorName = "Unknown Creator",
        creatorEmail = "creator@aiverse.com",
        creatorImage
    } = prompt || {};

    if (!user) {
        redirect(`/auth/signin?redirect=/all-prompts/${id}`);
    }

    return (
        <div className="min-h-screen bg-[#050B14] text-zinc-200 p-4 md:p-8 relative overflow-hidden">

            {/* 3D Background Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#3B82F6]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-10">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 leading-tight">
                            {title}
                        </h1>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Action Buttons (Bookmark & Report) */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button className="p-3 rounded-xl bg-[#0c101c] border border-zinc-800/80 text-zinc-400 hover:text-[#8B5CF6] hover:border-[#8B5CF6]/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 transform hover:-translate-y-1">
                            <Bookmark size={20} />
                        </button>
                        <button className="p-3 rounded-xl bg-[#0c101c] border border-zinc-800/80 text-zinc-400 hover:text-red-500 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300 transform hover:-translate-y-1">
                            <Flag size={20} />
                        </button>
                    </div>
                </div>

                {/* --- MAIN GRID LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Prompt Template & Instructions */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Prompt Template Card */}
                        <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl relative group">
                            {/* 3D Top Border Highlight */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent"></div>

                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Sparkles size={20} className="text-[#8B5CF6]" />
                                    Prompt Template
                                </h3>
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#121626] border border-zinc-700/50 rounded-lg text-sm font-medium hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300">
                                    <Copy size={16} />
                                    Copy
                                </button>
                            </div>

                            {/* Prompt Code Block */}
                            <div className="bg-[#05080f] border border-zinc-800/60 rounded-xl p-5 font-mono text-sm md:text-base text-[#d8b4fe] leading-relaxed overflow-x-auto shadow-inner">
                                {content}
                            </div>
                        </div>

                        {/* Usage Instructions */}
                        <div className="space-y-3 pl-2">
                            <h3 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
                                <AlertCircle size={18} className="text-zinc-400" />
                                Usage Instructions
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                For best results, configure your parameters on {aiTool} with low temperature (0.3 - 0.5) to avoid hallucinations. Replace bracketed tags in the template with your target topic details.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Stats & Creator Info */}
                    <div className="space-y-6">

                        {/* Prompt Details Card */}
                        <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <h3 className="text-lg font-bold text-white border-b border-zinc-800/80 pb-4 mb-4">
                                Prompt Details
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">AI Engine</span>
                                    <span className="bg-[#1f1a36] text-[#a78bfa] border border-[#2e235e] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{aiTool}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Category</span>
                                    <span className="bg-[#162724] text-[#2dd4bf] border border-[#1e3b37] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{category}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Difficulty</span>
                                    <span className="text-zinc-200 font-semibold uppercase">{difficulty}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Visibility</span>
                                    <span className="text-zinc-200 font-semibold uppercase">{visibility}</span>
                                </div>

                                <div className="h-px w-full bg-zinc-800/80 my-2"></div>

                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Copies Made</span>
                                    <span className="text-white font-bold">{copies}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Bookmarks</span>
                                    <span className="text-white font-bold">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Community Rating</span>
                                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                                        <Star size={14} className="fill-amber-400" />
                                        {rating} <span className="text-zinc-500 font-normal text-xs">(0)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Creator Card */}
                        <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-zinc-700 transition-colors">
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Creator Information</h3>
                            <div className="flex items-center gap-4">

                                {/* Profile Image with Gradient Border */}
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] p-[2px]">
                                    {creatorImage ? (
                                        <Image
                                            src={creatorImage}
                                            alt={creatorName}
                                            width={48}
                                            height={48}
                                            unoptimized
                                            className="w-full h-full rounded-full object-cover border border-[#0B1120]"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#0B1120] rounded-full flex items-center justify-center">
                                            <User size={20} className="text-zinc-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Creator Details */}
                                <div>
                                    <h4 className="text-white font-bold">{creatorName}</h4>
                                    <p className="text-xs text-zinc-500">{creatorEmail}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- REVIEWS SECTION --- */}
                <div className="pt-8 border-t border-zinc-800/50">
                    <h2 className="text-2xl font-bold text-white mb-6">Community Reviews (0)</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Submit Review Form (Visual Mockup) */}
                        <div className="bg-[#0B1120] border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 bg-[#8B5CF6] h-full opacity-50"></div>

                            <h3 className="text-lg font-bold text-white mb-4">Submit a Review</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Rating</label>
                                    <div className="flex gap-1 cursor-pointer">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={24} className="text-zinc-600 hover:text-amber-400 hover:fill-amber-400 transition-colors" />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Comment</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Write your review here. What worked? How did you test it?"
                                        className="w-full bg-[#05080f] border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button className="w-full py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all transform hover:-translate-y-0.5">
                                    Submit Review
                                </button>
                            </div>
                        </div>

                        {/* Reviews List / Empty State */}
                        <div className="bg-[#0c101c]/50 border border-zinc-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner">
                            <MessageSquare size={40} className="text-zinc-700 mb-4" />
                            <p className="text-zinc-400 text-sm">
                                No reviews submitted yet. Be the first to share your thoughts!
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default PromptDetailsPage;