import React from 'react';
import { Users, FileText, MessageSquare, ClipboardList, DollarSign } from 'lucide-react';
import AnalyticsCharts from '@/components/dashboard/admin/AnalyticsCharts';



const AdminAnalyticsPage = async () => {
    
    // fake data
    const summaryData = await Promise.resolve({
        totalUsers: 4,
        totalPrompts: 13,
        totalReviews: 2,
        totalCopies: 768,
        totalRevenue: '10.00' 
    });

    const engineData = await Promise.resolve([
        { name: 'Midjourney', copies: 180, prompts: 120, shareColor: '#701DCC' }, 
        { name: 'ChatGPT', copies: 195, prompts: 140, shareColor: '#17A2B8' },   
        { name: 'Gemini', copies: 150, prompts: 100, shareColor: '#28A745' },   
        { name: 'Claude', copies: 250, prompts: 170, shareColor: '#FFC107' },   
        { name: 'Stable Diffusion', copies: 60, prompts: 40, shareColor: '#DC3545' }, 
    ]);

    const SummaryCard = ({ icon: Icon, title, value, iconColor }) => (
        <div className="flex items-center gap-4 bg-[#111622] p-6 rounded-xl border border-[#212A3D] shadow-inner transition-transform hover:scale-[1.03] hover:border-[#303E5A]">
            <div className={`p-4 rounded-xl bg-[#1D2536] border border-[#2A344A]`}>
                <Icon className={`w-8 h-8 ${iconColor}`} />
            </div>
            <div>
                <p className="text-xs text-[#7D869E] uppercase tracking-wider font-medium">{title}</p>
                <p className="text-3xl text-white font-black">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0A0D15] p-8 space-y-12 text-[#B3BAC9]">
            {/* Header Section */}
            <header>
                <h1 className="text-4xl text-white font-semibold mb-1">Administrative System Analytics</h1>
                <p className="text-sm text-[#7D869E]">Aggregate metrics and engine distribution breakdowns.</p>
            </header>

            {/* Summary Bar Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
                <SummaryCard icon={Users} title="TOTAL USERS" value={summaryData.totalUsers} iconColor="text-[#701DCC]" />
                <SummaryCard icon={FileText} title="TOTAL PROMPTS" value={summaryData.totalPrompts} iconColor="text-[#17A2B8]" />
                <SummaryCard icon={MessageSquare} title="TOTAL REVIEWS" value={summaryData.totalReviews} iconColor="text-[#28A745]" />
                <SummaryCard icon={ClipboardList} title="TOTAL COPIES" value={summaryData.totalCopies} iconColor="text-[#FFC107]" />
                <SummaryCard icon={DollarSign} title="TOTAL REVENUE" value={`$${summaryData.totalRevenue}`} iconColor="text-[#DC3545]" />
            </section>

            {/* Recharts Client Component call */}
            <AnalyticsCharts engineData={engineData} />
            
        </div>
    );
};

export default AdminAnalyticsPage;