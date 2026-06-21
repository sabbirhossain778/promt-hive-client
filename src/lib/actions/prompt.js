'use server'

const { serverMutation } = require("../core/server")

export const createPrompt = async (newPromptData) => {
    return serverMutation('/api/prompts', newPromptData)
} 

