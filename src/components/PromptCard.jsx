import React from 'react';
import { Button } from "@heroui/react";
import { 
    User, 
    Copy, 
    Star, 
    Eye,
    Hash
} from "lucide-react";

export default function PromptCard({ prompt }) {
    return (
        <div className="bg-[#0B1120] border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-all group flex flex-col h-full">
            
            {/* Thumbnail */}
            <div className="w-full h-40 rounded-xl overflow-hidden mb-4 relative">
                <img 
                    src={prompt.thumbnail} 
                    alt={prompt.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-20"></div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-[#0d2a24] text-[#10b981] border border-[#1a4a3e] text-[10px] uppercase font-bold px-2.5 py-1 rounded-full tracking-wider">
                    {prompt.aiTool}
                </span>
                <span className="bg-[#1c1c21] text-zinc-400 border border-zinc-800 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full tracking-wider">
                    {prompt.difficulty}
                </span>
                {prompt.isPremium && (
                    <span className="bg-[#2d1b24] text-[#f43f5e] border border-[#4a2434] text-[10px] uppercase font-bold px-2.5 py-1 rounded-full tracking-wider ml-auto flex items-center gap-1">
                        Premium
                    </span>
                )}
            </div>

            {/* Title & Description */}
            <h2 className="text-lg font-bold text-zinc-100 mb-2 leading-tight line-clamp-1">
                {prompt.title}
            </h2>
            <p className="text-sm text-zinc-500 mb-4 line-clamp-2 flex-grow">
                {prompt.description}
            </p>

            {/* Category Tag */}
            <div className="flex items-center gap-1 text-[#22d3ee] mb-6">
                <Hash size={14} />
                <span className="text-[11px] font-bold tracking-wider uppercase">
                    {prompt.category}
                </span>
            </div>

            {/* Footer Info (Creator, Copies, Rating) */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/80 mb-4">
                <div className="flex items-center gap-2 text-zinc-400">
                    <User size={14} />
                    <span className="text-xs font-medium line-clamp-1 max-w-[120px]">{prompt.creatorName}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-zinc-400">
                        <Copy size={14} />
                        <span className="text-xs font-medium">{prompt.copies}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400">
                        <Star size={14} className="fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-xs font-medium">{prompt.rating}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <Button 
                className="w-full bg-[#8B5CF6] text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:bg-[#7C3AED] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all rounded-xl py-6"
                startContent={<Eye size={18} />}
            >
                View Details
            </Button>
        </div>
    );
}