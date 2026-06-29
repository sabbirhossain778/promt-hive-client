
import { Suspense } from 'react';
import AllPromptsClient from './AllPromptsClient';

export default function AllPromptsPage() {
    return (
        <Suspense fallback={<div className="text-white text-center p-10">Loading prompts...</div>}>
            <AllPromptsClient />
        </Suspense>
    );
}