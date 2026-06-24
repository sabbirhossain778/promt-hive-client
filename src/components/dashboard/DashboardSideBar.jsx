"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import {
    LayoutDashboard,
    Sparkles,
    PlusCircle,
    Settings,
    LogOut,
    Menu,
    Bookmark, Star, User, Users, CheckCircle
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export function DashboardSideBar() {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const role = user?.role || "user";

    // 1. User Nav Items
    const userNavItems = [
        { icon: User, href: "/dashboard/user/profile", label: "Profile" },
        { icon: Sparkles, href: "/dashboard/user/my-prompts", label: "My Prompts" },
        { icon: PlusCircle, href: "/dashboard/user/add-prompt", label: "Add Prompt" },
        { icon: Bookmark, href: "/dashboard/user/saved-prompts", label: "Saved Prompts" },
        { icon: Star, href: "/dashboard/user/my-reviews", label: "My Reviews" }
    ];

    // 2. Creator Nav Items
    const creatorNavItems = [
        { icon: LayoutDashboard, href: "/dashboard/creator", label: "Dashboard" },
        { icon: PlusCircle, href: "/dashboard/creator/add-prompt", label: "Add Prompt" },
        { icon: Sparkles, href: "/dashboard/creator/my-prompts", label: "My Prompts" },
        { icon: Bookmark, href: "/dashboard/creator/saved-prompts", label: "Saved Prompts" },
        { icon: User, href: "/dashboard/creator/profile", label: "Profile" },
        { icon: Settings, href: "/dashboard/creator/settings", label: "Settings" },
    ];

    // 3. Admin Nav Items
    const adminNavItems = [
        { icon: LayoutDashboard, href: "/dashboard/admin", label: "Admin Dashboard" },
        { icon: CheckCircle, href: "/dashboard/admin/approve-prompts", label: "Approve Prompts" },
        { icon: Users, href: "/dashboard/admin/manage-users", label: "Manage Users" },
        { icon: Settings, href: "/dashboard/admin/settings", label: "Settings" },
    ];

    let navItems = userNavItems;
    if (role === "admin") {
        navItems = adminNavItems;
    } else if (role === "creator") {
        navItems = creatorNavItems;
    }

    if (isPending) {
        return <div className="p-4 text-white">Loading sidebar...</div>;
    }

    const navContent = (
        <div className="flex flex-col h-full justify-between pb-4">
            <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.label} href={item.href}>
                            <button
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                                    ? "bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]" // Active State
                                    : "text-zinc-400 hover:bg-[#121626] hover:text-zinc-100" // Normal State
                                    }`}
                                type="button"
                            >
                                <item.icon className={`size-5 ${isActive ? "text-white" : "text-zinc-500"}`} />
                                {item.label}
                            </button>
                        </Link>
                    );
                })}
            </nav>

            {/* logout button */}
            <div className="mt-auto pt-4 border-t border-zinc-800/80">
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-danger transition-all hover:bg-danger/10">
                    <LogOut className="size-5" />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <>
            <aside className="hidden w-64 flex-col gap-4 border-r border-zinc-800/80 bg-[#0B1120] p-4 lg:flex sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                {/* User Profile Section */}
                <div className="flex items-center gap-3 px-4 py-6 mb-2 border-b border-white/10 shrink-0">
                    {/* User Avatar */}
                    <div className="relative shrink-0">
                        {user?.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={44}
                                height={44}
                                className="w-11 h-11 rounded-full object-cover border-2 border-[#8B5CF6]/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                            />
                        ) : (
                            <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#8B5CF6] to-[#5B21B6] flex items-center justify-center text-white font-bold text-lg border-2 border-[#8B5CF6]/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        {/* Active Status Dot */}
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0B0B0F] rounded-full"></span>
                    </div>

                    {/* User Info (Name & Role) */}
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-base font-bold text-white tracking-wide truncate">
                            {user?.name || "Loading..."}
                        </span>
                        <span className="text-xs font-medium text-zinc-400 capitalize mt-0.5">
                            {user?.role || "User"}
                        </span>
                    </div>
                </div>

                {navContent}
            </aside>

            {/* Mobile Sidebar (Small Screens using Drawer) */}
            <div className="lg:hidden w-full sticky top-0 z-50 p-4 bg-[#0B1120] border-b border-zinc-800/80 flex items-center justify-between">
                <Drawer>
                    <Button
                        isIconOnly
                        className="bg-[#0B1120] border border-zinc-800 text-zinc-300"
                        variant="bordered"
                        aria-label="Open Sidebar"
                    >
                        <Menu size={20} />
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="bg-[#0B1120] border-r border-zinc-800/80">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger className="text-zinc-400 hover:text-white mt-2 mr-2" />
                                <Drawer.Header className="border-b border-zinc-800/80 pb-4 pt-6">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#8B5CF6] p-1.5 rounded-lg">
                                            <Sparkles className="size-5 text-white" />
                                        </div>
                                        <span className="text-lg font-bold text-white tracking-wide">PromptHive</span>
                                    </div>
                                </Drawer.Header>
                                <Drawer.Body className="p-4">
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}