'use server'

const { serverFetch } = require("../core/server");

export const checkBookmarkStatus = async (promptId, userId) => {
    if (!promptId || !userId) return false;
    const path = `/api/bookmarks/check/${promptId}?userId=${userId}`;
    const data = await serverFetch(path);
    return data?.isBookmarked || false;
};

export const getSavedPromptsByUserId = async (userId) => {
    console.log("Fetching for User ID:", userId);
    return serverFetch(`/api/saved-prompts?savedBy=${userId}`);
}

