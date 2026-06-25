import { getUserSession } from '@/lib/core/session';
import { getUserPromptCount } from '@/lib/api/prompts';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Mail,
    User as UserIcon,
    ShieldCheck,
    FileText,
    CheckCircle2,
    CalendarDays,
    Activity,
    Edit3
} from 'lucide-react';

const UserProfilePage = async () => {
    const user = await getUserSession();
    const promptsCount = user?.id ? await getUserPromptCount(user.id) : 0;

    const role = user?.role?.toUpperCase() || 'CREATOR';
    const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently';

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* HEADER SECTION */}
                <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-black/50">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
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
                        </div>

                        <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left mt-2">
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
                                {user?.name || "Anonymous Creator"}
                            </h1>

                            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-6">
                                <Mail size={16} />
                                <span>{user?.email || "No email linked"}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-700 mx-2 hidden md:block"></span>
                                <div className="hidden md:flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    <span>Member since {joinDate}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <div className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center gap-2 text-xs font-medium text-indigo-300 tracking-wide">
                                    <ShieldCheck size={14} className="text-indigo-400" />
                                    {role} ACCOUNT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                <FileText size={18} className="text-indigo-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-500 tracking-wider uppercase">Portfolio</span>
                        </div>
                        <div>
                            <p className="text-4xl font-light text-white tracking-tight">{promptsCount}</p>
                            <p className="text-sm text-zinc-400 mt-1">Total Prompts Published</p>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <Activity size={18} className="text-emerald-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-500 tracking-wider uppercase">Status</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={24} className="text-emerald-500" />
                                <p className="text-2xl font-medium text-zinc-200 tracking-tight">Active Creator</p>
                            </div>
                            <p className="text-sm text-zinc-400 mt-2">Your contributor profile is public</p>
                        </div>
                    </div>
                </div>

                {/* CREATOR ACTION BANNER */}
                <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 md:p-8 flex items-center justify-between gap-6">
                    <div>
                        <h3 className="text-white font-medium text-lg mb-1">Manage Your Portfolio</h3>
                        <p className="text-zinc-400 text-sm">Update your public profile information or manage your existing prompts.</p>
                    </div>
                    <Link
                        href="/dashboard/user/my-prompts"
                        className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors rounded-xl font-medium text-sm text-white"
                    >
                        <Edit3 size={16} />
                        Go to Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default UserProfilePage;


