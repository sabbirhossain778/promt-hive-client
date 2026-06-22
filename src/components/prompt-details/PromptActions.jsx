"use client";
import React, { useState } from 'react';
import { Bookmark, Flag, X } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PromptActions({ promptId, userId }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportDescription, setReportDescription] = useState("");

    const handleBookmark = async () => {
        try {
            // TODO: API Call -> await axios.post(`/api/bookmarks/toggle`, { promptId })
            setIsBookmarked(!isBookmarked);
            toast.success(isBookmarked ? 'Bookmark removed!' : 'Prompt bookmarked successfully!');
        } catch (error) {
            toast.error('Failed to update bookmark.');
        }
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        if (!reportReason) return toast.error("Please select a reason.");
        
        try {
            // TODO: API Call -> await axios.post(`/api/reports`, { promptId, reason: reportReason, description: reportDescription })
            toast.success('Prompt reported successfully. Our team will review it.');
            setIsReportModalOpen(false);
            setReportReason("");
            setReportDescription("");
        } catch (error) {
            toast.error('Failed to submit report.');
        }
    };

    return (
        <>
            <div className="flex items-center gap-3 shrink-0">
                <button 
                    onClick={handleBookmark}
                    className={`p-3 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${isBookmarked ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-[#0c101c] border-zinc-800/80 text-zinc-400 hover:text-[#8B5CF6] hover:border-[#8B5CF6]/50'}`}
                >
                    <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
                </button>
                <button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="p-3 rounded-xl bg-[#0c101c] border border-zinc-800/80 text-zinc-400 hover:text-red-500 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300 transform hover:-translate-y-1"
                >
                    <Flag size={20} />
                </button>
            </div>

            {/* Report Modal */}
            {isReportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#0B1120] border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
                        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
                            <h3 className="text-xl font-bold text-white">Report Prompt</h3>
                            <button onClick={() => setIsReportModalOpen(false)} className="text-zinc-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* report form */}
                        <form onSubmit={handleReportSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-zinc-400 block mb-2">Reason for reporting</label>
                                <select 
                                    value={reportReason} 
                                    onChange={(e) => setReportReason(e.target.value)}
                                    className="w-full bg-[#05080f] border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:border-red-500"
                                >
                                    <option value="">Select a reason...</option>
                                    <option value="Inappropriate Content">Inappropriate Content</option>
                                    <option value="Spam">Spam</option>
                                    <option value="Copyright Violation">Copyright Violation</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-zinc-400 block mb-2">Description (Optional)</label>
                                <textarea
                                    rows="4"
                                    value={reportDescription}
                                    onChange={(e) => setReportDescription(e.target.value)}
                                    placeholder="Provide more details..."
                                    className="w-full bg-[#05080f] border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:border-red-500 resize-none"
                                ></textarea>
                            </div>
                            
                            {/* submit btn */}
                            <button type="submit" className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all">
                                Submit Report
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}