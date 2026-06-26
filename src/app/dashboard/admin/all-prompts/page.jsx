import PromptsTable from '@/components/dashboard/admin/PromptsTable';
import { fetchAdminPageAllPrompts } from '@/lib/api/prompts';
import React from 'react';


const AdminPromptsPage = async () => {

    const prompts = await fetchAdminPageAllPrompts();
 
    return (
        <div className="min-h-screen bg-[#0A0D15] p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Prompt Template Submissions Moderation</h1>
                    <p className="text-sm text-zinc-400 mt-1">Approve templates, reject with feedback, or tag featured highlights.</p>
                </div>
                
                <PromptsTable initialPrompts={prompts || []} />
            </div>
        </div>
    );
};

export default AdminPromptsPage;