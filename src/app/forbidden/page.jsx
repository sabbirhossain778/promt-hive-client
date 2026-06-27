import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0D15] p-6">
            {/* bg effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/10 blur-[120px] rounded-full"></div>
            </div>

            {/* card container */}
            <div className="relative z-10 bg-[#0B101D]/80 backdrop-blur-xl border border-white/5 p-10 rounded-3xl shadow-2xl text-center max-w-sm w-full">
                
                {/* icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                        <ShieldAlert className="w-12 h-12 text-rose-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Access Denied</h1>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                    You do not have the required permissions to access this area. Please contact support if you think this is a mistake.
                </p>


                <Link 
                    href="/" 
                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
}