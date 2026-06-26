"use client";

import React from 'react';
import { Layers3, PieChart as PieChartIcon } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

export default function AnalyticsCharts({ engineData }) {


    if (!engineData || engineData.length === 0) {
        return <div className="text-white text-center p-10">No data available for charts.</div>;
    }

    return (
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Bar Chart Panel */}
            <div className="xl:col-span-7 bg-[#111622] p-8 rounded-2xl border border-[#212A3D] space-y-6 shadow-lg">
                <div className="flex items-center gap-4">
                    <Layers3 className="w-7 h-7 text-[#17A2B8]" />
                    <h2 className="text-xl text-white font-semibold">Engine Prompts Density vs Total Copies</h2>
                </div>

                <div className="w-full pt-4">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={engineData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A344A" vertical={false} />
                            <XAxis dataKey="name" stroke="#7D869E" tick={{ fill: '#7D869E', fontSize: 12 }} tickLine={false} axisLine={false} />
                            <YAxis stroke="#7D869E" tick={{ fill: '#7D869E', fontSize: 12 }} tickLine={false} axisLine={false} />
                            <Tooltip
                                cursor={{ fill: '#1D2536', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#1D2536', borderColor: '#2A344A', color: '#fff', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="copies" name="Copies" fill="#17A2B8" radius={[4, 4, 0, 0]} barSize={32} />
                            <Bar dataKey="prompts" name="Prompts" fill="#701DCC" radius={[4, 4, 0, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart Panel */}
            <div className="xl:col-span-5 bg-[#111622] p-8 rounded-2xl border border-[#212A3D] space-y-6 shadow-lg">
                <div className="flex items-center gap-4">
                    <PieChartIcon className="w-7 h-7 text-[#FFC107]" />
                    <h2 className="text-xl text-white font-semibold">Prompt Distribution Share</h2>
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    {/* এখানেও height={400} ফিক্স করে দেওয়া হয়েছে */}
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={engineData}
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={140}
                                paddingAngle={5}
                                dataKey="prompts"
                                stroke="none"
                            >
                                {engineData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.shareColor} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1D2536', borderColor: '#2A344A', color: '#fff', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                                wrapperStyle={{ fontSize: '13px', color: '#B3BAC9', paddingTop: '20px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}