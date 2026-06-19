"use client";

import { Card } from "@heroui/react";
import { FiFileText, FiCopy, FiBookmark } from "react-icons/fi";


const StatCard = ({ title, value, Icon, colors }) => {
    return (
        <Card className={`bg-[#0B1120] border border-gray-800/60 shadow-lg rounded-2xl overflow-hidden transition-colors duration-300 ${colors.hoverBorder}`}>
            <Card.Content className="flex flex-row items-center p-6 gap-6">
                <div className={`p-4 rounded-2xl flex items-center justify-center border ${colors.bg} ${colors.border}`}>
                    <Icon className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-white">{value}</h3>
                </div>
            </Card.Content>
        </Card>
    );
};

export default function SummaryCards() {
    const summaryData = [
        {
            id: 1,
            title: "Total Prompts",
            value: 8,
            Icon: FiFileText,
            colors: {
                hoverBorder: "hover:border-[#8B5CF6]/50",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
                icon: "text-[#8B5CF6]",
            },
        },
        {
            id: 2,
            title: "Total Copies",
            value: 210,
            Icon: FiCopy,
            colors: {
                hoverBorder: "hover:border-cyan-500/50",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20",
                icon: "text-cyan-400",
            },
        },
        {
            id: 3,
            title: "Total Bookmarks",
            value: 222,
            Icon: FiBookmark,
            colors: {
                hoverBorder: "hover:border-emerald-500/50",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
                icon: "text-emerald-400",
            },
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryData.map((data) => (
                <StatCard 
                    key={data.id} 
                    title={data.title} 
                    value={data.value} 
                    Icon={data.Icon} 
                    colors={data.colors} 
                />
            ))}
        </div>
    );
}