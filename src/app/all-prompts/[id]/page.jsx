import { getPromptById } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import PromptActions from '@/components/prompt-details/PromptActions';
import PromptContentBlock from '@/components/prompt-details/PromptContentBlock';
import PromptSidebar from '@/components/prompt-details/PromptSidebar';
import PromptReviews from '@/components/prompt-details/PromptReviews';
import { getReviewsByPromptId } from '@/lib/api/reviews';

const PromptDetailsPage = async ({ params }) => {
    const { id } = await params;
    const prompt = await getPromptById(id);
    const user = await getUserSession();
    const reviews = await getReviewsByPromptId(id);

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
        : 0;

    if (!user) {
        redirect(`/auth/signin?redirect=/all-prompts/${id}`);
    }

    // Default values mapping
    const {
        promptTitle = "Untitled Prompt",
        promptDescription = "No description provided.",
        promptContent = "Prompt content goes here...",
        aiTool = "UNKNOWN",
        category = "Uncategorized",
        difficulty = "BEGINNER",
        visibility = "Public",
        copies = 0,
        rating = 0,
        creatorName = "Unknown Creator",
        creatorEmail = "creator@aiverse.com",
        creatorImage
    } = prompt || {};

    // Check if the prompt is locked for the current user
    const isLocked = visibility === 'Private' && !user?.isPremium;

    return (
        <div className="min-h-screen bg-[#050B14] text-zinc-200 p-4 md:p-8 relative overflow-hidden">
            {/* 3D Background Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8B5CF6]/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#3B82F6]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-10">
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 leading-tight">
                            {promptTitle}
                        </h1>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            {promptDescription}
                        </p>
                    </div>

                    {/* Client Component for Bookmark & Report */}
                    <PromptActions promptId={id} userId={user.id} />
                </div>

                {/* MAIN GRID LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Prompt Template & Instructions */}
                    <div className="lg:col-span-2 space-y-8">
                        <PromptContentBlock
                            content={promptContent}
                            aiTool={aiTool}
                            initialCopies={prompt.copies}
                            isLocked={isLocked}
                            promptId={id}
                        />
                    </div>

                    {/* RIGHT COLUMN: Stats & Creator Info */}
                    <div className="space-y-6">
                        <PromptSidebar
                            prompt={{
                                ...prompt,
                                rating: averageRating,
                                reviewCount: totalReviews
                            }}
                        />
                    </div>
                </div>

                {/* REVIEWS SECTION */}
                <PromptReviews
                    promptId={id}
                    isLocked={isLocked}
                    user={user}
                    initialReviews={reviews}
                    
                />
            </div>
        </div>
    );
};

export default PromptDetailsPage;