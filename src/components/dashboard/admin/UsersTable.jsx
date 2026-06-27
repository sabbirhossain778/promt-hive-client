"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2, AlertTriangle } from 'lucide-react';
import { deleteUserAPI, updateUserRoleAPI } from '@/lib/actions/users';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [modal, setModal] = useState({ isOpen: false, userId: null });

    const handleDelete = async () => {
        const id = modal.userId;
        const res = await deleteUserAPI(id);

        if (res?.deletedCount > 0) {
            setUsers(users.filter(u => u._id !== id));
            toast.success("User deleted!");
        } else {
            toast.error("Failed to delete.");
        }
        setModal({ isOpen: false, userId: null });
    };

    const handleRoleChange = async (id, newRole) => {
        const res = await updateUserRoleAPI(id, newRole);

        if (res?.modifiedCount > 0 || res?.acknowledged) {
            setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
            toast.success("Role updated!");
        } else {
            toast.error("Update failed.");
        }
    };

    // const handleRoleChange = async (userId, newRole) => {
    //     const res = await updateUserRoleAPI(userId, newRole); // আপনার API কল

    //     if (res && res.success) { // এখন res.success পাওয়ার কথা
    //         toast.success("Role updated successfully!");
    //     } else {
    //         toast.error("Failed to update role.");
    //     }
    // };

    return (
        <div className="bg-[#111622] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl w-full relative">
            <ToastContainer theme="dark" position="top-center" autoClose={3000} />

            {/* Modal for delete btn */}
            {modal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#151B29] border border-[#1F2937] w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center gap-3 text-rose-500 mb-4">
                            <AlertTriangle className="w-8 h-8" />
                            <h3 className="text-lg font-bold text-white">Delete User?</h3>
                        </div>
                        <p className="text-zinc-400 text-sm mb-6">Are you sure? This action is permanent and cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setModal({ isOpen: false, userId: null })} className="flex-1 py-2 rounded-lg bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all">Cancel</button>
                            <button onClick={handleDelete} className="flex-1 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-all">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* All Users Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#151B29] border-b border-[#1F2937]">
                            {['Profile Details', 'Email Address', 'Subscription', 'Role Level', 'Registered Date', 'Actions'].map(head => (
                                <th key={head} className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F2937]/50">
                        {users.map((user) => (
                            <tr key={user.id || user._id} className="hover:bg-white/[0.02] transition-colors">
                                {/* Profile */}
                                <td className="p-5 flex items-center gap-3 whitespace-nowrap">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700 flex-shrink-0 bg-zinc-800">
                                        <Image
                                            src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                            alt={user.name || 'User'}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-200">{user.name}</span>
                                </td>

                                {/* Email */}
                                <td className="p-5 text-sm text-zinc-400 whitespace-nowrap">{user.email}</td>

                                {/* Subscription */}
                                <td className="p-5 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${user.plan?.includes('premium') ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                        {user.plan?.replace('user_', '').toUpperCase() || 'FREE'}
                                    </span>
                                </td>

                                {/* Role */}
                                <td className="p-5 whitespace-nowrap">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-[#1A2235] text-zinc-300 text-xs rounded-lg px-2 py-1 outline-none cursor-pointer border border-zinc-700"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="creator">Creator</option>
                                        <option value="user">User</option>
                                    </select>
                                </td>

                                {/* Date */}
                                <td className="p-5 text-sm text-zinc-400 whitespace-nowrap" suppressHydrationWarning>
                                    {new Date(user.createdAt).toLocaleDateString('en-US')}
                                </td>

                                {/* Actions */}
                                <td className="p-5 whitespace-nowrap">
                                    <button
                                        onClick={() => setModal({ isOpen: true, userId: user._id })}
                                        className="p-2 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}