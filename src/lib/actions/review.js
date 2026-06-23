'use server'
import { revalidatePath } from 'next/cache';
const { serverMutation } = require("../core/server")

export const submitReview = async (reviewData) => {
    const result = await serverMutation('/api/reviews', reviewData, 'POST');
    revalidatePath(`/all-prompts/${reviewData.promptId}`); 
    return result;
};