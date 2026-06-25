"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { Star, Check, Sparkles } from '@gravity-ui/icons';
import { useRouter } from "next/navigation";

export default function PaymentPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#050B14] py-16 px-4 flex flex-col items-center justify-center">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-white mb-4">Upgrade to Premium</h1>
                <p className="text-zinc-400">Unlock your full potential with a one-time purchase.</p>
            </div>

            {/* Pricing Card */}
            <Card className="bg-[#0B1120] border border-zinc-800 p-8 max-w-sm w-full rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>

                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-amber-500/10 rounded-full mb-6">
                        <Star className="w-10 h-10 text-amber-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">Lifetime Access</h2>
                    <div className="text-5xl font-black text-white my-6">
                        $5 <span className="text-lg text-zinc-500 font-normal">/ one-time</span>
                    </div>

                    <ul className="space-y-4 mb-8 text-left w-full">
                        {[
                            "Unlimited Prompt Creation",
                            "Unlock All Private Content",
                            "Priority Badge on Profile",
                            "No Hidden Fees"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-300">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-emerald-400" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="w-full">
                        <form action="/api/checkout_sessions" method="POST">
                            <section>
                                <button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold h-12 rounded-lg transition-all " type="submit" role="link">
                                    Checkout
                                </button>
                            </section>
                        </form>
                    </div>
                </div>
            </Card>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center gap-6 text-zinc-600">
                <div className="flex items-center gap-2"><Star className="w-4 h-4" /> Secure Payment</div>
                <div className="flex items-center gap-2"><Star className="w-4 h-4" /> 14-Day Refund</div>
            </div>
        </div>
    );
}