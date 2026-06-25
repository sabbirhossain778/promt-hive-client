import EditPromptForm from '@/components/prompt-details/EditPromptForm';
import { getPromptById } from '@/lib/api/prompts';

export default async function EditPromptPage({ params }) {
    const { id } = await params;
    const prompt = await getPromptById(id);

    if (!prompt) return <div className="text-white p-10">Prompt not found!</div>;

    return (
        <div className="min-h-screen w-full bg-[#050B14]">
             <EditPromptForm prompt={prompt} id={id} />
        </div>
    );
}