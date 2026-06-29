
import { protectedFetch, serverFetch } from "../core/server";
import { headers } from "next/headers";
import { auth } from "../auth";


export const fetchAllUsers = async () => {
    return protectedFetch('/api/users');
};


export const getUsersList = async () => {
    const users = await auth.api.listUsers({
        query: {
            sortBy: "createdAt",
            sortDirection: "desc"
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    });
    return users;
}