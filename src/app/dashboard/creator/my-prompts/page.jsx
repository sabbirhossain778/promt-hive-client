"use client";

import React, { useState, useEffect } from 'react';
import {
    Table,
    Chip,
    Button,
    Tooltip
} from "@heroui/react";
import {
    Eye,
    Edit2,
    Trash2,
    BarChart2,
    Lock,
    Clock,
    XCircle,
    CheckCircle,
    Star,
    PlusCircle,
    Inbox
} from "lucide-react";
import { getCreatorPrompts } from '@/lib/api/prompts';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

export default function MyPromptPage() {

    const { data: session } = useSession();
    const user = session?.user;

    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div className="min-h-screen bg-[#050B14] p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex flex-col gap-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white tracking-tight">My Prompts</h2>
                    <p className="text-sm text-zinc-500">View, update, and manage your current AI prompts.</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
                    </div>)
                    : prompts.length === 0 ? (
                        <div className="bg-[#0c101c] rounded-2xl border border-zinc-800/80 shadow-2xl p-12 md:p-20 flex flex-col items-center justify-center text-center">
                            <div className="bg-[#121626] p-5 rounded-full mb-6 border border-zinc-800/50">
                                <Inbox size={48} className="text-zinc-500" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-200 mb-3">No Prompts Found</h3>
                            <p className="text-zinc-500 max-w-md mb-8 text-sm md:text-base">
                                You haven't created any prompts yet. Start sharing your AI expertise with the marketplace and earn from your premium prompts!
                            </p>
                            <Link href="/dashboard/creator/add-prompt">
                                <Button
                                    className="bg-[#8B5CF6] text-white font-semibold hover:bg-[#7C3AED] transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] rounded-xl px-8 py-6 text-base"
                                    startContent={<PlusCircle size={20} />}
                                >
                                    Create Your First Prompt
                                </Button>
                            </Link>
                        </div>)

                        : (<div className="bg-[#0c101c] rounded-2xl border border-zinc-800/80 shadow-2xl overflow-hidden p-2">
                            <Table>
                                <Table.ScrollContainer>
                                    <Table.Content aria-label="My Prompts Table" className="min-w-[1000px]">

                                        <Table.Header>
                                            <Table.Column isRowHeader id="title" className="table-header-cell text-center">
                                                TITLE
                                            </Table.Column>
                                            <Table.Column id="aiEngine" className="table-header-cell text-center">
                                                AI ENGINE
                                            </Table.Column>
                                            <Table.Column id="visibility" className="table-header-cell text-center">
                                                VISIBILITY
                                            </Table.Column>
                                            <Table.Column id="status" className="table-header-cell text-center">
                                                STATUS
                                            </Table.Column>
                                            <Table.Column id="copies" className="table-header-cell text-center">
                                                COPIES
                                            </Table.Column>
                                            <Table.Column id="rating" className="table-header-cell text-center">
                                                RATING
                                            </Table.Column>
                                            <Table.Column className="table-header-cell text-center">
                                                ACTIONS
                                            </Table.Column>
                                        </Table.Header>

                                        {/* TABLE BODY */}
                                        <Table.Body>
                                            {prompts.map((prompt) => {
                                                const safeStatus = prompt.status ? prompt.status.toLowerCase() : 'pending';
                                                const stat = statusConfig[safeStatus] || statusConfig['pending'];

                                                return (
                                                    <Table.Row key={prompt._id} id={prompt._id} className="border-b border-zinc-800/30 hover:bg-[#121626]/50 transition-colors">

                                                        {/* 1. TITLE & CATEGORY (Centered) */}
                                                        <Table.Cell className="py-5">
                                                            <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                                                                <span className="text-[15px] font-semibold text-zinc-100 tracking-wide">
                                                                    {prompt.promptTitle || "Untitled Prompt"}
                                                                </span>
                                                                <span className="text-[13px] text-zinc-500 font-medium">
                                                                    Category: {prompt.category || "General"}
                                                                </span>
                                                                {prompt.feedback && (
                                                                    <div className="mt-2 bg-[#2d1b24] border border-[#4a2434] text-[#f472b6] text-[12px] px-2.5 py-1 rounded-md w-max text-center">
                                                                        Feedback: {prompt.feedback}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Table.Cell>

                                                        {/* 2. AI ENGINE (Centered) */}
                                                        <Table.Cell>
                                                            <div className="flex justify-center">
                                                                <Chip
                                                                    size="sm"
                                                                    className="bg-[#1f1a36] text-[#a78bfa] border border-[#2e235e] font-semibold px-3 py-4 text-[11px] tracking-wider uppercase rounded-full whitespace-nowrap"
                                                                >
                                                                    {prompt.aiTool || "UNKNOWN"}
                                                                </Chip>
                                                            </div>
                                                        </Table.Cell>

                                                        {/* 3. VISIBILITY (Centered) */}
                                                        <Table.Cell>
                                                            <div className="flex items-center justify-center gap-1.5 text-[14px] text-zinc-300 font-medium capitalize whitespace-nowrap">
                                                                {prompt.visibility === 'Private' && <Lock size={14} className="text-zinc-400" />}
                                                                {prompt.visibility || "Public"}
                                                            </div>
                                                        </Table.Cell>

                                                        {/* 4. STATUS (Centered) */}
                                                        <Table.Cell>
                                                            <div className="flex justify-center">
                                                                <Chip
                                                                    variant="bordered"
                                                                    color={stat.color}
                                                                    size="sm"
                                                                    className="font-bold tracking-wider text-[11px] px-2 border-zinc-700/50"
                                                                >
                                                                    <div className="flex items-center justify-center">
                                                                        {stat.icon}
                                                                        {stat.label}
                                                                    </div>
                                                                </Chip>
                                                            </div>
                                                        </Table.Cell>

                                                        {/* 5. COPIES (Centered) */}
                                                        <Table.Cell>
                                                            <div className="text-center">
                                                                <span className="text-[15px] font-semibold text-zinc-200">
                                                                    {prompt.copies || 0}
                                                                </span>
                                                            </div>
                                                        </Table.Cell>

                                                        {/* 6. RATING (Centered) */}
                                                        <Table.Cell>
                                                            <div className="flex items-center justify-center gap-1.5">
                                                                <Star size={16} className="text-zinc-200 fill-zinc-200" />
                                                                <span className="text-[15px] font-semibold text-zinc-200">
                                                                    {prompt.rating || "0.0"}
                                                                </span>
                                                            </div>
                                                        </Table.Cell>

                                                        {/* 7. ACTIONS (Centered) */}
                                                        <Table.Cell>
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Tooltip content="View Details" placement="top" className="bg-[#1c1c1e] text-zinc-200 text-xs border border-zinc-800">
                                                                    <Button isIconOnly size="sm" className="bg-[#1a1f33] border border-zinc-800 text-zinc-400 hover:text-white rounded-lg" aria-label="View prompt">
                                                                        <Eye size={16} />
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip content="Edit Prompt" placement="top" className="bg-[#1c1c1e] text-zinc-200 text-xs border border-zinc-800">
                                                                    <Button isIconOnly size="sm" className="bg-[#1a1f33] border border-zinc-800 text-zinc-400 hover:text-white rounded-lg" aria-label="Edit prompt">
                                                                        <Edit2 size={16} />
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip content="Analytics" placement="top" className="bg-[#1c1c1e] text-zinc-200 text-xs border border-zinc-800">
                                                                    <Button isIconOnly size="sm" className="bg-[#1a1f33] border border-zinc-800 text-zinc-400 hover:text-white rounded-lg" aria-label="View analytics">
                                                                        <BarChart2 size={16} />
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip content="Delete" placement="top" className="bg-[#2a131c] text-danger text-xs border border-danger/20">
                                                                    <Button isIconOnly size="sm" className="bg-[#2a131c] border border-danger/20 text-danger hover:bg-danger hover:text-white transition-colors rounded-lg" aria-label="Delete prompt">
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
        </div>
    );
}