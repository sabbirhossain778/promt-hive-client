"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";


const essentialsList = [
    {
        title: "Define the Persona:",
        desc: "Start by assigning a specific role e.g., \"Act as a Senior UX Engineer\"."
    },
    {
        title: "Provide Clear Context:",
        desc: "Supply background constraints, input schemas, and targeted output formats."
    },
    {
        title: "Iterative Refining:",
        desc: "Toggle instructions for formatting (e.g. Markdown, JSON) to guide responses."
    }
];

export default function PromptEssentials() {
    return (
        <section className="py-24 relative overflow-hidden bg-[#050B14]">
            
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 relative z-10">
                
                {/* --- Left Text Content --- */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 space-y-8"
                >
                    <div>
                        <span className="flex items-center gap-2 text-[#8B5CF6] font-bold tracking-widest uppercase text-sm mb-4">
                            <Sparkles size={16} /> Learn & Grow
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-6 leading-tight">
                            Prompt Engineering Essentials
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Writing high-performing prompts is a science. AI tools require structures that define context, role constraints, output formats, and temperature.
                        </p>
                    </div>

                    <div className="space-y-6 mt-8">
                        {essentialsList.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="flex gap-4 group"
                            >
                                <CheckCircle2 className="text-[#10b981] shrink-0 mt-1 transition-transform group-hover:scale-110 group-hover:text-[#34d399]" />
                                <div>
                                    <h4 className="text-white font-bold mb-1 group-hover:text-[#a78bfa] transition-colors">{item.title}</h4>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --- Right Code Block / Glassmorphism UI --- */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-1/2 w-full"
                >
                    {/* Floating Animation Wrapper */}
                    <motion.div 
                        animate={{ y: [0, -15, 0] }} 
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-[#0B1120]/80 backdrop-blur-2xl border border-zinc-700/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative group"
                    >
                        {/* Interactive Hover Glow */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#8B5CF6]/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#8B5CF6]/30 transition-colors duration-500"></div>
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#3b82f6]/10 blur-[80px] rounded-full pointer-events-none"></div>
                        
                        {/* Fake Mac Window Header */}
                        <div className="bg-[#121626]/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center gap-2 relative z-10">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-xs text-zinc-500 font-mono ml-4 select-none">structured_prompt.json</span>
                        </div>
                        
                        {/* Code Content (Using <pre> for proper formatting) */}
                        <div className="relative z-10 bg-[#05080f]/50 p-6 overflow-x-auto custom-scrollbar">
                            <pre className="font-mono text-sm md:text-[15px] leading-loose">
                                <code>
                                    <span className="text-white">{"{"}</span>{"\n"}
                                    {"  "}<span className="text-[#38bdf8]">role</span>: <span className="text-[#a3e635]">Senior React Architect</span>,{"\n"}
                                    {"  "}<span className="text-[#38bdf8]">context</span>: <span className="text-[#a3e635]">Optimizing a landing page</span>,{"\n"}
                                    {"  "}<span className="text-[#38bdf8]">instructions</span>: [{"\n"}
                                    {"    "}<span className="text-[#a3e635]">Use HSL variable colors</span>,{"\n"}
                                    {"    "}<span className="text-[#a3e635]">Apply Glassmorphism cards</span>,{"\n"}
                                    {"    "}<span className="text-[#a3e635]">Verify mobile responsiveness</span>{"\n"}
                                    {"  "}],{"\n"}
                                    {"  "}<span className="text-[#38bdf8]">format</span>: <span className="text-[#a3e635]">Vanilla CSS + HTML</span>,{"\n"}
                                    {"  "}<span className="text-[#38bdf8]">temperature"</span>: <span className="text-[#f472b6]">0.2</span>{"\n"}
                                    <span className="text-white">{"}"}</span>
                                </code>
                            </pre>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}