"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Sparkles } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = useSession();
    const user = session?.user;
    // console.log('Session:', session, 'Pending:', isPending);

    const handleSignOut = async () => {
        await signOut();
    }

    const navLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "All Prompts",
            href: "/all-prompts",
        }
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
                    {/* ไอকন বক্স */}
                    <div className="bg-[#8B5CF6] p-1.5 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                        <Sparkles className="size-5 text-white" />
                    </div>

                    {/* টেক্সট (ছোট স্ক্রিনে লুকানো থাকবে) */}
                    <div className="hidden sm:block leading-none">
                        <span className="text-xl font-bold text-white tracking-wide">
                            PromptHive
                        </span>
                    </div>
                </Link>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-6 md:flex">
                        {/* Nav Links */}
                        <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-white/20" />

                        {/* User Info or  */}
                        {user ?
                            <div className="flex items-center gap-4">
                                <span className="text-md font-medium text-gray-300">
                                    Welcome, {user.name} !
                                </span>
                                <button
                                    onClick={handleSignOut}
                                    className="group relative flex h-10 w-32 items-center justify-center overflow-hidden rounded-full border border-red-500/30 bg-transparent text-sm font-semibold text-red-500 transition-colors duration-500 hover:border-transparent hover:text-white z-10">
                                    <div className="absolute left-0 top-0 -z-10 h-full w-0 bg-gradient-to-r from-red-500 to-red-800 transition-all duration-500 ease-out group-hover:w-full"></div>

                                    Sign Out
                                </button>
                            </div> :
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-violet-400 transition hover:text-violet-300">
                                    Sign In
                                </Link>

                                <Link href="/auth/signup" passHref>
                                    <Button
                                        radius="lg"
                                        className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200 rounded-3xl"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        }
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden">
                    <div className="space-y-3 px-4 py-6">
                        {/* Nav Links */}
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="border-t border-white/10 pt-4">
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/auth/signin"
                                    className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>

                                <Button
                                    as={Link}
                                    href="/auth/signup"
                                    className="bg-white font-semibold text-black"
                                    radius="lg"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}