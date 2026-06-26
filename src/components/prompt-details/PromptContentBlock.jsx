"use client";
import React, { useState } from 'react';
import { Copy, Sparkles, AlertCircle, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { incrementCopyCount } from '@/lib/actions/bookmark';


export default function PromptContentBlock({ content, aiTool, initialCopies, isLocked, promptId }) {
    const router = useRouter();
    const [copies, setCopies] = useState(initialCopies);

    const handleCopy = async () => {
        if (isLocked) return;
        try {
            await navigator.clipboard.writeText(content);
            setCopies(prev => prev + 1);
            await incrementCopyCount(promptId);
            toast.success('Prompt copied to clipboard!');
        } catch (err) {
            setCopies(prev => prev - 1);
            toast.error('Failed to copy prompt.');
        }
    };

    return (
        <>
            <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent"></div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles size={20} className="text-[#8B5CF6]" />
                        Prompt Template
                    </h3>
                    {!isLocked && (
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 bg-[#121626] border border-zinc-700/50 rounded-lg text-sm font-medium hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300"
                        >
                            <Copy size={16} />
                            Copy ({copies})
                        </button>
                    )}
                </div>

                {/* Prompt Content Area */}
                <div className={`relative bg-[#05080f] border border-zinc-800/60 rounded-xl font-mono text-sm md:text-base leading-relaxed overflow-hidden shadow-inner transition-all duration-300 ${isLocked ? 'min-h-[380px] p-0' : 'p-5 min-h-[150px]'}`}>

                    {isLocked ? (
                        <>
                            {/* Blurred Content Background */}
                            <div className="absolute inset-0 p-5 text-zinc-500 blur-md opacity-30 select-none overflow-hidden pointer-events-none">
                                {content.substring(0, 500)}... [Content locked for premium users. Please subscribe to unlock the full potential of this high-quality prompt. Discover the magic of AI.]
                            </div>

                            {/* Premium Overlay Wrapper */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050B14]/60 backdrop-blur-md z-20 p-4">

                                {/* Perfect Glass Card */}
                                <div className="relative flex flex-col items-center p-8 bg-[#121827]/70 border border-white/10 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-sm w-full backdrop-blur-xl group">

                                    {/* Inner Glow behind the lock */}
                                    <div className="absolute top-12 w-28 h-28 bg-amber-500/20 blur-[50px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-amber-500/30"></div>

                                    {/* Glowing Lock Icon */}
                                    <div className="relative z-10 flex items-center justify-center w-16 h-16 mb-5 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-600 shadow-[0_0_25px_rgba(245,158,11,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] transform group-hover:scale-105 transition-transform duration-300">
                                        <Lock size={26} className="text-[#451a03] drop-shadow-sm" />
                                    </div>

                                    {/* Texts */}
                                    <h3 className="relative z-10 text-2xl font-bold text-white mb-2 tracking-wide">
                                        Premium Prompt
                                    </h3>
                                    <p className="relative z-10 text-sm text-zinc-400 mb-8 text-center leading-relaxed">
                                        Subscribe to unlock this high-quality prompt, copy it directly, and leave reviews.
                                    </p>

                                    {/* Clean Action Button */}
                                    <button
                                        onClick={() => router.push('/payment')}
                                        className="relative z-10 w-full px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#451a03] font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Sparkles size={18} />
                                        <span>Unlock Now</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-[#d8b4fe] whitespace-pre-wrap p-5">
                            {content}
                        </div>
                    )}
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
        </>
    );
}
