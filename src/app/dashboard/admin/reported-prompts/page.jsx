"use client";

import React, { useState, useEffect } from 'react';
import { Eye, ShieldAlert, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { adminReportAction } from '@/lib/actions/report';
import { getAllReports } from '@/lib/api/report';
import { useRouter } from 'next/navigation';

export default function ReportedPromptsPage() {
    const [reports, setReports] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadReports = async () => {
            const data = await getAllReports();
            setReports(data?.filter(r => r.status === 'pending') || []);
        };
        loadReports();
    }, []); 

    const handleAction = async (reportId, promptId, action) => {
        try {
            await adminReportAction(reportId, { action, promptId });
            toast.success(`Action '${action}' applied successfully!`);
            loadReports();
        } catch (error) {
            toast.error("Failed to update report.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0D15] p-6 md:p-10 text-zinc-200">
            <ToastContainer theme="dark" />
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="border-b border-zinc-800 pb-6">
                    <h1 className="text-3xl font-bold text-white">Reported Prompts Moderation Queue</h1>
                    <p className="text-zinc-400 mt-2">Review community warnings, warn creators, dismiss complaints, or remove posts.</p>
                </div>

                {/* Reports List */}
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-[#0B1120] border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition-all">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                    <ShieldAlert className="w-3 h-3" /> {report.reason}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono">ID: {report._id}</span>
                            </div>

                            {/* Content */}
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-white">Prompt ID: {report.promptId}</h2>
                                <p className="text-sm text-zinc-400 mt-2 bg-[#05080f] p-4 rounded-xl border border-zinc-800 italic">
                                    {report.description || "No description provided."}"
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap justify-end gap-2 pt-4 border-t border-zinc-800">
                                <button
                                    onClick={() => router.push(`/all-prompts/${report.promptId}`)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1A2235] hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-semibold transition-all"
                                >
                                    <Eye className="w-4 h-4" /> Inspect
                                </button>
                                <button
                                    onClick={() => handleAction(report._id, report.promptId, 'dismiss')}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1A2235] hover:bg-emerald-900/20 text-emerald-400 rounded-lg text-xs font-semibold transition-all"
                                >
                                    <CheckCircle className="w-4 h-4" /> Dismiss
                                </button>
                                <button
                                    onClick={() => handleAction(report._id, report.promptId, 'warn')}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1A2235] hover:bg-amber-900/20 text-amber-400 rounded-lg text-xs font-semibold transition-all"
                                >
                                    <AlertTriangle className="w-4 h-4" /> Warn
                                </button>
                                <button
                                    onClick={() => handleAction(report._id, report.promptId, 'remove')}
                                    className="flex items-center gap-2 px-4 py-2 bg-rose-900/10 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg text-xs font-semibold transition-all border border-rose-900/30"
                                >
                                    <Trash2 className="w-4 h-4" /> Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {reports.length === 0 && (
                        <div className="text-center py-20 text-zinc-500">
                            <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No pending reports to review.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}