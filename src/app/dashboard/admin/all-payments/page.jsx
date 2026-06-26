import React from 'react';
import { getAllTransactions } from '@/lib/api/subscriptions';

export default async function AllPaymentPage() {
    
    const payments = await getAllTransactions();

    return (
        <div className="min-h-screen bg-[#0A0D15] p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Stripe Premium Payments Log</h1>
                    <p className="text-sm text-zinc-400 mt-1">Comprehensive database of customer subscription transactions.</p>
                </div>

                <div className="bg-[#111622] border border-[#1F2937] rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#151B29] border-b border-[#1F2937]">
                                    <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Transaction ID</th>
                                    <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Purchaser Details</th>
                                    <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Billing Email</th>
                                    <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Amount Charged</th>
                                    <th className="p-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Payment Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1F2937]/50">
                                {payments?.map((pay) => (
                                    <tr key={pay._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-5 text-sm text-cyan-400 font-mono">{pay.transactionId}</td>
                                        <td className="p-5">
                                            <p className="text-sm text-zinc-300 font-medium">User</p>
                                            <p className="text-[10px] text-zinc-500 font-mono">ID: {pay.userId}</p>
                                        </td>
                                        <td className="p-5 text-sm text-zinc-300">{pay.email}</td>
                                        <td className="p-5 text-sm text-emerald-500 font-bold">${pay.amount.toFixed(2)}</td>
                                        <td className="p-5 text-sm text-zinc-400">
                                            {new Date(pay.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}