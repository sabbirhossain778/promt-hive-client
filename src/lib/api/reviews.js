
import { protectedFetch, serverFetch } from "../core/server";

export const getReviewsByPromptId = async (promptId) => {
    if (!promptId) return [];
    return protectedFetch(`/api/reviews/${promptId}`);
};

export const getUserReviews = async (userId) => {
    return protectedFetch(`/api/reviews/user/${userId}`);
};