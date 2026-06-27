import React from 'react';
import { fetchAllUsers, getUsersList } from '@/lib/api/users';
import UsersTable from '@/components/dashboard/admin/UsersTable';


export default async function AllUsersPage() {

    // const users = await fetchAllUsers();
    const data = await getUsersList();
    const users = data.users;
    // console.log("Users Data:", users);


    return (
        <div className="min-h-screen bg-[#0A0D15] p-6 md:p-10 font-sans selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">User Role & Accounts Management</h1>
                    <p className="text-sm text-zinc-400 mt-1">Review accounts, modify role scopes, and delete users.</p>
                </div>

                <UsersTable initialUsers={users} />               
            </div>
        </div>
    );
}