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
    Menu
} from "lucide-react";

export function DashboardSideBar() {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutDashboard, href: "/dashboard/creator", label: "Dashboard" },
        { icon: Sparkles, href: "/dashboard/creator/my-prompts", label: "My Prompts" },
        { icon: PlusCircle, href: "/dashboard/creator/add-prompt", label: "Add Prompt" },
        { icon: Settings, href: "/dashboard/creator/settings", label: "Settings" },
    ];

    const navContent = (
        <div className="flex flex-col h-full justify-between">
            <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    
                    return (
                        <Link key={item.label} href={item.href}>
                            <button
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                                    isActive 
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
            
            {/* নিচের দিকে লগআউট বাটন */}
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
            {/* Desktop Sidebar (Large Screens) */}
            <aside className="hidden w-64 flex-col gap-4 border-r border-zinc-800/80 bg-[#0B1120] p-4 lg:flex min-h-screen sticky top-0">
                {/* Logo Section */}
                <div className="flex items-center gap-2 px-2 py-4 mb-2">
                    <div className="bg-[#8B5CF6] p-1.5 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                        <Sparkles className="size-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">PromptHive</span>
                </div>
                
                {navContent}
            </aside>

            {/* Mobile Sidebar (Small Screens using Drawer) */}
            <div className="lg:hidden w-full sticky top-0 z-50 p-4 bg-[#0B1120] border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="size-5 text-[#8B5CF6]" />
                    <span className="text-lg font-bold text-white tracking-wide">PromptHive</span>
                </div>
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