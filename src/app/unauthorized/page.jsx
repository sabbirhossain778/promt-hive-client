"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowLeft, ShieldAlert, Crown } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-[#050B14] flex items-center justify-center overflow-hidden font-sans select-none">
            
            {/* Ambient 3D Glowing Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-rose-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-purple-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 max-w-lg w-full p-8 flex flex-col items-center text-center">
                
                {/* 3D Floating Lock Animation */}
                <div className="relative mb-10 group perspective-[1000px]">
                    {/* The 3D Cube/Box */}
                    <div className="w-32 h-32 relative animate-[float_5s_ease-in-out_infinite] transform-gpu transition-all duration-700 hover:scale-110">
                        
                        {/* Deep Glow Behind */}
                        <div className="absolute inset-0 bg-rose-500/40 blur-2xl rounded-3xl" />
                        
                        {/* Premium Glassmorphism Card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/80 to-zinc-950/80 backdrop-blur-xl border border-zinc-700/50 rounded-3xl shadow-[0_20px_50px_rgba(225,29,72,0.3)] flex items-center justify-center overflow-hidden">
                            {/* Inner Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent opacity-60" />
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl" />
                            
                            <Lock className="w-14 h-14 text-rose-400 drop-shadow-[0_0_15px_rgba(225,29,72,0.6)] relative z-10" />
                        </div>
                    </div>
                </div>

                {/* Typography */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-600 mb-4 tracking-tight">
                    Access Denied
                </h1>
                
                <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
                    You don't have permission to view this page. This area is restricted to authorized personnel or <span className="text-amber-400 font-semibold inline-flex items-center gap-1 mx-1"><Crown className="w-4 h-4"/> Premium</span> members only.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button 
                        onClick={() => router.back()}
                        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl transition-all duration-300 shadow-lg"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Go Back
                    </button>

                    <Link 
                        href="/plans"
                        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        Upgrade to Premium
                    </Link>
                </div>
            </div>

            {/* Custom Keyframes for 3D Floating Effect */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float {
                    0% { transform: translateY(0px) rotateX(5deg) rotateY(-5deg); }
                    33% { transform: translateY(-15px) rotateX(-5deg) rotateY(10deg); }
                    66% { transform: translateY(-5px) rotateX(10deg) rotateY(-10deg); }
                    100% { transform: translateY(0px) rotateX(5deg) rotateY(-5deg); }
                }
            `}} />
        </div>
    );
}