"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Zap, Heart } from "lucide-react";


// demo creator
const creators = [
    { name: "PromptMaster", role: "Senior Engineer", prompts: 42, copies: "1.2k", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop", color: "from-[#8B5CF6] to-[#3B82F6]" },
    { name: "CreativeAI", role: "Art Director", prompts: 28, copies: "980", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", color: "from-[#f43f5e] to-[#f97316]" },
    { name: "GeminiWiz", role: "Writer & Marketer", prompts: 35, copies: "850", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop", color: "from-[#10b981] to-[#0ea5e9]" }
];

export default function TopCreators() {
    return (
        <section className="py-32 relative bg-[#050B14]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-24 relative z-20">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#a78bfa] text-xs font-bold tracking-widest uppercase mb-6">
                        <Award size={14} /> Elite Showcase
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-6 tracking-tight">
                        Top Prompt Creators
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mt-12">
                    {creators.map((creator, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                            className="relative group mt-12 md:mt-0"
                        >
                            {/* Hover Ambient Glow */}
                            <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${creator.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700`}></div>
                            
                            <div className="relative bg-gradient-to-b from-[#0B1120] to-[#05080f] border border-zinc-800/80 rounded-3xl p-8 pt-16 hover:border-zinc-600 transition-colors duration-500 text-center h-full flex flex-col justify-between">
                                
                                {/* Breakout Avatar (Out of the box effect) */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                    <div className="relative w-24 h-24 rounded-full p-1 bg-[#050B14] group-hover:scale-110 transition-transform duration-500">
                                        <div className={`w-full h-full rounded-full p-[2px] bg-gradient-to-br ${creator.color}`}>
                                            <Image 
                                                src={creator.img} alt={creator.name} width={96} height={96} 
                                                className="rounded-full object-cover w-full h-full border-4 border-[#0B1120]" 
                                                unoptimized 
                                            />
                                        </div>
                                        {/* Rank Badge */}
                                        <div className="absolute -bottom-2 right-0 w-8 h-8 rounded-full bg-[#121626] border-2 border-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                            #{idx + 1}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                                        {creator.name}
                                    </h3>
                                    <p className="text-sm text-zinc-500 font-medium">{creator.role}</p>
                                </div>

                                {/* Stats Strip */}
                                <div className="flex items-center justify-between bg-[#121626]/50 rounded-2xl p-4 border border-zinc-800/50">
                                    <div className="flex flex-col items-center w-1/2 border-r border-zinc-800/50">
                                        <div className="flex items-center gap-1.5 text-white font-bold text-xl mb-1">
                                            <Zap size={16} className="text-amber-400" /> {creator.prompts}
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Prompts</span>
                                    </div>
                                    <div className="flex flex-col items-center w-1/2">
                                        <div className="flex items-center gap-1.5 text-white font-bold text-xl mb-1">
                                            <Heart size={16} className="text-rose-500" /> {creator.copies}
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Copies</span>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}