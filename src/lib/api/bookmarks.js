import { protectedFetch, serverFetch } from "../core/server";


export const checkBookmarkStatus = async (promptId, userId) => {
    if (!promptId || !userId) return false;
    const path = `/api/bookmarks/check/${promptId}?userId=${userId}`;
    const data = await protectedFetch(path);
    return data?.isBookmarked || false;
};

export const getSavedPromptsByUserId = async (userId) => {
    console.log("Fetching for User ID:", userId);
    return protectedFetch(`/api/saved-prompts?savedBy=${userId}`);
}

