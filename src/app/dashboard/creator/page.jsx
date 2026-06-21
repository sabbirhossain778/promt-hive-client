import React from 'react';
import SummaryCards from '@/components/dashboard/creator/SummaryCards';
import PromptStatsChart from '@/components/dashboard/creator/PromptStatsChart';
import AccumulativeGrowthChart from '@/components/dashboard/creator/AccumulativeGrowthChart';
import { getUserSession } from '@/lib/core/session';

const CreatorHomePage = async () => {

    const user = await getUserSession();

    return (
        <div className="p-6 pb-20 md:p-8 space-y-8 bg-[#050B14] min-h-screen text-white w-full">

            {/* Header Section */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    Welcome back, {user?.name || "Creator"}!
                </h1>
                <p className="text-gray-400 text-sm">
                    Real-time insights and performance metrics of your prompts.
                </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Charts Section */}
            <div className="flex flex-col gap-8 w-full mt-4">
                <PromptStatsChart />
                <AccumulativeGrowthChart />
            </div>

        </div>
    );
};

export default CreatorHomePage;