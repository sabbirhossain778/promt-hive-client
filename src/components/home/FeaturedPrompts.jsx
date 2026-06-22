"use client";

import { motion } from "framer-motion";
import PromptCard from "../PromptCard";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function FeaturedPrompts({ prompts }) {
    // Framer Motion Variants for Staggered Animation
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* 3D Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                >
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#a78bfa] text-sm font-semibold tracking-wider uppercase">
                            <Sparkles size={16} /> Handpicked
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                            Featured Prompts
                        </h2>
                    </div>
                    <Link href="/all-prompts" className="text-[#a78bfa] hover:text-white font-medium hover:underline transition-all">
                        View all prompts →
                    </Link>
                </motion.div>

                {/* Animated Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {prompts?.map((prompt) => (
                        <motion.div key={prompt._id} variants={item} className="h-full">
                            <PromptCard prompt={prompt} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}