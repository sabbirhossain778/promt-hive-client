"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Envelope, Lock, Person, Eye, EyeSlash, ArrowLeft } from "@gravity-ui/icons";
import { Label, Radio, RadioGroup } from "@heroui/react";
import { FiLink } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from 'react-toastify';

export default function SignupForm({ redirectTo }) {
    const router = useRouter();

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [role, setRole] = useState("user");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { error: authError } = await authClient.signUp.email({
                name,
                email,
                password,
                image: photoUrl,
                role,
            });

            if (authError) {
                setError(authError.message || "Something went wrong!");
                toast.error(authError.message || "Something went wrong!");
            } else {
                setSuccess("Account created successfully!");
                toast.success("Registration successful!");
                window.location.href = redirectTo;
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050B14] px-4 py-12 font-sans">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl p-[2px]">
                <div className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_60%,#8B5CF6_100%)]" />

                <div className="relative w-full h-full bg-[#0B1120] rounded-[22px] p-8 z-10">
                    <button onClick={() => router.back()} className="text-gray-400 hover:text-[#8B5CF6] transition-colors mb-8 w-fit flex items-center gap-2">
                        <ArrowLeft width={24} height={24} />Back
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an account</h2>

                    {error && <div className="mb-4 p-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg text-center">{error}</div>}

                    <button onClick={handleGoogleSignIn} disabled={googleLoading} className="google-btn w-full mb-4">
                        {googleLoading ? "Loading..." : "Continue with Google"}
                    </button>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full Name" className="w-full bg-[#1e293b] p-3 rounded-lg text-white" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full bg-[#1e293b] p-3 rounded-lg text-white" />
                        <input type={isVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="w-full bg-[#1e293b] p-3 rounded-lg text-white" />
                        <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required placeholder="Photo URL" className="w-full bg-[#1e293b] p-3 rounded-lg text-white" />

                        <RadioGroup
                            defaultValue="user"
                            name="plan-uncontrolled"
                            onChange={(nextValue) => setRole(nextValue)}

                        >
                            <Label>Select role</Label>
                            <Radio value="user">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    User
                                </Radio.Content>
                     
                            </Radio>
                            <Radio value="creator">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Creator
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>



                        <button type="submit" disabled={isLoading} className="w-full py-3 bg-[#8B5CF6] text-white rounded-lg">
                            {isLoading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have an account? <Link href="/auth/signin" className="text-[#8B5CF6] font-medium hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


