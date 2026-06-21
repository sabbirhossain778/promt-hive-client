'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getCreatorPrompts = async (creatorId, status = 'pending') => {
    const res = await fetch(`${baseUrl}/api/prompts?creatorId=${creatorId}&status=${status}`);
    return res.json();
}