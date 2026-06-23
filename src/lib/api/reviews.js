'use server'

const { serverFetch } = require("../core/server");

export const getReviewsByPromptId = async (promptId) => {
    if (!promptId) return [];
    return serverFetch(`/api/reviews/${promptId}`);
};

