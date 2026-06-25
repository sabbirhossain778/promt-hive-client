import { getUserSession } from '@/lib/core/session';
import React from 'react';
import Link from 'next/link';
import { 
    Mail, User as UserIcon, ShieldCheck, FileText, 
    CheckCircle, Sparkles, Crown, Gem
} from 'lucide-react';
import Image from 'next/image'; 

const UserProfilePage = async () => {

    const user = await getUserSession();
    

    const isPro = user?.plan === 'pro';
    const role = user?.role?.toUpperCase() || 'USER';
    const promptsPublished = 0; 

    return (
        <div className="min-h-[80vh] p-4 md:p-8 max-w-5xl mx-auto">
            
            {/* Main Profile Container */}
            <div className="bg-[#121827]/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
                
                {/* Background Glow Effect */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none"></div>

                {/* 1. TOP SECTION: Profile Header  */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                    
                    {/* Glowing Avatar */}
                    <div className="relative p-1 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-500 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#0B0B0F] border-4 border-[#0B0B0F] overflow-hidden flex items-center justify-center relative">
                            {user?.image ? (
                                <Image src={user.image} alt={user.name} fill className="object-cover" />
                            ) : (
                                <UserIcon size={48} className="text-zinc-500" />
                            )}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center md:items-start mt-2">
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-white tracking-wide">{user?.name || "Anonymous User"}</h1>
                            {isPro && (
                                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-[#451a03] text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                                    <Gem size={12} /> PRO
                                </span>
                            )}
                        </div>
                        
                        <p className="text-zinc-400 flex items-center gap-2 text-sm mb-4">
                            <Mail size={15} /> {user?.email || "No email linked"}
                        </p>

                        {/* Badges */}
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold rounded-full flex items-center gap-1.5 tracking-wider">
                                <ShieldCheck size={14} /> ROLE: {role}
                            </span>
                            <span className={`px-3 py-1 border text-xs font-semibold rounded-full flex items-center gap-1.5 tracking-wider ${
                                isPro 
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                            }`}>
                                <Crown size={14} /> PLAN: {isPro ? 'PRO LIFETIME' : 'FREE BASIC'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. ATTRACTIVE HR / DIVIDER */}
                <div className="relative w-full h-px my-10 flex items-center justify-center">
                    {/* Main gradient line */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    {/* Glowing center dot/blur */}
                    <div className="absolute w-48 h-2 bg-violet-500/20 blur-xl"></div>
                </div>

                {/* 3. MIDDLE SECTION: Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    
                    {/* Card 1: Prompts Published */}
                    <div className="bg-[#1C2130]/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                            <FileText size={100} />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-violet-500/20 rounded-xl">
                                <FileText className="text-violet-400" size={20} />
                            </div>
                            <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Prompts Published</h3>
                        </div>
                        <p className="text-4xl font-bold text-white">{promptsPublished}</p>
                    </div>

                    {/* Card 2: Account Status */}
                    <div className="bg-[#1C2130]/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                            <ShieldCheck size={100} />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-emerald-500/20 rounded-xl">
                                <ShieldCheck className="text-emerald-400" size={20} />
                            </div>
                            <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Account Status</h3>
                        </div>
                        <p className="text-xl font-bold text-emerald-400">Verified Member</p>
                    </div>
                </div>

                {/* Premium Banner */}
                <div className="mt-8 relative z-10">
                    {isPro ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-3">
                            <CheckCircle className="text-emerald-400 flex-shrink-0" size={22} />
                            <span className="text-emerald-200/90 text-sm md:text-base font-medium">
                                Lifetime Premium Active - Enjoy complete access to all Prompt Marketplace items!
                            </span>
                        </div>
                    ) : (
                        /* Call to Action for FREE users */
                        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                            {/* Shine effect */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
                            
                            <div>
                                <h3 className="text-amber-400 font-bold text-lg flex items-center gap-2 mb-1">
                                    <Sparkles size={20} /> Upgrade to Premium
                                </h3>
                                <p className="text-sm text-amber-200/70">
                                    You are currently on the Free plan. Upgrade to unlock unlimited prompt publishing and full marketplace access.
                                </p>
                            </div>
                            
                            <Link 
                                href="/payment" 
                                className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#451a03] font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] flex-shrink-0 whitespace-nowrap"
                            >
                                <Crown size={18} />
                                Get Premium Now
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserProfilePage;