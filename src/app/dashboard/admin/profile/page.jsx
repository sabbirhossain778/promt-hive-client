import React from 'react';
import Image from 'next/image';
import { Mail, FileText, BadgeCheck, AlertCircle } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';


export default async function AdminProfilePage() {

    const user = await getUserSession();

    const userName = user?.name;
    const userEmail = user?.email;
    const userImage = user?.image;
    const userRole = (user?.role || "ADMIN").toUpperCase();
    const userPlan = user?.plan ? user.plan.replace('_', ' ').toUpperCase() : "FREE";
    const isVerified = user?.emailVerified;

    return (
        <div className="min-h-screen bg-[#0B1120] text-zinc-100 p-6 md:p-10 font-sans selection:bg-purple-500/30 overflow-hidden relative">
            
            {/* Background Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[20rem] h-[20rem] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Container */}
            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                
                {/* 3D Premium Profile Card */}
                <div className="group relative rounded-[2rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/50 hover:to-indigo-500/10 transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_rgba(139,92,246,0.15)]">
                    {/* Inner Dark Background */}
                    <div className="absolute inset-[1px] bg-gradient-to-br from-[#10172A] to-[#0B1120] rounded-[2rem] z-0" />
                    
                    {/* Top Highlight line for 3D effect */}
                    <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                        
                        {/* Glowing 3D Avatar */}
                        <div className="relative perspective-[1000px]">
                            {/* Outer Pulsing Glow */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition duration-700 animate-pulse" />
                            
                            {/* Inner Image Container with 3D tilt */}
                            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-2xl transform-gpu transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                                <div className="w-full h-full rounded-full border-4 border-[#0B1120] overflow-hidden relative bg-[#0B1120]">
                                    <Image
                                        src={userImage}
                                        alt={userName}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 112px, 144px"
                                    />
                                    {/* Glass reflection over image */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="flex flex-col items-center md:items-start space-y-4 mt-2">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                                {userName}
                            </h1>
                            
                            <div className="flex items-center gap-2 text-zinc-300 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-inner">
                                <Mail className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium tracking-wide">{userEmail}</span>
                            </div>
                            
                            {/* 3D Badges */}
                            <div className="flex items-center gap-4 pt-3">
                                <div className="relative px-4 py-1.5 rounded-full bg-[#1e1a3b]/80 border border-purple-500/30 shadow-[inset_0_1px_4px_rgba(168,85,247,0.3)]">
                                    <span className="text-xs font-bold tracking-widest text-purple-300">
                                        ROLE: {userRole}
                                    </span>
                                </div>
                                <div className="relative px-4 py-1.5 rounded-full bg-[#3b2a1a]/80 border border-amber-500/30 shadow-[inset_0_1px_4px_rgba(251,191,36,0.3)]">
                                    <span className="text-xs font-bold tracking-widest text-amber-400">
                                        PLAN: {userPlan}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="flex items-center justify-center py-4">
                    <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Card 1: Prompts Published */}
                    <div className="group relative bg-[#111622]/80 backdrop-blur-xl border border-[#1F2937] p-8 rounded-2xl hover:bg-[#151B29] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex flex-col space-y-4">
                            <FileText className="w-7 h-7 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-300" />
                            <div>
                                <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-1">
                                    Prompts Published
                                </h3>
                                <p className="text-4xl font-extrabold text-white">
                                    0 
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Account Status */}
                    <div className="group relative bg-[#111622]/80 backdrop-blur-xl border border-[#1F2937] p-8 rounded-2xl hover:bg-[#151B29] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="flex flex-col space-y-4">
                            {isVerified ? (
                                <BadgeCheck className="w-7 h-7 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300" />
                            ) : (
                                <AlertCircle className="w-7 h-7 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)] group-hover:scale-110 transition-transform duration-300" />
                            )}
                            <div>
                                <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-1">
                                    Account Status
                                </h3>
                                <p className={`text-2xl font-bold mt-1 ${isVerified ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]'}`}>
                                    {isVerified ? "Verified Member" : "Unverified Member"}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}