import { serverFetch } from "../core/server";

export const getAllReports = async () => {
    return serverFetch(`/api/admin/reported-prompts`);
};