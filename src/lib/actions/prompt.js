'use server'

const { serverMutation } = require("../core/server")

export const createPrompt = async (newPromptData) => {
    return serverMutation('/api/prompts', newPromptData)
} 




// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createPrompt = async (newPromptData) => {
//     const res = await fetch(`${baseUrl}/api/prompts`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newPromptData)
//     });
//     return res.json();
// }