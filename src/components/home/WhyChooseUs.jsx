"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Diamond } from "lucide-react";

const benefits = [
    {
        icon: <Zap size={32} className="text-[#a78bfa]" />,
        title: "Production Ready",
        desc: "Every prompt is thoroughly checked, curated, and optimized to run flawlessly on target engines without tweaking.",
        color: "from-[#8B5CF6]/20 to-transparent",
        borderColor: "group-hover:border-[#8B5CF6]/50"
    },
    {
        icon: <ShieldCheck size={32} className="text-[#2dd4bf]" />,
        title: "Admin Moderation",
        desc: "No spam or garbage templates. Our administrators approve prompts manually to guarantee the highest community quality.",
        color: "from-[#0d9488]/20 to-transparent",
        borderColor: "group-hover:border-[#2dd4bf]/50"
    },
    {
        icon: <Diamond size={32} className="text-[#f43f5e]" />,
        title: "Premium Marketplace",
        desc: "Support prompt engineers directly. Access private expert prompts with a single-click lifetime subscription upgrade.",
        color: "from-[#e11d48]/20 to-transparent",
        borderColor: "group-hover:border-[#f43f5e]/50"
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* title */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-[#8B5CF6] font-bold tracking-widest uppercase text-sm mb-2 block">Our Benefits</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Why Choose Prompt Hive?</h2>
                    <p className="text-zinc-400 text-lg">We build the bridge between simple AI queries and high-yield prompt engineering.</p>
                </motion.div>

                {/* cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -10 }} // 3D float effect on hover
                            className={`group relative bg-[#0B1120] border border-zinc-800 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] ${item.borderColor}`}
                        >
                            {/* Inner Gradient Glow */}
                            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                            
                            <div className="w-16 h-16 rounded-2xl bg-[#121626] border border-zinc-700/50 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
                                {item.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 relative z-10">{item.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm relative z-10">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}