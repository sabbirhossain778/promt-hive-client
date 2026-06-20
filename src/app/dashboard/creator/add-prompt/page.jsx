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
    RadioGroup, // ✅ Added RadioGroup
    Radio,      // ✅ Added Radio
    Button
} from "@heroui/react";
import { Sparkles, Globe } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { createPrompt } from "@/lib/actions/prompt";

export default function AddPromptPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const [visibility, setVisibility] = useState("Public");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!data.thumbnail) newErrors.thumbnail = "Thumbnail URL is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            visibility: visibility,
            copyCount: 0,
            status: "pending",
            creatorId: user?.id,
            creatorEmail: user?.email
        };

        try {
            const res = await createPrompt(payload);

            if (res.insertedId) {
                toast.success("Prompt added successfully! Waiting for admin approval.");
                e.target.reset();
                setVisibility("Public");
                router.push("/dashboard/creator/my-prompts");
            } else {
                toast.error("Something went wrong. Could not add prompt.");
            }
        } catch (error) {
            // console.error("Error creating prompt:", error);
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
                    <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                        Status: <span className="text-[#8B5CF6] font-medium bg-purple-950/30 px-1.5 py-0.5 rounded border border-purple-900/50">Pending</span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior='aria'>

                    {/* SECTION 1: Basic Information */}
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                            Basic Information
                        </legend>

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <TextField name="thumbnail" isInvalid={!!errors.thumbnail} className="flex flex-col gap-1 w-full relative">
                                <Label className="text-zinc-400 font-medium text-sm">Thumbnail Image URL</Label>
                                <div className="relative flex items-center">
                                    <Globe size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input
                                        placeholder="https://example.com/thumbnail.jpg"
                                        className="text-input-class pl-10!"
                                    />
                                </div>
                                {errors.thumbnail && <FieldError className="text-xs text-danger mt-1">{errors.thumbnail}</FieldError>}
                            </TextField>

                            <TextField name="tags" isInvalid={!!errors.tags} className="flex flex-col gap-1 w-full">
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

                    {/* ✅ SECTION 3: Prompt Visibility with RadioGroup (Bulletproof Method) */}
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