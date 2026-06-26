"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Check, X, Trash2, Star, AlertTriangle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deletePrompt, updatePrompt } from '@/lib/actions/prompt';

export default function PromptsTable({ initialPrompts }) {
    const [prompts, setPrompts] = useState(initialPrompts);
    const [modal, setModal] = useState({ isOpen: false, id: null });


    const handleDelete = async () => {
        const id = modal.id;
        const res = await deletePrompt(id);

        if (res?.message === "Prompt deleted successfully") {
            setPrompts(prompts.filter(p => p._id !== id));
            toast.success("Prompt deleted!");
        } else {
            toast.error("Failed to delete.");
        }
        setModal({ isOpen: false, id: null });
    };


    const handleStatusUpdate = async (id, newStatus) => {
        const res = await updatePrompt(id, { status: newStatus });
        
        if (res?.result?.modifiedCount > 0 || res?.result?.acknowledged || res?.message === "Prompt updated successfully") {
            setPrompts(prompts.map(p => p._id === id ? { ...p, status: newStatus } : p));
            toast.success(`Prompt ${newStatus}!`);
        } else {
            toast.error("Action failed. Already updated?");
        }
    };

    const handleFeaturedToggle = async (id, currentStatus) => {
        const newFeaturedStatus = !currentStatus;
        const res = await updatePrompt(id, { featured: newFeaturedStatus });
        
        if (res?.result?.modifiedCount > 0 || res?.result?.acknowledged || res?.message === "Prompt updated successfully") {
            setPrompts(prompts.map(p => p._id === id ? { ...p, featured: newFeaturedStatus } : p));
            toast.success(newFeaturedStatus ? "Prompt Featured!" : "Removed from Featured.");
        } else {
            toast.error("Action failed.");
        }
    };

    return (
        <div className="bg-[#111622] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl w-full relative">
            <ToastContainer theme="dark" position="top-center" autoClose={3000} />

            {modal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#151B29] border border-[#1F2937] w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center gap-3 text-rose-500 mb-4">
                            <AlertTriangle className="w-8 h-8" />
                            <h3 className="text-lg font-bold text-white">Delete Prompt?</h3>
                        </div>
                        <p className="text-zinc-400 text-sm mb-6">Are you sure? This action is permanent and cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setModal({ isOpen: false, id: null })} className="flex-1 py-2 rounded-lg bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-all">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-[#151B29] border-b border-[#1F2937]">
                            <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Template Title</th>
                            <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Creator</th>
                            <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Engine</th>
                            <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Visibility</th>
                            <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Featured</th>
                            <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Status</th>
                            <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2937]/50">
                        {prompts.map((prompt) => (
                            <tr key={prompt._id} className="hover:bg-white/[0.02] transition-colors">
                                {/* Title & Category */}
                                <td className="p-5">
                                    <p className="text-sm font-semibold text-zinc-200">{prompt.promptTitle}</p>
                                    <p className="text-xs text-zinc-500 mt-1">Category: {prompt.category}</p>
                                </td>

                                {/* Creator Info */}
                                <td className="p-5">
                                    <p className="text-sm font-medium text-zinc-300">{prompt.creatorName || "Creator"}</p>
                                    <p className="text-xs text-zinc-500 mt-1">{prompt.creatorEmail || "creator@aiverse.com"}</p>
                                </td>

                                {/* AI Engine */}
                                <td className="p-5">
                                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-[10px] font-bold tracking-wider uppercase">
                                        {prompt.aiTool || prompt.aiEngine}
                                    </span>
                                </td>

                                {/* Visibility */}
                                <td className="p-5 text-sm text-zinc-300">
                                    {prompt.visibility || "Public"}
                                </td>

                                {/* Featured Button */}
                                <td className="p-5 text-center">
                                    <button 
                                        onClick={() => handleFeaturedToggle(prompt._id, prompt.featured)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                            prompt.featured 
                                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' 
                                            : 'text-zinc-500 border-zinc-700 hover:text-zinc-300 hover:border-zinc-500'
                                        }`}
                                    >
                                        <Star className={`w-3.5 h-3.5 ${prompt.featured ? 'fill-amber-500' : ''}`} />
                                        Feature
                                    </button>
                                </td>

                                {/* Status Badge */}
                                <td className="p-5 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                                        prompt.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        prompt.status === 'rejected' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                    }`}>
                                        {prompt.status || 'PENDING'}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="p-5">
                                    <div className="flex items-center justify-center gap-2">
                                        
                                        {/* Eye Icon - Link to Details Page */}
                                        <Link 
                                            href={`/all-prompts/${prompt._id}`} 
                                            title="View Details" 
                                            className="p-1.5 text-zinc-400 border border-zinc-700 rounded-lg hover:bg-zinc-800 hover:text-white transition-all flex items-center justify-center"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>

                                        <button 
                                            title="Approve" 
                                            onClick={() => handleStatusUpdate(prompt._id, 'approved')}
                                            className="p-1.5 text-emerald-500 border border-zinc-700 rounded-lg hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button 
                                            title="Reject" 
                                            onClick={() => handleStatusUpdate(prompt._id, 'rejected')}
                                            className="p-1.5 text-rose-500 border border-zinc-700 rounded-lg hover:bg-rose-500/10 hover:border-rose-500/30 transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <button 
                                            title="Delete" 
                                            onClick={() => setModal({ isOpen: true, id: prompt._id })}
                                            className="p-1.5 text-rose-500/70 border border-zinc-700 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}