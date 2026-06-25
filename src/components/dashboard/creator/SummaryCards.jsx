import { Card } from "@heroui/react";
import { FiFileText, FiCopy, FiBookmark } from "react-icons/fi";
import { getUserSession } from '@/lib/core/session';
import { 
    getUserPromptCount, 
    getTotalCopiesCount, 
    getUserBookmarksCount 
} from '@/lib/api/prompts'; 

export default async function SummaryCards() {
    const user = await getUserSession();
    const userId = user?.id;

    const [totalPrompts, totalCopies, totalBookmarks] = await Promise.all([
        userId ? getUserPromptCount(userId) : 0,
        userId ? getTotalCopiesCount(userId) : 0,
        userId ? getUserBookmarksCount(userId) : 0
    ]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Prompts */}
            <Card className="bg-[#0B1120] border border-gray-800/60 shadow-lg rounded-2xl p-6 flex flex-row items-center gap-6">
                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                    <FiFileText className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Prompts</p>
                    <h3 className="text-3xl font-bold text-white">{totalPrompts}</h3>
                </div>
            </Card>

            {/* Total Copies */}
            <Card className="bg-[#0B1120] border border-gray-800/60 shadow-lg rounded-2xl p-6 flex flex-row items-center gap-6">
                <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                    <FiCopy className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Copies</p>
                    <h3 className="text-3xl font-bold text-white">{totalCopies}</h3>
                </div>
            </Card>

            {/* Total Bookmarks */}
            <Card className="bg-[#0B1120] border border-gray-800/60 shadow-lg rounded-2xl p-6 flex flex-row items-center gap-6">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <FiBookmark className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Bookmarks</p>
                    <h3 className="text-3xl font-bold text-white">{totalBookmarks}</h3>
                </div>
            </Card>
        </div>
    );
}