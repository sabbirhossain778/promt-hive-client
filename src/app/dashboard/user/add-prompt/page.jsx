// "use client";

// import React, { useState, useEffect } from "react";
// import {
//     Form, Fieldset, TextField, Label, Input, TextArea, FieldError,
//     Select, ListBox, RadioGroup, Radio, Button
// } from "@heroui/react";
// import { Sparkles, ArrowUpToLine } from "@gravity-ui/icons";
// import { Crown } from 'lucide-react';
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/lib/auth-client";
// import Image from "next/image";

// // Server Actions & APIs
// import { createPrompt } from "@/lib/actions/prompt";
// import { getUserPromptCount } from "@/lib/api/prompts";
// import { getPlanById } from "@/lib/api/plans";

// export default function UserAddPromptPage() {
//     const router = useRouter();
//     const { data: session } = useSession();
//     const user = session?.user;

//     const [visibility, setVisibility] = useState("Public");
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [promptCount, setPromptCount] = useState(0);
//     const [loadingCount, setLoadingCount] = useState(true);
//     const [planData, setPlanData] = useState(null);
    
//     // Thumbnail States
//     const [thumbnailUrl, setThumbnailUrl] = useState('');
//     const [isUploading, setIsUploading] = useState(false);

//     // Prompt count fetch
//     useEffect(() => {
//         if (user?.id) {
//             getUserPromptCount(user.id).then(count => {
//                 setPromptCount(count);
//                 setLoadingCount(false);
//             });
//         }
//     }, [user?.id]);

//     // fetch user plan data
//     useEffect(() => {
//         if (user?.plan) {
//             getPlanById(user.plan).then(data => setPlanData(data));
//         }
//     }, [user?.plan]);

//     // dynamic limit check
//     const isLimitReached = !loadingCount && planData && (promptCount >= planData.maxApplicationsPerMonth);

//     const handleThumbnailUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         setIsUploading(true);
//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
//             const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
//                 method: 'POST',
//                 body: formData
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setThumbnailUrl(data.data.url);
//             } else {
//                 toast.error("Upload failed.");
//             }
//         } catch (err) {
//             toast.error("Network error.");
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (isLimitReached) return;

//         const formData = new FormData(e.target);
//         const data = Object.fromEntries(formData.entries());

//         setIsSubmitting(true);
        
//         const payload = {
//             ...data,
//             thumbnailUrl,
//             visibility,
//             creatorId: user?.id,
//             isPremium: visibility === "Private",
//             status: "pending"
//         };

//         try {
//             const res = await createPrompt(payload);
//             if (res.insertedId) {
//                 toast.success("Prompt added successfully!");
//                 router.push("/dashboard/user/my-prompts");
//             }
//         } catch (error) {
//             toast.error("Failed to add prompt.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#050B14] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
//             {isLimitReached && (
//                 <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050B14]/90 backdrop-blur-md p-4">
//                     <div className="bg-[#0B1120] border border-zinc-800 p-8 rounded-2xl max-w-md text-center shadow-2xl">
//                         <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
//                         <h2 className="text-2xl font-bold text-white mb-2">Limit Reached!</h2>
//                         <p className="text-zinc-400 mb-6">You have reached the limit of 3 prompts on the Free plan. Upgrade to Premium for unlimited access.</p>
//                         <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12" onClick={() => router.push('/plans')}>
//                             Upgrade to Premium
//                         </Button>
//                     </div>
//                 </div>
//             )}

//             <div className={`max-w-3xl mx-auto bg-[#0B1120] border border-zinc-900 rounded-xl p-8 shadow-2xl transition-all ${isLimitReached ? 'blur-sm' : ''}`}>
//                 <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Sparkles className="text-[#8B5CF6]" /> Create New Prompt</h1>
                
//                 <Form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <TextField name="promptTitle" isInvalid={!!errors.promptTitle}><Label>Title</Label><Input /></TextField>
//                         <TextField name="category" isInvalid={!!errors.category}><Label>Category</Label><Input /></TextField>
//                     </div>
                    
//                     <TextField name="promptDescription" isInvalid={!!errors.promptDescription}><Label>Description</Label><TextArea /></TextField>
//                     <TextField name="promptContent" isInvalid={!!errors.promptContent}><Label>Content</Label><TextArea /></TextField>
                    
//                     <div className="flex items-center gap-4">
//                         <label className="w-16 h-16 border border-dashed rounded-xl flex items-center justify-center cursor-pointer">
//                             <input type="file" onChange={handleThumbnailUpload} className="hidden" />
//                             {thumbnailUrl ? <Image src={thumbnailUrl} width={64} height={64} alt="thumb" /> : <ArrowUpToLine />}
//                         </label>
//                         <span>{isUploading ? "Uploading..." : "Upload Thumbnail"}</span>
//                     </div>

//                     <Button type="submit" disabled={isSubmitting} className="w-full bg-[#8B5CF6] h-11">
//                         {isSubmitting ? "Submitting..." : "Submit Prompt"}
//                     </Button>
//                 </Form>
//             </div>
//         </div>
//     );
// }



"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    RadioGroup,
    Radio,
    Button
} from "@heroui/react";
import { Sparkles, Globe, ArrowUpToLine } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { createPrompt } from "@/lib/actions/prompt";
import Image from "next/image";

export default function AddPromptPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const [visibility, setVisibility] = useState("Public");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ImageBB Upload States
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    //  Client side Imgbb Upload Handler
    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, thumbnail: "File size exceeds 5MB limit" }));
            return;
        }

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
                setErrors(prev => ({ ...prev, thumbnail: null }));
            } else {
                setErrors(prev => ({ ...prev, thumbnail: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, thumbnail: "Network error during upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Validation
        const newErrors = {};
        if (!data.promptTitle) newErrors.promptTitle = "Prompt title is required";
        if (!data.category) newErrors.category = "Category is required";
        if (!data.aiTool) newErrors.aiTool = "AI Tool is required";
        if (!data.difficulty) newErrors.difficulty = "Difficulty level is required";
        if (!data.promptDescription) newErrors.promptDescription = "Description is required";
        if (!data.promptContent) newErrors.promptContent = "Prompt content is required";
        if (!data.tags) newErrors.tags = "Tags are required";
        if (!thumbnailUrl) newErrors.thumbnail = "Thumbnail image is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            thumbnailUrl: thumbnailUrl,
            visibility: visibility,
            copyCount: 0,
            rating: 0,
            status: "pending",
            creatorId: user?.id,
            creatorName: user?.name,
            creatorEmail: user?.email,
            creatorImage: user?.image || "",
        };

        try {
            const res = await createPrompt(payload);

            if (res.insertedId) {
                toast.success("Prompt added successfully! Waiting for admin approval.");
                e.target.reset();
                setVisibility("Public");
                setThumbnailUrl('');
                router.push("/dashboard/user/my-prompts");
            } else {
                toast.error("Something went wrong. Could not add prompt.");
            }
        } catch (error) {
            toast.error("Failed to add prompt. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050B14] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#0B1120] border border-zinc-900 rounded-xl p-8 shadow-2xl">

                {/* Form Header block */}
                <div className="border-b border-zinc-800 pb-6 mb-8 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                            <Sparkles className="text-[#8B5CF6]" /> Create New Prompt
                        </h1>
                        <p className="text-zinc-400 text-sm mt-1">
                            Share your best AI prompts with the marketplace.
                        </p>
                    </div>
                    <div
                        className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        Status: <span className="text-[#8B5CF6] font-medium bg-purple-950/30 px-1.5 py-0.5 rounded border border-purple-900/50">Pending</span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior='aria'>

                    {/* SECTION 1: Basic Information */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Basic Information
                        </legend>

                        {/* prompt title & description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="promptTitle" isInvalid={!!errors.promptTitle} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Prompt Title</Label>
                                <Input placeholder="e.g. Expert SEO Blog Writer" className="text-input-class" />
                                {errors.promptTitle && <FieldError className="text-xs text-danger mt-1">{errors.promptTitle}</FieldError>}
                            </TextField>

                            <Select className="select-box-class" name="category" isInvalid={!!errors.category}>
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Category</Label>
                                <Select.Trigger className="trigger-classes">
                                    <Select.Value className="text-white placeholder:text-zinc-600" />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.category && <span className="text-xs text-danger mt-1">{errors.category}</span>}
                                <Select.Popover className="popover-classes">
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="Development" className="list-item-classes" textValue="Development">Development</ListBox.Item>
                                        <ListBox.Item id="Marketing" className="list-item-classes" textValue="Marketing">Marketing</ListBox.Item>
                                        <ListBox.Item id="Design" className="list-item-classes" textValue="Design">Design</ListBox.Item>
                                        <ListBox.Item id="Productivity" className="list-item-classes" textValue="Productivity">Productivity</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* AI Tool & Difficulty Level */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <Select className="select-box-class" name="aiTool" isInvalid={!!errors.aiTool}>
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">AI Tool</Label>
                                <Select.Trigger className="trigger-classes">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.aiTool && <span className="text-xs text-danger mt-1">{errors.aiTool}</span>}
                                <Select.Popover className="popover-classes">
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="ChatGPT" className="list-item-classes" textValue="ChatGPT">ChatGPT</ListBox.Item>
                                        <ListBox.Item id="Gemini" className="list-item-classes" textValue="Gemini">Gemini</ListBox.Item>
                                        <ListBox.Item id="Claude" className="list-item-classes" textValue="Claude">Claude</ListBox.Item>
                                        <ListBox.Item id="Midjourney" className="list-item-classes" textValue="Midjourney">Midjourney</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select className="select-box-class" name="difficulty" isInvalid={!!errors.difficulty}>
                                <Label className="text-zinc-400 font-medium text-sm mb-1 block">Difficulty Level</Label>
                                <Select.Trigger className="trigger-classes">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                {errors.difficulty && <span className="text-xs text-danger mt-1">{errors.difficulty}</span>}
                                <Select.Popover className="popover-classes">
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="Beginner" className="list-item-classes" textValue="Beginner">Beginner</ListBox.Item>
                                        <ListBox.Item id="Intermediate" className="list-item-classes" textValue="Intermediate">Intermediate</ListBox.Item>
                                        <ListBox.Item id="Pro" className="list-item-classes" textValue="Pro">Pro</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Thumbnail Image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* ✅ Replaced TextField with ImgBB Upload Block */}
                            <div className="flex flex-col gap-1 w-full pt-1">
                                <span className="text-zinc-400 font-medium text-sm">Thumbnail Image</span>
                                <div className="flex items-center gap-4 mt-1">
                                    <label className="w-16 h-16 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden shrink-0">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/webp"
                                            onChange={handleThumbnailUpload}
                                            className="hidden"
                                        />
                                        {thumbnailUrl ? (
                                            <Image src={thumbnailUrl} width={100} height={100}
                                                unoptimized
                                                alt="Thumbnail Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ArrowUpToLine size={20} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                        )}
                                    </label>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-zinc-300">
                                            {isUploading ? 'Uploading file...' : 'Upload image'}
                                        </span>
                                        <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                                        {errors.thumbnail && <span className="text-xs text-danger mt-1">{errors.thumbnail}</span>}
                                    </div>
                                </div>
                            </div>

                            <TextField name="tags" isInvalid={!!errors.tags} className="flex flex-col gap-1 w-full pt-1">
                                <Label className="text-zinc-400 font-medium text-sm">Tags (Comma separated)</Label>
                                <Input placeholder="e.g. seo, blogging, writing" className="text-input-class" />
                                {errors.tags && <FieldError className="text-xs text-danger mt-1">{errors.tags}</FieldError>}
                            </TextField>
                        </div>
                    </Fieldset>

                    {/* SECTION 2: Prompt Details */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Prompt Content & Instructions
                        </legend>

                        <TextField name="promptDescription" isInvalid={!!errors.promptDescription} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Prompt Description</Label>
                            <TextArea
                                placeholder="Explain what this prompt does..."
                                rows={3}
                                className="text-area-class"
                            />
                            {errors.promptDescription && <FieldError className="text-xs text-danger mt-1">{errors.promptDescription}</FieldError>}
                        </TextField>

                        <TextField name="promptContent" isInvalid={!!errors.promptContent} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Exact Prompt Content</Label>
                            <TextArea
                                placeholder="Paste the actual prompt here..."
                                rows={5}
                                className="text-area-class font-mono"
                            />
                            {errors.promptContent && <FieldError className="text-xs text-danger mt-1">{errors.promptContent}</FieldError>}
                        </TextField>
                    </Fieldset>

                    {/* SECTION 3: Prompt Visibility with RadioGroup */}
                    <Fieldset className="w-full bg-[#121214] p-5 rounded-xl border border-zinc-900">
                        <div className="flex flex-col space-y-4">
                            <div className="space-y-1">
                                <span className="text-zinc-300 font-medium text-base block">Prompt Visibility</span>
                                <span className="text-zinc-500 text-sm block">
                                    Private prompts are locked behind Premium subscriptions ($5).
                                </span>
                            </div>

                            <RadioGroup
                                defaultValue="Public"
                                name="visibility"
                                orientation="horizontal"
                                onChange={value => setVisibility(value)}
                            >
                                <Radio value="Public">
                                    <Radio.Content>
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        Public
                                    </Radio.Content>
                                </Radio>

                                <Radio value="Private" className="ml-4">
                                    <Radio.Content>
                                        <Radio.Control>
                                            <Radio.Indicator />
                                        </Radio.Control>
                                        Private
                                    </Radio.Content>
                                </Radio>
                            </RadioGroup>
                        </div>
                    </Fieldset>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
                        <Button
                            type="button"
                            onClick={() => router.back()}
                            variant="bordered"
                            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-6 font-medium h-11"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#8B5CF6] text-white font-semibold hover:bg-[#7C3AED] rounded-lg px-6 transition-colors h-11 disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Prompt"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
