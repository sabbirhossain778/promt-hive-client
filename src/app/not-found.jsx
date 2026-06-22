"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Hexagon } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    // Floating animation for Hexagons
    const floatVariant = {
        animate: {
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0B0B0F]">
            
            {/* Background Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#8B5CF6]/10 blur-[120px] rounded-full pointer-events-none"></div>
            
            {/* Subtle Dot Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
                
                {/* 404 Visual Section */}
                <div className="relative flex justify-center items-center mb-8">
                    
                    {/* Giant 404 Text */}
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 select-none"
                    >
                        404
                    </motion.h1>

                    {/* Floating Hive Elements (Hexagons) */}
                    <motion.div variants={floatVariant} animate="animate" className="absolute -top-4 -left-12 text-[#8B5CF6]/60 blur-[1px]">
                        <Hexagon size={64} strokeWidth={1} />
                    </motion.div>
                    <motion.div variants={floatVariant} animate="animate" transition={{ delay: 1 }} className="absolute bottom-12 -right-8 text-violet-400/40">
                        <Hexagon size={48} strokeWidth={1.5} />
                    </motion.div>
                    <motion.div variants={floatVariant} animate="animate" transition={{ delay: 2 }} className="absolute top-1/2 right-1/4 text-zinc-500/30">
                        <Hexagon size={32} strokeWidth={2} />
                    </motion.div>
                </div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                        Missing Node in the Hive
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    
                    <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                        We searched the entire network, but the prompt or page you are looking for doesn't exist. It might have been moved or deleted.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                        
                        <Link href="/">
                            <button className="flex items-center gap-2 px-8 py-3.5 bg-[#8B5CF6] text-white rounded-full font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:bg-[#7c4deb] transition-all">
                                <Home size={18} />
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}