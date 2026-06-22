"use client";
import React from 'react';
import { Copy, Sparkles, AlertCircle, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function PromptContentBlock({ content, aiTool, isLocked, promptId }) {
    const router = useRouter();

    const handleCopy = async () => {
        if (isLocked) return;
        try {
            await navigator.clipboard.writeText(content);
            // TODO: API Call to increment copy count -> await axios.post(`/api/prompts/${promptId}/copy`)
            toast.success('Prompt copied to clipboard!');
        } catch (err) {
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
                            Copy
                        </button>
                    )}
                </div>

                {/* Prompt Content Area */}
                <div className="relative bg-[#05080f] border border-zinc-800/60 rounded-xl p-5 font-mono text-sm md:text-base leading-relaxed overflow-hidden shadow-inner min-h-[150px]">
                    
                    {isLocked ? (
                        <>
                            {/* Blurred Content Dummy Text */}
                            <div className="text-[#d8b4fe] blur-[6px] opacity-40 select-none">
                                {content.substring(0, 200)}... [Content locked for premium users. Please subscribe to unlock the full potential of this high-quality prompt.]
                            </div>
                            
                            {/* Premium Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05080f]/60 backdrop-blur-sm z-20">
                                <Lock size={40} className="text-amber-400 mb-3" />
                                <h3 className="text-xl font-bold text-white mb-2">Premium Prompt</h3>
                                <p className="text-sm text-zinc-400 mb-4 text-center px-4">Subscribe to unlock this prompt and copy it directly.</p>
                                <button 
                                    onClick={() => router.push('/payment')} // Redirect to payment
                                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105"
                                >
                                    Subscribe to Premium
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-[#d8b4fe] whitespace-pre-wrap">
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