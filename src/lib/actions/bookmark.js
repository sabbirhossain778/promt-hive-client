'use server'

import { revalidatePath } from "next/cache"

const { serverMutation } = require("../core/server")

export const toggleBookmark = async ({ promptId, userId }) => {
    return serverMutation('/api/bookmarks/toggle', { promptId, userId });
};

export const removeBookmark = async ({ promptId, userId }) => {
    return serverMutation('/api/bookmarks/toggle', { promptId, userId });
};

export const submitReport = async (data) => {
    return serverMutation('/api/reports', data)
}

export const incrementCopyCount = async (promptId) => {
    const result = await serverMutation(`/api/prompts/${promptId}/copy`, {}, 'PATCH');
    revalidatePath(`/all-prompts/${promptId}`);
    return result;
}

