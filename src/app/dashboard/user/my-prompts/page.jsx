"use client";

import React, { useState, useEffect } from 'react';
import {
    Table,
    Chip,
    Button,
    Tooltip
} from "@heroui/react";
import {
    Eye, Edit2, Trash2, Lock, Clock, XCircle, CheckCircle, Star, PlusCircle, Inbox, AlertTriangle, X, BarChart3, Copy, TrendingUp
} from "lucide-react";
import { getCreatorPrompts } from '@/lib/api/prompts';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { deletePrompt } from '@/lib/actions/prompt';


export default function UserMyPromptsPage() {
    const { data: session } = useSession();
    const user = session?.user;

    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modals States
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [promptToDelete, setPromptToDelete] = useState(null);

    const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
    const [activeAnalyticsData, setActiveAnalyticsData] = useState(null);

    useEffect(() => {
        const fetchPrompts = async () => {
            if (user?.id) {
                try {
                    setIsLoading(true);
                    const data = await getCreatorPrompts(user.id, 'all');
                    if (data && data.length > 0) {
                        setPrompts(data);
                    }
                } catch (error) {
                    console.error("Error fetching prompts:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchPrompts();
    }, [user?.id]);

    const statusConfig = {
        pending: { color: "warning", icon: <Clock size={14} className="mr-1.5" />, label: "PENDING" },
        rejected: { color: "danger", icon: <XCircle size={14} className="mr-1.5" />, label: "REJECTED" },
        approved: { color: "success", icon: <CheckCircle size={14} className="mr-1.5" />, label: "APPROVED" }
    };

    // ১. Analytics btn
    const handleViewAnalytics = (prompt) => {
        setActiveAnalyticsData(prompt);
        setAnalyticsModalOpen(true);
    };

    // ২. Delete btn
    const handleDeleteClick = (id) => {
        setPromptToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!promptToDelete) return;

        try {
            const result = await deletePrompt(promptToDelete);

            if (result) {
                toast.success("Prompt deleted successfully!");
                setPrompts((prevPrompts) => prevPrompts.filter(prompt => prompt._id !== promptToDelete));
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete the prompt.");
        } finally {
            setDeleteModalOpen(false);
            setPromptToDelete(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#050B14] p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col gap-1 text-center sm:text-left mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-tight">My Prompts</h2>
                    <p className="text-sm text-zinc-500">View, update, and manage your current AI prompts.</p>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
                    </div>
                ) : prompts.length === 0 ? (

                    /* Empty State: No Prompts Found */
                    <div className="bg-[#0c101c] rounded-2xl border border-zinc-800/80 shadow-2xl p-12 md:p-20 flex flex-col items-center justify-center text-center">
                        <div className="bg-[#121626] p-5 rounded-full mb-6 border border-zinc-800/50 relative">
                            <div className="absolute inset-0 bg-[#8B5CF6]/20 blur-xl rounded-full"></div>
                            <Inbox size={48} className="text-[#8B5CF6] relative z-10" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">No Prompts Found</h3>
                        <p className="text-zinc-400 max-w-md mb-8 text-sm md:text-base leading-relaxed">
                            You haven't created any prompts yet. Start sharing your AI expertise with the marketplace!
                        </p>

                        <Link href="/dashboard/user/add-prompt">
                            <Button
                                className="bg-[#8B5CF6] text-white font-semibold hover:bg-[#7C3AED] transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] rounded-xl px-8 py-6 text-base"
                                startContent={<PlusCircle size={20} />}
                            >
                                Create Your First Prompt
                            </Button>
                        </Link>
                    </div>

                ) : (

                    /* Data Table */
                    <div className="bg-[#0c101c] rounded-2xl border border-zinc-800/80 shadow-2xl overflow-hidden p-2">
                        <Table aria-label="My Prompts Table">
                            <Table.ScrollContainer>
                                <Table.Content className="min-w-250">
                                    <Table.Header>
                                        <Table.Column
                                            isRowHeader={true}
                                            id="title"
                                            className="text-zinc-400 font-semibold bg-[#121626] border-b border-zinc-800 text-center"
                                        >
                                            TITLE
                                        </Table.Column>

                                        <Table.Column id="aiEngine" className="text-zinc-400 font-semibold bg-[#121626] border-b border-zinc-800 text-center">
                                            AI ENGINE
                                        </Table.Column>
                                        <Table.Column id="visibility" className="text-zinc-400 font-semibold bg-[#121626] border-b border-zinc-800 text-center">
                                            VISIBILITY
                                        </Table.Column>
                                        <Table.Column id="status" className="text-zinc-400 font-semibold bg-[#121626] border-b border-zinc-800 text-center">
                                            STATUS
                                        </Table.Column>
                                        <Table.Column id="copies" className="text-zinc-400 font-semibold bg-[#121626] border-b border-zinc-800 text-center">
                                            COPIES
                                        </Table.Column>
                                        <Table.Column id="rating" className="text-zinc-400 font-semibold bg-[#121626] border-b border-zinc-800 text-center">
                                            RATING
                                        </Table.Column>
                                        <Table.Column className="text-zinc-400 font-semibold bg-[#121626] border-b border-zinc-800 text-center">
                                            ACTIONS
                                        </Table.Column>
                                    </Table.Header>

                                    <Table.Body>
                                        {prompts.map((prompt) => {
                                            const safeStatus = prompt.status ? prompt.status.toLowerCase() : 'pending';
                                            const stat = statusConfig[safeStatus] || statusConfig['pending'];

                                            return (
                                                <Table.Row key={prompt._id} className="border-b border-zinc-800/30 hover:bg-[#121626]/50 transition-colors">

                                                    <Table.Cell className="py-5">
                                                        <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                                                            <span className="text-[15px] font-semibold text-zinc-100 tracking-wide">{prompt.promptTitle || "Untitled Prompt"}</span>
                                                            <span className="text-[13px] text-zinc-500 font-medium">Category: {prompt.category || "General"}</span>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex justify-center">
                                                            <Chip size="sm" className="bg-[#1f1a36] text-[#a78bfa] border border-[#2e235e] font-semibold px-3 py-4 text-[11px] tracking-wider uppercase rounded-full">
                                                                {prompt.aiTool || "UNKNOWN"}
                                                            </Chip>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex items-center justify-center gap-1.5 text-[14px] text-zinc-300 font-medium capitalize">
                                                            {prompt.visibility === 'Private' && <Lock size={14} className="text-zinc-400" />}
                                                            {prompt.visibility || "Public"}
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex justify-center">
                                                            <Chip variant="bordered" color={stat.color} size="sm" className="font-bold tracking-wider text-[11px] px-2 border-zinc-700/50">
                                                                <div className="flex items-center justify-center">{stat.icon}{stat.label}</div>
                                                            </Chip>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="text-center">
                                                            <span className="text-[15px] font-semibold text-zinc-200">{prompt.copies || 0}</span>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <Star size={16} className="text-amber-400 fill-amber-400" />
                                                            <span className="text-[15px] font-semibold text-zinc-200">{prompt.rating || "0.0"}</span>
                                                        </div>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <div className="flex items-center justify-center gap-2">
                                                            {/* 1. View Analytics Button (Passes entire prompt object) */}
                                                            <Tooltip content="View Analytics" placement="top" className="bg-[#1c1c1e] text-zinc-200 text-xs border border-zinc-800">
                                                                <Button isIconOnly size="sm" className="bg-[#1a1f33] border border-zinc-800 text-zinc-400 hover:text-white rounded-lg" onClick={() => handleViewAnalytics(prompt)}>
                                                                    <Eye size={16} />
                                                                </Button>
                                                            </Tooltip>

                                                            {/* 2. Edit Button */}
                                                            <Tooltip content="Edit Prompt" placement="top" className="bg-[#1c1c1e] text-zinc-200 text-xs border border-zinc-800">
                                                                <Link href={`/dashboard/user/edit-prompt/${prompt._id}`}>
                                                                    <Button isIconOnly size="sm" className="bg-[#1a1f33] border border-zinc-800 text-zinc-400 hover:text-white rounded-lg">
                                                                        <Edit2 size={16} />
                                                                    </Button>
                                                                </Link>
                                                            </Tooltip>

                                                            {/* 3. Delete Button */}
                                                            <Tooltip content="Delete" placement="top" className="bg-[#2a131c] text-danger text-xs border border-danger/20">
                                                                <Button isIconOnly size="sm" className="bg-[#2a131c] border border-danger/20 text-danger hover:bg-danger hover:text-white transition-colors rounded-lg" onClick={() => handleDeleteClick(prompt._id)}>
                                                                    <Trash2 size={16} />
                                                                </Button>
                                                            </Tooltip>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>
                )}
            </div>

            {/* CUSTOM ANALYTICS MODAL */}
            {analyticsModalOpen && activeAnalyticsData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#0B1120] border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <button onClick={() => setAnalyticsModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-1">
                                <BarChart3 size={16} /> Performance Insights
                            </div>
                            <h3 className="text-xl font-bold text-white line-clamp-1">{activeAnalyticsData.promptTitle}</h3>
                        </div>

                        {/* Minimalist Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#121826] border border-zinc-800/60 rounded-xl p-4 flex flex-col justify-between">
                                <div className="flex items-center justify-between text-zinc-500 mb-2">
                                    <span className="text-xs font-medium tracking-wide uppercase">Total Copies</span>
                                    <Copy size={14} />
                                </div>
                                <span className="text-2xl font-bold text-white">{activeAnalyticsData.copies || 0}</span>
                            </div>

                            <div className="bg-[#121826] border border-zinc-800/60 rounded-xl p-4 flex flex-col justify-between">
                                <div className="flex items-center justify-between text-zinc-500 mb-2">
                                    <span className="text-xs font-medium tracking-wide uppercase">Avg Rating</span>
                                    <Star size={14} className="text-amber-400 fill-amber-400" />
                                </div>
                                <span className="text-2xl font-bold text-white">{activeAnalyticsData.rating || "0.0"}</span>
                            </div>
                        </div>

                        <div className="bg-indigo-500/[0.03] border border-indigo-500/10 rounded-xl p-4 flex items-start gap-3">
                            <TrendingUp size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                This prompt is currently <span className="text-white font-medium">{activeAnalyticsData.visibility}</span>. Its performance is analyzed based on user interaction trends within the prompt hub marketplace.
                            </p>
                        </div>

                        <Button className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium h-11" onClick={() => setAnalyticsModalOpen(false)}>
                            Close Panel
                        </Button>
                    </div>
                </div>
            )}

            {/* CUSTOM DELETE CONFIRMATION MODAL */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#0B1120] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
                        <button onClick={() => setDeleteModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center mt-2">
                            <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mb-4 border border-danger/20">
                                <AlertTriangle size={32} className="text-danger" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Delete Prompt?</h3>
                            <p className="text-zinc-400 text-sm mb-6">Are you sure you want to delete this prompt? This action cannot be undone.</p>
                        </div>

                        <div className="flex gap-3 w-full">
                            <Button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl h-11 font-medium" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                            <Button className="flex-1 bg-danger hover:bg-danger-600 text-white rounded-xl h-11 font-medium" onClick={confirmDelete}>Yes, Delete</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}