"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Envelope, Lock, Eye, EyeSlash, ArrowLeft } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from 'react-toastify';

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleGoogleSignIn = async () => {
        // google sign-in logic will go here
        console.log("Google Sign-In clicked");
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error: authError } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/dashboard"
            });

            if (authError) {
                toast.error(authError.message || "Invalid credentials!");
            } else {
                toast.success("Login successful!");
                router.push('/');
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

                {/* Google Button */}
                <button onClick={handleGoogleSignIn} disabled={googleLoading} className="google-btn">
                    {googleLoading ? "Loading..." : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </>
                    )}
                </button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700/60"></div></div>
                    <div className="relative flex justify-center text-xs"><span className="bg-[#0B1120] px-4 text-gray-500 font-medium uppercase tracking-wider">Or sign in with email</span></div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="input-wrapper">
                        <div className="pl-4 text-gray-500"><Envelope width={18} height={18} /></div>
                        <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required placeholder="Email Address" className="w-full bg-transparent border-none outline-none text-white text-sm px-3 py-3" />
                    </div>
                    
                    <div className="input-wrapper">
                        <div className="pl-4 text-gray-500"><Lock width={18} height={18} /></div>
                        <input 
                        type={isVisible ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} required 
                        placeholder="Password" 
                        className="w-full bg-transparent border-none outline-none text-white text-sm px-3 py-3" />
                        <button type="button" onClick={toggleVisibility} className="pr-4 text-gray-500 hover:text-gray-300">
                            {isVisible ? <EyeSlash width={18} height={18} /> : <Eye width={18} height={18} />}
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold rounded-xl transition-all">
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account? <Link href="/auth/signup" className="text-[#8B5CF6] font-medium hover:underline">Create account</Link>
                </p>
            </div>
        </div>
    );
}