"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MockupStudioProps {
    generatedImage?: string;
    mockupText: string;
    setMockupText: (text: string) => void;
}

export default function MockupStudio({ generatedImage, mockupText, setMockupText }: MockupStudioProps) {
    const [shirtColor, setShirtColor] = useState("white");

    const shirtColors = [
        { name: "White", value: "white", class: "bg-white" },
        { name: "Black", value: "black", class: "bg-gray-900" },
        { name: "Heather Grey", value: "grey", class: "bg-gray-400" },
        { name: "Navy", value: "navy", class: "bg-blue-900" },
    ];

    return (
        <div className="flex-1 bg-gray-950 p-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Shirt Color Controls */}
            <div className="absolute top-4 left-4 z-10 bg-gray-900/80 backdrop-blur p-2 rounded-lg border border-gray-800">
                <label className="text-xs text-gray-400 block mb-2">Shirt Color</label>
                <div className="flex gap-2">
                    {shirtColors.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => setShirtColor(color.value)}
                            className={`w-6 h-6 rounded-full border-2 ${color.class} ${shirtColor === color.value ? "border-purple-500 scale-110" : "border-gray-600"
                                }`}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            {/* Text Overlay Control */}
            <div className="absolute top-4 right-4 z-10 bg-gray-900/80 backdrop-blur p-2 rounded-lg border border-gray-800 w-64">
                <label className="text-xs text-gray-400 block mb-2">Overlay Text</label>
                <input
                    type="text"
                    value={mockupText}
                    onChange={(e) => setMockupText(e.target.value)}
                    placeholder="Enter text..."
                    className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                />
            </div>

            {/* T-Shirt Canvas */}
            <div className="relative w-[400px] h-[500px] flex items-center justify-center">
                {/* Simple CSS T-Shirt Shape */}
                <div
                    className={`relative w-full h-full mask-tshirt transition-colors duration-300 ${shirtColor === "white" ? "bg-white" :
                            shirtColor === "black" ? "bg-gray-900" :
                                shirtColor === "grey" ? "bg-gray-400" : "bg-blue-900"
                        }`}
                    style={{
                        maskImage: "url('/tshirt-mask.png')", // Ideally we'd use an SVG or image mask
                        WebkitMaskImage: "url('/tshirt-mask.png')",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                    }}
                >
                    {/* Fallback visual if mask image is missing */}
                    <div className={`w-full h-full rounded-3xl shadow-2xl ${shirtColor === "white" ? "bg-white" :
                            shirtColor === "black" ? "bg-gray-900" :
                                shirtColor === "grey" ? "bg-gray-400" : "bg-blue-900"
                        } flex items-center justify-center overflow-hidden relative`}>

                        {/* Design Area */}
                        <div className="absolute top-[20%] w-[50%] aspect-square flex items-center justify-center">
                            {generatedImage ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={generatedImage}
                                        alt="Generated Design"
                                        fill
                                        className="object-contain mix-blend-multiply"
                                    />
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300/30 w-full h-full rounded flex items-center justify-center text-gray-500/50 text-sm">
                                    Design Area
                                </div>
                            )}
                        </div>

                        {/* Text Overlay */}
                        {mockupText && (
                            <div className="absolute top-[55%] w-full text-center px-8">
                                <span
                                    className={`text-2xl font-bold uppercase tracking-wider ${shirtColor === "white" || shirtColor === "grey" ? "text-gray-900" : "text-white"
                                        }`}
                                    style={{ fontFamily: 'Impact, sans-serif' }}
                                >
                                    {mockupText}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
