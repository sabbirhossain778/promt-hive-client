
import { protectedFetch, serverFetch } from "../core/server";

export const getAllPrompts = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const path = `/api/prompts?${query}`;
    const data = await serverFetch(path);
    return data;
}

export const getPromptById = async (promptId) => {
    return protectedFetch(`/api/prompts/${promptId}`)
}

export const getFeaturedPrompts = async () => {
    return serverFetch('/api/prompts/trending');
};

export const getCreatorPrompts = async (creatorId, status = 'all') => {

    const path = `/api/creator-prompts?creatorId=${creatorId}&status=${status}`;
    const data = await protectedFetch(path);
    return data;
}



export const getUserPromptCount = async (creatorId) => {
    try {
        const data = await protectedFetch(`/api/prompts/count/${creatorId}`);
        return data?.count || 0;
    } catch (error) {
        console.error("Error fetching user prompt count:", error);
        return 0;
    }
};

export const getTotalCopiesCount = async (creatorId) => {
    const data = await serverFetch(`/api/prompts/copies/${creatorId}`);
    return data?.total || 0;
};

export const getUserBookmarksCount = async (userId) => {
    const data = await protectedFetch(`/api/bookmarks/count/${userId}`);
    return data?.count || 0;
};


// for admin page
export const fetchAdminPageAllPrompts = async (page = 1) => {
    return protectedFetch(`/api/admin/all-prompts?page=${page}`);
};