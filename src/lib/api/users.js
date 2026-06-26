import { serverFetch } from "../core/server";

export const fetchAllUsers = async () => {
    return serverFetch('/api/users');
};