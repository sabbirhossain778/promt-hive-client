import React from 'react';
import { User, Copy, Star, Eye, Sparkles, Lock } from "lucide-react";

export default function PromptCard({ prompt }) {
    
    const {
        promptTitle: title = "Untitled Prompt",
        promptDescription: description = "No description provided.",
        category = "Uncategorized",
        aiTool = "UNKNOWN",
        difficulty = "BEGINNER",
        creatorName = "Creator",
        copyCount: copies = 0,
        rating = 0.0,
        isPremium = false,
        thumbnailUrl: imageUrl = "https://placehold.co/600x400/121626/a78bfa?text=No+Image"
    } = prompt;
    
    const displayAiTool = aiTool.toUpperCase();
    const displayDifficulty = difficulty.toUpperCase();

    let toolColors = "bg-[#1c1c21] text-zinc-400 border-zinc-800"; 
    if (displayAiTool.includes("CHATGPT")) toolColors = "bg-[#2d1b4e]/50 text-[#c084fc] border-[#581c87]/50";
    else if (displayAiTool.includes("GEMINI")) toolColors = "bg-[#164e63]/50 text-[#22d3ee] border-[#0891b2]/50";
    else if (displayAiTool.includes("CLAUDE")) toolColors = "bg-[#422006]/50 text-[#facc15] border-[#854d0e]/50";
    else if (displayAiTool.includes("MIDJOURNEY")) toolColors = "bg-[#064e3b]/50 text-[#34d399] border-[#047857]/50";

    return (
        <div className="bg-[#0B1120] border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-all group flex flex-col h-full">
            
            {/* Thumbnail */}
            <div className="w-full h-44 rounded-xl overflow-hidden mb-4 relative bg-[#121626]">
                 <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 

                    onError={(e) => {
                        e.target.src = "https://placehold.co/600x400/121626/a78bfa?text=Image+Not+Found";
                    }}
                />
            </div>

            {/* Badges (AI Tool, Difficulty, Premium) */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-[10px] px-3 py-1 rounded-full border font-bold tracking-wider ${toolColors}`}>
                    {aiTool}
                </span>
                <span className="bg-[#1c1c21] text-zinc-400 border border-zinc-800 text-[10px] px-3 py-1 rounded-full font-bold tracking-wider">
                    {difficulty}
                </span>
                {isPremium && (
                    <span className="bg-[#2d1b24] text-[#f43f5e] border border-[#4a2434] text-[10px] font-bold px-3 py-1 rounded-full tracking-wider ml-auto flex items-center gap-1">
                        <Lock size={10} /> PREMIUM
                    </span>
                )}
            </div>

            {/* Title & Description */}
            <h2 className="text-[17px] font-bold text-zinc-100 mb-2 leading-tight line-clamp-1">
                {title}
            </h2>
            <p className="text-[13px] text-zinc-400 mb-5 line-clamp-2 flex-grow leading-relaxed">
                {description}
            </p>

            {/* Category Tag */}
            <div className="flex items-center gap-1.5 text-[#22d3ee] mb-5">
                <Sparkles size={14} />
                <span className="text-[11px] font-bold tracking-wider uppercase">
                    {category}
                </span>
            </div>

            {/* Footer Info (Creator, Copies, Rating) */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/60 mb-5">
                <div className="flex items-center gap-2 text-zinc-400">
                    <User size={14} />
                    <span className="text-xs font-medium line-clamp-1 max-w-[120px]">{creatorName}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                        <Copy size={14} />
                        <span className="text-xs font-medium">{copies}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                        <Star size={14} className="fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-xs font-medium">{Number(rating).toFixed(1)}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button className="w-full flex items-center justify-center gap-2 bg-[#8B5CF6] text-white font-semibold hover:bg-[#7C3AED] transition-colors rounded-xl py-3 text-sm">
                <Eye size={16} />
                View Details
            </button>
        </div>
    );
}