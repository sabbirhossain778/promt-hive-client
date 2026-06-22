"use client";

import React from "react";
import { Bot, Sparkles, Cpu, Image as ImageIcon, Code2, Layers } from "lucide-react";

const engines = [
    { 
        name: "ChatGPT", model: "GPT-4o / GPT-4", 
        desc: "Complex reasoning, detailed programming architectures, logic refinement.", 
        icon: <Bot size={26} />, 
        iconColor: "text-[#10b981]", gradient: "from-[#10b981] to-[#059669]", border: "group-hover:border-[#10b981]/50", glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]" 
    },
    { 
        name: "Gemini", model: "Gemini 1.5 Pro", 
        desc: "Ultra-long context windows, deep code analysis, Workspace syncing.", 
        icon: <Sparkles size={26} />, 
        iconColor: "text-[#3b82f6]", gradient: "from-[#3b82f6] to-[#2563eb]", border: "group-hover:border-[#3b82f6]/50", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
    },
    { 
        name: "Claude", model: "Claude 3.5 Sonnet", 
        desc: "Premium programmatic output, highly natural copywriting, markdown structuring.", 
        icon: <Cpu size={26} />, 
        iconColor: "text-[#f59e0b]", gradient: "from-[#f59e0b] to-[#d97706]", border: "group-hover:border-[#f59e0b]/50", glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]" 
    },
    { 
        name: "Midjourney", model: "Midjourney v6", 
        desc: "Highly artistic rendering, aspect-ratio configuration, photo-realism parameters.", 
        icon: <ImageIcon size={26} />, 
        iconColor: "text-[#d946ef]", gradient: "from-[#d946ef] to-[#c026d3]", border: "group-hover:border-[#d946ef]/50", glow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.2)]" 
    },
    { 
        name: "DALL-E 3", model: "OpenAI Image Gen", 
        desc: "Text-to-image integration, creative asset generation, conceptual visualization.", 
        icon: <Layers size={26} />, 
        iconColor: "text-[#14b8a6]", gradient: "from-[#14b8a6] to-[#0d9488]", border: "group-hover:border-[#14b8a6]/50", glow: "group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]" 
    },
    { 
        name: "Copilot", model: "GitHub / Microsoft", 
        desc: "IDE code completion, context-aware suggestions, instant bug fixing.", 
        icon: <Code2 size={26} />, 
        iconColor: "text-[#a855f7]", gradient: "from-[#a855f7] to-[#9333ea]", border: "group-hover:border-[#a855f7]/50", glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]" 
    }
];

export default function EngineCompatibility() {
    return (
        <section className="py-32 bg-[#030508] border-y border-zinc-900/60 overflow-hidden relative">
            
            {/* Embedded Scoped CSS for 100% Reliability */}
            <style dangerouslySetInnerHTML={{__html: `
                .scene-wrapper {
                    perspective: 1500px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 480px;
                    margin-top: 3rem;
                }
                .ring-wrapper {
                    width: 330px;
                    height: 250px;
                    position: relative;
                    transform-style: preserve-3d;
                    animation: spin-ring 30s infinite linear;
                }
                .scene-wrapper:hover .ring-wrapper {
                    animation-play-state: paused;
                }
                @keyframes spin-ring {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(-360deg); }
                }
                .card-3d-item {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden; 
                    -webkit-backface-visibility: hidden;
                    transform-style: preserve-3d;
                }
                @media (max-width: 768px) {
                    .scene-wrapper {
                        transform: scale(0.65);
                        margin-top: 0;
                        height: 350px;
                    }
                }
            `}} />

            {/* Subtle Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3b82f6]/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Ultra-Modern Header */}
                <div className="text-center relative z-20">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                        <Cpu size={14} className="text-[#8B5CF6]" />
                        Multi-Platform Integrations
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                        Engine Compatibility
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Prompts on Prompt Hive are scientifically tailored. We exploit the distinct reasoning capabilities of individual models to generate production-ready outputs.
                    </p>
                </div>
            </div>

            {/* 3D Scene Wrapper */}
            <div className="scene-wrapper relative z-20">
                <div className="ring-wrapper">
                    {engines.map((engine, index) => {
                        const angle = index * 60; 
                        
                        return (
                            <div 
                                key={index} 
                                className={`card-3d-item group bg-gradient-to-b from-[#0B1120] to-[#05080f] border border-zinc-800 rounded-3xl p-6 transition-all duration-500 cursor-pointer overflow-hidden ${engine.glow} ${engine.border}`}
                                style={{ 
                                    transform: `rotateY(${angle}deg) translateZ(400px)` 
                                }}
                            >
                                {/* Top Glass Highlight */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Icon & Model Badge */}
                                <div className="flex justify-between items-start mb-5">
                                    <div className={`p-3 rounded-2xl bg-[#030508] border border-zinc-800/80 shadow-inner group-hover:scale-110 transition-transform duration-500 ${engine.iconColor}`}>
                                        {engine.icon}
                                    </div>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-zinc-300 tracking-wider">
                                        {engine.model}
                                    </span>
                                </div>

                                {/* Text Content */}
                                <h3 className={`text-2xl font-black tracking-wide mb-2 text-transparent bg-clip-text bg-gradient-to-r ${engine.gradient}`}>
                                    {engine.name}
                                </h3>
                                <p className="text-zinc-400 text-[13px] leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                    {engine.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </section>
    );
}