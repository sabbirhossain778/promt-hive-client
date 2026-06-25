'use server'

const { serverMutation } = require("../core/server")

export const createPrompt = async (newPromptData) => {
    return serverMutation('/api/prompts', newPromptData)
} 

export const updatePrompt = async (id, updatedData) => {
    return serverMutation(`/api/prompts/${id}`, updatedData, 'PATCH');
};

export const deletePrompt = async (promptId) => {
    return serverMutation(`/api/prompts/${promptId}`, {}, 'DELETE');
};
