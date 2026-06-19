"use client";

import { Card } from "@heroui/react";
import { FiCopy } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const promptStatsData = [
    { name: "SEO Optimizer", copies: 120, bookmarks: 45 },
    { name: "Blog Writer", copies: 98, bookmarks: 30 },
    { name: "Code Reviewer", copies: 86, bookmarks: 55 },
    { name: "Email Drafter", copies: 45, bookmarks: 12 },
    { name: "UI Generator", copies: 150, bookmarks: 80 },
];

export default function PromptStatsChart() {
    return (
        <Card className="bg-[#0B1120] border border-4 border-white/60 shadow-2xl rounded-2xl w-full">
            <Card.Header className="px-6 pt-6 pb-4 border-b border-gray-800/50">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <FiCopy className="text-cyan-400" /> Prompt Templates: Copies vs Bookmarks
                </h3>
            </Card.Header>
            <Card.Content className="p-4 sm:p-6 w-full">
                {/* সরাসরি ResponsiveContainer-এ height={350} দেওয়া হয়েছে */}
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={promptStatsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="barCyan" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00F2FE" />
                                    <stop offset="100%" stopColor="#4FACFE" />
                                </linearGradient>
                                <linearGradient id="barPurple" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#C084FC" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                            <Tooltip 
                                cursor={{ fill: '#1e293b', opacity: 0.5 }}
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                itemStyle={{ color: '#e2e8f0', fontWeight: 500 }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="copies" name="Copies" fill="url(#barCyan)" radius={[6, 6, 0, 0]} barSize={28} />
                            <Bar dataKey="bookmarks" name="Bookmarks" fill="url(#barPurple)" radius={[6, 6, 0, 0]} barSize={28} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card.Content>
        </Card>
    );
}