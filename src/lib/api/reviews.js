'use server'

const { serverFetch } = require("../core/server");

export const getReviewsByPromptId = async (promptId) => {
    if (!promptId) return [];
    return serverFetch(`/api/reviews/${promptId}`);
};

export const getUserReviews = async (userId) => {
    return serverFetch(`/api/reviews/user/${userId}`);
};