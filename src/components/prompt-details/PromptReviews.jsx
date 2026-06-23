"use client";
import React, { useState } from 'react';
import { Star, MessageSquare, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { submitReview } from '@/lib/actions/review';
import { getReviewsByPromptId } from '@/lib/api/reviews';

export default function PromptReviews({ promptId, isLocked, user, initialReviews }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState(initialReviews);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return toast.error("Please select a rating.");
        if (!comment.trim()) return toast.error("Please write a comment.");

        try {
            await submitReview({
                promptId,
                rating,
                reviewText: comment,
            });
            const updatedReviews = await getReviewsByPromptId(promptId);
            setReviews(updatedReviews);
             toast.success("Review submitted successfully!");

            setRating(0);
            setComment("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit review.");
        }
    };

    return (
        <div className="pt-8 border-t border-zinc-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">Community Reviews ({reviews.length})</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Submit Review Form */}
                <div className="bg-[#0B1120] border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 bg-[#8B5CF6] h-full opacity-50"></div>

                    {isLocked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B1120]/80 backdrop-blur-md z-20">
                            <Lock size={32} className="text-amber-400 mb-2" />
                            <p className="text-sm font-semibold text-white">Premium required to review</p>
                        </div>
                    )}

                    <h3 className="text-lg font-bold text-white mb-4">Submit a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Rating</label>
                            <div className="flex gap-1 cursor-pointer">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={24}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className={`transition-colors ${star <= (hoverRating || rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Comment</label>
                            <textarea
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your review here. What worked? How did you test it?"
                                className="w-full bg-[#05080f] border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isLocked}
                            className="w-full py-3.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>

                {/* Reviews List / Empty State */}
                {/* Reviews List */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="bg-[#0B1120] border border-zinc-800 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-amber-400">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span className="text-zinc-500 text-xs">(review.createdAt).toLocaleDateString()</span>
                                </div>
                                <p className="text-zinc-300 text-sm">{review.reviewText}</p>
                            </div>
                        ))
                    ) : (
                        <div className="bg-[#0c101c]/50 border border-zinc-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner">
                            <MessageSquare size={40} className="text-zinc-700 mb-4" />
                            <p className="text-zinc-400 text-sm">No reviews submitted yet. Be the first!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}