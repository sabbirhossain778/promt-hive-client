
import { protectedFetch, serverFetch } from "../core/server";

export const getAllReports = async () => {
    return protectedFetch(`/api/admin/reported-prompts`);
};