import { getUserSession } from '@/lib/core/session';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Mail,
    User as UserIcon,
    ShieldCheck,
    FileText,
    CheckCircle2,
    Sparkles,
    Crown,
    CalendarDays,
    Activity
} from 'lucide-react';


async function getUserStats(userId) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/prompts/count/${userId}`, { cache: 'no-store' });

        if (!res.ok) return { promptsPublished: 0 };
        const data = await res.json();

        return { promptsPublished: data.count || 0 };
    } catch (error) {
        console.error("Error fetching user stats:", error);
        return { promptsPublished: 0 };
    }
}

const UserProfilePage = async () => {
    const user = await getUserSession();
    const stats = user?.id ? await getUserStats(user.id) : { promptsPublished: 0 };

    const isPro = user?.plan === 'pro';
    const role = user?.role?.toUpperCase() || 'USER';
    const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently';

    
    return (
        <div className="min-h-screen bg-[#050505] text-zinc-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* HEADER SECTION  */}
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-black/50">

                    {/* Subtle Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">

                        {/* Elegant Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/[0.1] bg-[#111] p-1.5 shadow-inner">
                                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden relative">
                                    {user?.image ? (
                                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                                    ) : (
                                        <UserIcon size={40} className="text-zinc-600" />
                                    )}
                                </div>
                            </div>
                            {/* Pro Indicator Dot */}
                            {isPro && (
                                <div className="absolute bottom-2 right-2 w-5 h-5 bg-amber-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center">
                                    <Crown size={10} className="text-[#0a0a0a]" />
                                </div>
                            )}
                        </div>

                        {/* User Details */}
                        <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left mt-2">
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
                                {user?.name || "Anonymous User"}
                            </h1>

                            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-6">
                                <Mail size={16} />
                                <span>{user?.email || "No email linked"}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-700 mx-2 hidden md:block"></span>
                                <div className="hidden md:flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    <span>Joined {joinDate}</span>
                                </div>
                            </div>

                            {/* Minimalist Badges */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <div className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-2 text-xs font-medium text-zinc-300 tracking-wide">
                                    <ShieldCheck size={14} className="text-indigo-400" />
                                    ROLE: {role}
                                </div>
                                <div className={`px-3 py-1.5 border rounded-lg flex items-center gap-2 text-xs font-medium tracking-wide ${isPro
                                        ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                        : "bg-zinc-900 border-zinc-800 text-zinc-400"
                                    }`}>
                                    {isPro ? <Crown size={14} /> : <UserIcon size={14} />}
                                    PLAN: {isPro ? 'PRO LIFETIME' : 'BASIC FREE'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. STATS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Stat Card 1: Prompts */}
                    <div className="bg-[#0a0a0a] border border-white/[0.05] hover:border-white/[0.1] transition-colors rounded-2xl p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                <FileText size={18} className="text-indigo-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-500 tracking-wider uppercase">Contributions</span>
                        </div>
                        <div>
                            <p className="text-4xl font-light text-white tracking-tight">{stats.promptsPublished}</p>
                            <p className="text-sm text-zinc-400 mt-1">Total Prompts Published</p>
                        </div>
                    </div>

                    {/* Stat Status */}
                    <div className="bg-[#0a0a0a] border border-white/[0.05] hover:border-white/[0.1] transition-colors rounded-2xl p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Activity size={18} className="text-emerald-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-500 tracking-wider uppercase">Account Health</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={24} className="text-emerald-500" />
                                <p className="text-2xl font-medium text-zinc-200 tracking-tight">Verified</p>
                            </div>
                            <p className="text-sm text-zinc-400 mt-2">Your account is in good standing</p>
                        </div>
                    </div>
                </div>

                {/* PREMIUM BANNER SECTION */}
                <div className="pt-2">
                    {isPro ? (
                        <div className="bg-amber-500/[0.03] border border-amber-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 justify-between relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                            <div>
                                <h3 className="text-amber-400 font-medium text-lg flex items-center gap-2 mb-1">
                                    <Crown size={18} /> Premium Active
                                </h3>
                                <p className="text-zinc-400 text-sm">You have lifetime access to all exclusive marketplace features.</p>
                            </div>
                            <div className="px-4 py-2 bg-amber-500/10 text-amber-400 text-sm font-medium rounded-lg border border-amber-500/20">
                                Lifetime Plan
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-[#121215] to-[#0a0a0a] border border-indigo-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">

                            {/* Subtle Hover Glow */}
                            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 flex-1 text-center md:text-left">
                                <h3 className="text-indigo-400 font-medium text-xl flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <Sparkles size={20} /> Unlock Premium
                                </h3>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
                                    Elevate your experience. Get unlimited prompt publishing, exclusive marketplace access, and advanced AI features.
                                </p>
                            </div>

                            <div className="relative z-10 w-full md:w-auto">
                                <Link
                                    href="/payment"
                                    className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-white text-black hover:bg-zinc-200 transition-colors rounded-xl font-semibold text-sm"
                                >
                                    <Crown size={16} />
                                    Upgrade Now
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserProfilePage;