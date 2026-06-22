"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";


// demo review
const reviews = [
    { name: "Sarah Connor", role: "Content Strategist", text: "Prompt Hive completely changed how I interact with Claude. The prompts are highly refined and save me hours every day.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
    { name: "Alex Rivera", role: "Software Engineer", text: "I found an incredible prompt that debugs React code and writes unit tests in seconds. Simply amazing!", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" },
    { name: "Elena Rostova", role: "Digital Artist", text: "The Midjourney prompts here are pure gold. The parameters and keywords are so detailed. Highly recommend!", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" }
];

export default function CustomerReviews() {
    return (
        <section className="py-24 bg-[#05080f] border-t border-zinc-900/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#8B5CF6] font-bold tracking-widest uppercase text-sm mb-2 block">Testimonials</span>
                    <h2 className="text-4xl font-extrabold text-white mb-4">What Users Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="bg-[#0B1120] border border-zinc-800 rounded-2xl p-8 relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} className="fill-amber-400 text-amber-400" />)}
                            </div>
                            <p className="text-zinc-300 italic mb-8 text-sm leading-relaxed">&quot;{review.text}&quot;</p>

                            <div className="flex items-center gap-3 border-t border-zinc-800/80 pt-6 mt-auto">
                                <Image src={review.img} alt={review.name} width={40} height={40} className="rounded-full object-cover" unoptimized />
                                <div>
                                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                                    <p className="text-xs text-zinc-500">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}