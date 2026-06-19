"use client";

import { Card } from "@heroui/react";
import { FiFileText } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const growthData = [
    { date: "Jun 10", prompts: 2, copies: 10 },
    { date: "Jun 11", prompts: 3, copies: 25 },
    { date: "Jun 12", prompts: 5, copies: 55 },
    { date: "Jun 13", prompts: 5, copies: 90 },
    { date: "Jun 14", prompts: 7, copies: 150 },
    { date: "Jun 15", prompts: 8, copies: 210 },
];

export default function AccumulativeGrowthChart() {
    return (
        <Card className="bg-[#0B1120] border border-4 border-white/80 shadow-2xl rounded-2xl w-full">
            <Card.Header className="px-6 pt-6 pb-4 border-b border-gray-800/50">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <FiFileText className="text-[#8B5CF6]" /> Accumulative Growth Metrics
                </h3>
            </Card.Header>
            <Card.Content className="p-4 sm:p-6 w-full">
                {/* সরাসরি ResponsiveContainer-এ height={350} দেওয়া হয়েছে */}
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="areaCyan" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00F2FE" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#00F2FE" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="areaPurple" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="4 4" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                itemStyle={{ color: '#e2e8f0', fontWeight: 500 }}
                            />
                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                            <Area type="monotone" dataKey="copies" name="Total Copies" stroke="#00F2FE" strokeWidth={4} fillOpacity={1} fill="url(#areaCyan)" activeDot={{ r: 6, fill: '#00F2FE', stroke: '#0B1120', strokeWidth: 3 }} />
                            <Area type="monotone" dataKey="prompts" name="Total Prompts" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#areaPurple)" activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#0B1120', strokeWidth: 3 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card.Content>
        </Card>
    );
}