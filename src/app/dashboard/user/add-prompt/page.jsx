"use client";

import React, { useState, useEffect } from "react";
import {
    Form, Fieldset, TextField, Label, Input, TextArea, FieldError,
    Select, ListBox, RadioGroup, Radio, Button
} from "@heroui/react";
import { Sparkles, ArrowUpToLine } from "@gravity-ui/icons";
import { Crown } from 'lucide-react';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

// Server Actions & APIs
import { createPrompt } from "@/lib/actions/prompt";
import { getUserPromptCount } from "@/lib/api/prompts";
import { getPlanById } from "@/lib/api/plans";

export default function UserAddPromptPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const [visibility, setVisibility] = useState("Public");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [promptCount, setPromptCount] = useState(0);
    const [loadingCount, setLoadingCount] = useState(true);
    const [planData, setPlanData] = useState(null);
    
    // Thumbnail States
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Prompt count fetch
    useEffect(() => {
        if (user?.id) {
            getUserPromptCount(user.id).then(count => {
                setPromptCount(count);
                setLoadingCount(false);
            });
        }
    }, [user?.id]);

    // fetch user plan data
    useEffect(() => {
        if (user?.plan) {
            getPlanById(user.plan).then(data => setPlanData(data));
        }
    }, [user?.plan]);

    // dynamic limit check
    const isLimitReached = !loadingCount && planData && (promptCount >= planData.maxApplicationsPerMonth);

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setThumbnailUrl(data.data.url);
            } else {
                toast.error("Upload failed.");
            }
        } catch (err) {
            toast.error("Network error.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLimitReached) return;

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setIsSubmitting(true);
        
        const payload = {
            ...data,
            thumbnailUrl,
            visibility,
            creatorId: user?.id,
            isPremium: visibility === "Private",
            status: "pending"
        };

        try {
            const res = await createPrompt(payload);
            if (res.insertedId) {
                toast.success("Prompt added successfully!");
                router.push("/dashboard/user/my-prompts");
            }
        } catch (error) {
            toast.error("Failed to add prompt.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050B14] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
            {isLimitReached && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050B14]/90 backdrop-blur-md p-4">
                    <div className="bg-[#0B1120] border border-zinc-800 p-8 rounded-2xl max-w-md text-center shadow-2xl">
                        <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Limit Reached!</h2>
                        <p className="text-zinc-400 mb-6">You have reached the limit of 3 prompts on the Free plan. Upgrade to Premium for unlimited access.</p>
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12" onClick={() => router.push('/plans')}>
                            Upgrade to Premium
                        </Button>
                    </div>
                </div>
            )}

            <div className={`max-w-3xl mx-auto bg-[#0B1120] border border-zinc-900 rounded-xl p-8 shadow-2xl transition-all ${isLimitReached ? 'blur-sm' : ''}`}>
                <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Sparkles className="text-[#8B5CF6]" /> Create New Prompt</h1>
                
                <Form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="promptTitle" isInvalid={!!errors.promptTitle}><Label>Title</Label><Input /></TextField>
                        <TextField name="category" isInvalid={!!errors.category}><Label>Category</Label><Input /></TextField>
                    </div>
                    
                    <TextField name="promptDescription" isInvalid={!!errors.promptDescription}><Label>Description</Label><TextArea /></TextField>
                    <TextField name="promptContent" isInvalid={!!errors.promptContent}><Label>Content</Label><TextArea /></TextField>
                    
                    <div className="flex items-center gap-4">
                        <label className="w-16 h-16 border border-dashed rounded-xl flex items-center justify-center cursor-pointer">
                            <input type="file" onChange={handleThumbnailUpload} className="hidden" />
                            {thumbnailUrl ? <Image src={thumbnailUrl} width={64} height={64} alt="thumb" /> : <ArrowUpToLine />}
                        </label>
                        <span>{isUploading ? "Uploading..." : "Upload Thumbnail"}</span>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-[#8B5CF6] h-11">
                        {isSubmitting ? "Submitting..." : "Submit Prompt"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}