'use server';

import { serverFetch } from "../core/server";

export const getAllPrompts = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const path = `/api/prompts?${query}`;
    const data = await serverFetch(path);
    return data;
}

export const getPromptById = async (promptId) => {
    return serverFetch(`/api/prompts/${promptId}`)
}

export const getCreatorPrompts = async (creatorId, status = 'all') => {

    const path = `/api/prompts?creatorId=${creatorId}&status=${status}`;
    const data = await serverFetch(path);
    return data;
}
