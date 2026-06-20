"use client";

import { Card } from "@heroui/react";
import { FiFileText, FiCopy, FiBookmark } from "react-icons/fi";

export default function SummaryCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Prompts Card */}
            <Card className="bg-[#0B1120] border border-gray-800/60 shadow-lg rounded-2xl overflow-hidden hover:border-[#8B5CF6]/50 transition-colors duration-300">
                <Card.Content className="flex flex-row items-center p-6 gap-6">
                    <div className="p-4 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                        <FiFileText className="w-8 h-8 text-[#8B5CF6]" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Prompts</p>
                        <h3 className="text-3xl font-bold text-white">8</h3>
                    </div>
                </Card.Content>
            </Card>

            {/* Total Copies Card */}
            <Card className="bg-[#0B1120] border border-gray-800/60 shadow-lg rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-300">
                <Card.Content className="flex flex-row items-center p-6 gap-6">
                    <div className="p-4 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                        <FiCopy className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Copies</p>
                        <h3 className="text-3xl font-bold text-white">210</h3>
                    </div>
                </Card.Content>
            </Card>

            {/* Total Bookmarks Card */}
            <Card className="bg-[#0B1120] border border-gray-800/60 shadow-lg rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors duration-300">
                <Card.Content className="flex flex-row items-center p-6 gap-6">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                        <FiBookmark className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Bookmarks</p>
                        <h3 className="text-3xl font-bold text-white">222</h3>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
}