"use client";

import React, { useState } from 'react';
import { Form, Fieldset, TextField, Label, Input, TextArea, Button, Select, ListBox } from "@heroui/react"; 
import { Sparkles } from 'lucide-react';
import { updatePrompt } from '@/lib/actions/prompt';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function EditPromptForm({ prompt, id }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setIsSubmitting(true);
        try {
            await updatePrompt(id, data);
            toast.success("Prompt updated successfully!");
            router.push("/dashboard/user/my-prompts");
        } catch (error) {
            toast.error("Failed to update.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-[#0B1120] border border-zinc-900 rounded-xl p-8 shadow-2xl">
            <div className="border-b border-zinc-800 pb-6 mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
                        <Sparkles className="text-[#8B5CF6]" /> Edit Prompt
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">Update your AI prompt details.</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
                    Status: <span className="text-[#8B5CF6] font-medium">{prompt?.status || 'Pending'}</span>
                </div>
            </div>

            <Form onSubmit={handleSubmit} className="space-y-8">
                <Fieldset className="space-y-6">
                    <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2">Basic Information</legend>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField name="promptTitle" defaultValue={prompt?.promptTitle} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Prompt Title</Label>
                            <Input className="text-input-class" />
                        </TextField>

                        <Select name="category" defaultSelectedKey={prompt?.category} className="select-box-class">
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Category</Label>
                            <Select.Trigger className="trigger-classes"><Select.Value /><Select.Indicator /></Select.Trigger>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select name="aiTool" defaultSelectedKey={prompt?.aiTool} className="select-box-class">
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">AI Tool</Label>
                            <Select.Trigger className="trigger-classes"><Select.Value /><Select.Indicator /></Select.Trigger>
                            <Select.Popover className="popover-classes">
                                <ListBox className="outline-none">
                                    <ListBox.Item id="ChatGPT" className="list-item-classes" textValue="ChatGPT">ChatGPT</ListBox.Item>
                                    <ListBox.Item id="Gemini" className="list-item-classes" textValue="Gemini">Gemini</ListBox.Item>
                                    <ListBox.Item id="Claude" className="list-item-classes" textValue="Claude">Claude</ListBox.Item>
                                    <ListBox.Item id="Midjourney" className="list-item-classes" textValue="Midjourney">Midjourney</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Select name="difficulty" defaultSelectedKey={prompt?.difficulty} className="select-box-class">
                            <Label className="text-zinc-400 font-medium text-sm mb-1 block">Difficulty Level</Label>
                            <Select.Trigger className="trigger-classes"><Select.Value /><Select.Indicator /></Select.Trigger>
                            <Select.Popover className="popover-classes">
                                <ListBox className="outline-none">
                                    <ListBox.Item id="Beginner" className="list-item-classes" textValue="Beginner">Beginner</ListBox.Item>
                                    <ListBox.Item id="Intermediate" className="list-item-classes" textValue="Intermediate">Intermediate</ListBox.Item>
                                    <ListBox.Item id="Pro" className="list-item-classes" textValue="Pro">Pro</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </Fieldset>

                <Fieldset className="space-y-6">
                    <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2">Prompt Content & Instructions</legend>
                    
                    <TextField name="promptDescription" defaultValue={prompt?.promptDescription} className="flex flex-col gap-1">
                        <Label className="text-zinc-400 text-sm">Prompt Description</Label>
                        <TextArea className="text-area-class" rows={3} />
                    </TextField>

                    <TextField name="promptContent" defaultValue={prompt?.promptContent} className="flex flex-col gap-1">
                        <Label className="text-zinc-400 text-sm">Exact Prompt Content</Label>
                        <TextArea className="text-area-class" rows={5} />
                    </TextField>
                </Fieldset>

                <div className="flex justify-end pt-4 border-t border-zinc-800">
                    <Button type="submit" disabled={isSubmitting} className="bg-[#8B5CF6] text-white px-8 h-11">
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}