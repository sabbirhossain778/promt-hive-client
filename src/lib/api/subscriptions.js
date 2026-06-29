
import { protectedFetch, serverFetch } from "../core/server";

export const getAllTransactions = async () => {
    return protectedFetch('/api/admin/payments');
};