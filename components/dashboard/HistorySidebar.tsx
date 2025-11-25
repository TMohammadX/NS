"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Design } from "@/types/dashboard";

interface HistorySidebarProps {
    designs: Design[];
    onSelect: (design: Design) => void;
    onDelete: (id: string) => void;
    selectedId?: string;
}

export default function HistorySidebar({ designs, onSelect, onDelete, selectedId }: HistorySidebarProps) {
    return (
        <aside className="w-full md:w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">History</h2>
                <p className="text-xs text-gray-400">Your saved designs</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {designs.length === 0 ? (
                    <div className="text-center text-gray-500 py-8 text-sm">
                        No designs yet. Start creating!
                    </div>
                ) : (
                    designs.map((design) => (
                        <div
                            key={design.id}
                            className={`group relative flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedId === design.id ? "bg-purple-900/30 border border-purple-500/50" : "hover:bg-gray-800 border border-transparent"
                                }`}
                            onClick={() => onSelect(design)}
                        >
                            <div className="relative w-12 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                                {design.generated_image_base64 ? (
                                    <Image
                                        src={design.generated_image_base64}
                                        alt="Thumbnail"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Img</div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-200 truncate">
                                    {design.product_title || "Untitled Design"}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">
                                    {new Date(design.created_at).toLocaleDateString()}
                                </p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(design.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-all"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </aside>
    );
}
