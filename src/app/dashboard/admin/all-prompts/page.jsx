import PromptsTable from '@/components/dashboard/admin/PromptsTable';
import { fetchAdminPageAllPrompts } from '@/lib/api/prompts';
import React from 'react';

const AdminPromptsPage = async ({ searchParams }) => {
    const params = await searchParams;
    const page = params.page || 1;
    
    const data = await fetchAdminPageAllPrompts(page);

    return (
        <div className="min-h-screen bg-[#0A0D15] p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-white">Prompt Template Submissions Moderation</h1>
                <PromptsTable 
                    initialPrompts={data?.prompts || []} 
                    totalPages={data?.totalPages || 1} 
                    currentPage={Number(page)}
                />
            </div>
        </div>
    );
};

export default AdminPromptsPage;