'use server';

import { serverFetch } from "../core/server";


export const getCreatorPrompts = async (creatorId, status = 'all') => {

    const path = `/api/prompts?creatorId=${creatorId}&status=${status}`;
    const data = await serverFetch(path);
    return data;
}

export const getAllPrompts = async () => {
    const data = await serverFetch('/api/prompts');
    return data;
}