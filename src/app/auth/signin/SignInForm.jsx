"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Envelope, Lock, Eye, EyeSlash, ArrowLeft } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from 'react-toastify';

export default function SignInForm({ redirectTo }) {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: redirectTo,
            });
        } catch (err) {
            toast.error("An unexpected error occurred during Google Sign-In.");
            setGoogleLoading(false);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error: authError } = await authClient.signIn.email({
                email,
                password,
            });

            if (authError) {
                toast.error(authError.message || "Invalid credentials!");
            } else {
                toast.success("Login successful!");
                window.location.href = redirectTo;
            }
        } catch (err) {
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050B14] px-4 py-12 font-sans">
            <div className="w-full max-w-md bg-[#0B1120] border border-gray-800 rounded-3xl p-8 shadow-2xl">
                <button onClick={() => router.back()} className="text-gray-400 hover:text-[#8B5CF6] transition-colors mb-8 w-fit flex items-center gap-2">
                    <ArrowLeft width={24} height={24} />Back
                </button>

                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
                    <p className="text-gray-400 text-sm">Sign in to your Prompt Hive account.</p>
                </div>

                <button onClick={handleGoogleSignIn} disabled={googleLoading} className="google-btn w-full mb-4">
                    {googleLoading ? "Loading..." : "Continue with Google"}
                </button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700/60"></div></div>
                    <div className="relative flex justify-center text-xs"><span className="bg-[#0B1120] px-4 text-gray-500 font-medium uppercase tracking-wider">Or sign in with email</span></div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="input-wrapper">
                        <div className="pl-4 text-gray-500"><Envelope width={18} height={18} /></div>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" className="w-full bg-transparent border-none outline-none text-white text-sm px-3 py-3" />
                    </div>

                    <div className="input-wrapper">
                        <div className="pl-4 text-gray-500"><Lock width={18} height={18} /></div>
                        <input type={isVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="w-full bg-transparent border-none outline-none text-white text-sm px-3 py-3" />
                        <button type="button" onClick={toggleVisibility} className="pr-4 text-gray-500 hover:text-gray-300">
                            {isVisible ? <EyeSlash width={18} height={18} /> : <Eye width={18} height={18} />}
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold rounded-xl transition-all">
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account? <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-[#8B5CF6] font-medium hover:underline">Create account</Link>
                </p>
            </div>
        </div>
    );
}