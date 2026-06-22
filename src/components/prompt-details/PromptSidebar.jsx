import React from 'react';
import Image from 'next/image';
import { Star, User } from 'lucide-react';

export default function PromptSidebar({ prompt }) {
    const { aiTool, category, difficulty, visibility, copies, rating, creatorName, creatorEmail, creatorImage } = prompt;

    return (
        <>
            <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <h3 className="text-lg font-bold text-white border-b border-zinc-800/80 pb-4 mb-4">Prompt Details</h3>
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
                        <span className={`font-semibold uppercase ${visibility === 'Private' ? 'text-amber-400' : 'text-zinc-200'}`}>{visibility}</span>
                    </div>

                    <div className="h-px w-full bg-zinc-800/80 my-2"></div>

                    <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Copies Made</span>
                        <span className="text-white font-bold">{copies}</span>
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

            <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-zinc-700 transition-colors">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Creator Information</h3>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] p-[2px]">
                        {creatorImage ? (
                            <Image src={creatorImage} alt={creatorName} width={48} height={48} unoptimized className="w-full h-full rounded-full object-cover border border-[#0B1120]" />
                        ) : (
                            <div className="w-full h-full bg-[#0B1120] rounded-full flex items-center justify-center">
                                <User size={20} className="text-zinc-300" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="text-white font-bold">{creatorName}</h4>
                        <p className="text-xs text-zinc-500">{creatorEmail}</p>
                    </div>
                </div>
            </div>
        </>
    );
}