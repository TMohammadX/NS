"use client";

import { useState } from "react";
import { Loader2, Copy, Save, Trash, Wand2, FileText } from "lucide-react";
import { generateDesignAction, generateListingAction } from "@/app/actions/ai-actions";
import { ListingResponse } from "@/types/dashboard";

interface ControlPanelProps {
    designPrompt: string;
    setDesignPrompt: (prompt: string) => void;
    onDesignGenerated: (base64: string) => void;
    productTitle: string;
    productDescription: string;
    onListingGenerated: (listing: ListingResponse) => void;
    onSave: () => void;
    onClear: () => void;
    isSaving: boolean;
}

export default function ControlPanel({
    designPrompt,
    setDesignPrompt,
    onDesignGenerated,
    productTitle,
    productDescription,
    onListingGenerated,
    onSave,
    onClear,
    isSaving,
}: ControlPanelProps) {
    const [isGeneratingDesign, setIsGeneratingDesign] = useState(false);
    const [isGeneratingListing, setIsGeneratingListing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateDesign = async () => {
        if (!designPrompt.trim()) return;
        setIsGeneratingDesign(true);
        setError(null);
        try {
            const base64 = await generateDesignAction(designPrompt);
            onDesignGenerated(base64);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate design");
        } finally {
            setIsGeneratingDesign(false);
        }
    };

    const handleGenerateListing = async () => {
        if (!designPrompt.trim()) return;
        setIsGeneratingListing(true);
        setError(null);
        try {
            const listing = await generateListingAction(designPrompt, "T-shirt");
            onListingGenerated(listing);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate listing");
        } finally {
            setIsGeneratingListing(false);
        }
    };

    const copyToClipboard = () => {
        const json = JSON.stringify({ productTitle, productDescription }, null, 2);
        navigator.clipboard.writeText(json);
    };

    return (
        <aside className="w-full md:w-80 bg-gray-900 border-l border-gray-800 flex flex-col h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">Controls</h2>
                <p className="text-xs text-gray-400">Generate & Edit</p>
            </div>

            <div className="p-4 space-y-6">
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Design Generation */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">Design Prompt</label>
                    <textarea
                        value={designPrompt}
                        onChange={(e) => setDesignPrompt(e.target.value)}
                        placeholder="Describe your design (e.g., 'Retro sunset with palm trees and a surfboard')"
                        className="w-full h-24 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                    />
                    <button
                        onClick={handleGenerateDesign}
                        disabled={isGeneratingDesign || !designPrompt.trim()}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGeneratingDesign ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Wand2 className="w-4 h-4" />
                        )}
                        Generate Design
                    </button>
                </div>

                <div className="h-px bg-gray-800" />

                {/* Listing Generation */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-300">Listing Details</label>
                        <button
                            onClick={handleGenerateListing}
                            disabled={isGeneratingListing || !designPrompt.trim()}
                            className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 disabled:opacity-50"
                        >
                            {isGeneratingListing ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileText className="w-3 h-3" />}
                            Generate Copy
                        </button>
                    </div>

                    <div className="space-y-2">
                        <input
                            type="text"
                            value={productTitle}
                            readOnly
                            placeholder="Generated Title"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none"
                        />
                        <textarea
                            value={productDescription}
                            readOnly
                            placeholder="Generated Description"
                            className="w-full h-32 bg-gray-800/50 border border-gray-700 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none resize-none"
                        />
                    </div>

                    {(productTitle || productDescription) && (
                        <button
                            onClick={copyToClipboard}
                            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-2 rounded border border-gray-700 transition-colors"
                        >
                            <Copy className="w-3 h-3" />
                            Copy JSON to Clipboard
                        </button>
                    )}
                </div>

                <div className="h-px bg-gray-800" />

                {/* Persistence Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onClear}
                        className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        <Trash className="w-4 h-4" />
                        Clear
                    </button>
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Save
                    </button>
                </div>
            </div>
        </aside>
    );
}
