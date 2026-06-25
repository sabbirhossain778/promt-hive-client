"use client";

import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from "@heroui/react";
import { Trash2, BookmarkX, Sparkles, Eye } from "lucide-react";
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { removeBookmark } from '@/lib/actions/bookmark';
import { getSavedPromptsByUserId } from '@/lib/api/bookmarks';

export default function CreatorSavedPromptsPage() {
    const { data: session } = useSession();
    const user = session?.user;
    // console.log('out of useEffect',user);


    const [savedPrompts, setSavedPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (user?.id) {
                try {
                    setIsLoading(true);
                    const data = await getSavedPromptsByUserId(user.id);
                    setSavedPrompts(data || []);
                } catch (error) {
                    toast.error("Failed to load saved prompts.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadData();
    }, [user?.id]);

    // remove handler
    const handleRemove = async (promptId) => {
        try {
            await removeBookmark({ promptId, userId: user.id });
            setSavedPrompts(prev => prev.filter(p => p._id !== promptId));
            toast.success("Prompt removed from saved list!");
        } catch (error) {
            toast.error("Failed to remove bookmark.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050B14] p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-2">
                        Saved Prompt Templates
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Manage your personal collection of useful prompts.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
                    </div>
                ) : savedPrompts.length === 0 ? (
                    <div className="bg-[#0B1120] rounded-2xl border border-zinc-800/80 p-12 text-center flex flex-col items-center">
                        <BookmarkX size={48} className="text-zinc-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Saved Prompts</h3>
                        <p className="text-zinc-400 mb-6">Explore the marketplace to find and save templates.</p>
                        <Link href="/all-prompts">
                            <Button className="bg-[#8B5CF6] text-white" startContent={<Sparkles size={18} />}>
                                Explore Prompts
                            </Button>
                        </Link>
                    </div>
                ) : (
                    // grid cards
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedPrompts.map((item) => (
                            <div key={item._id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 flex flex-col justify-between group">
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-100 mb-2 line-clamp-1">{item.promptTitle}</h3>
                                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{item.promptDescription}</p>
                                </div>

                                {/* action btn */}
                                <div className="flex items-center gap-3 mt-auto pt-5 border-t border-zinc-800/60 relative z-10">
                                    <Link href={`/all-prompts/${item._id}`} className="flex-1 group">
                                        <Button
                                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border border-violet-500/30 hover:border-violet-400/50 shadow-[0_4px_20px_rgba(139,92,246,0.15)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.4)] transition-all duration-300 font-medium rounded-xl h-11"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Eye size={18} className="group-hover:scale-110 transition-transform duration-300" />
                                                <span className="tracking-wide">View Details</span>
                                            </div>
                                        </Button>
                                    </Link>

                                    <Tooltip
                                        content="Remove"
                                        placement="top"
                                        className="bg-[#1A0B12] border border-danger/30 text-danger font-medium text-xs rounded-lg px-3 py-1.5 shadow-xl"
                                    >
                                        <Button
                                            isIconOnly
                                            className="bg-zinc-900/50 hover:bg-danger/10 border border-zinc-800 hover:border-danger/40 text-zinc-500 hover:text-danger rounded-xl h-11 w-11 transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] group"
                                            onClick={() => handleRemove(item._id)}
                                        >
                                            <Trash2 size={18} className="group-hover:scale-110 transition-transform duration-300" />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}