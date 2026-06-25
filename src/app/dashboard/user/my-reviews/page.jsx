"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { Eye, Star, Calendar, MessageSquareOff } from 'lucide-react';
import Link from 'next/link';
import { getUserReviews } from '@/lib/api/reviews';
import { Button } from "@heroui/react";

export default function MyReviewsPage() {
    const { data: session } = useSession();
    const user = session?.user;

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReviews = async () => {
            if (user?.id) {
                try {
                    setIsLoading(true);
                    const data = await getUserReviews(user.id);
                    setReviews(data || []);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to load your reviews.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadReviews();
    }, [user?.id]);

    return (
        <div className="min-h-screen bg-[#050B14] p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-2">
                        My Product Reviews
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        Feedback and ratings you've posted on the marketplace.
                    </p>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
                    </div>
                ) : reviews.length === 0 ? (

                    /* Empty State */
                    <div className="bg-[#0B1120] rounded-2xl border border-zinc-800/80 p-16 flex flex-col items-center justify-center text-center">
                        <MessageSquareOff size={48} className="text-zinc-600 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Reviews Yet</h3>
                        <p className="text-zinc-400">You haven't posted any reviews on the marketplace.</p>
                    </div>

                ) : (

                    /* Table Section */
                    <div className="bg-[#0B1120] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                {/* Table Head */}
                                <thead>
                                    <tr className="bg-[#0F1523] border-b border-zinc-800">
                                        <th className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">Prompt Title</th>
                                        <th className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">AI Tool</th>
                                        <th className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">Rating</th>
                                        <th className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">Comments</th>
                                        <th className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">Submitted Date</th>
                                        <th className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {reviews.map((review) => (
                                        <tr key={review._id} className="border-b border-zinc-800/50 hover:bg-white/2 transition-colors group">
                                            {/* Prompt Title */}
                                            <td className="py-4 px-6">
                                                <p className="text-sm font-semibold text-zinc-200 line-clamp-1">{review.promptTitle}</p>
                                            </td>

                                            {/* AI Tool Badge */}
                                            <td className="py-4 px-6">
                                                <span className="inline-block px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#A78BFA] text-[10px] font-bold uppercase tracking-wider">
                                                    {review.aiTool}
                                                </span>
                                            </td>

                                            {/* Rating */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5 text-yellow-500 text-sm font-medium">
                                                    <Star size={16} fill="currentColor" />
                                                    <span>{Number(review.rating).toFixed(1)}</span>
                                                </div>
                                            </td>

                                            {/* Comments */}
                                            <td className="py-4 px-6">
                                                <p className="text-sm text-zinc-400 italic line-clamp-1 max-w-[200px]">
                                                    {review.reviewText}
                                                </p>
                                            </td>

                                            {/* Submitted Date */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 text-sm text-zinc-500">
                                                    <Calendar size={14} className="text-zinc-600" />
                                                    {review.createdAt}
                                                </div>
                                            </td>

                                            {/* Action / View Button */}
                                            <td className="py-4 px-6">
                                                <Link href={`/all-prompts/${review.promptId}`}>
                                                    <Button
                                                        className="bg-zinc-800/60 hover:bg-[#8B5CF6] text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#8B5CF6] transition-all rounded-lg h-9 px-4 text-xs font-medium"
                                                        startContent={<Eye size={14} />}
                                                    >
                                                        View
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}