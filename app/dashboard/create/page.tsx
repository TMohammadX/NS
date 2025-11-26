"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, Image as ImageIcon, DollarSign } from "lucide-react";

export default function CreateProductPage() {
    const supabase = createClient();
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
    const [productType, setProductType] = useState("t-shirt");
    const [margin, setMargin] = useState(20);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setIsUploading(true);

            // Upload to Supabase Storage
            const fileName = `${Date.now()}-${selectedFile.name}`;
            const { data, error } = await supabase.storage
                .from("artwork")
                .upload(fileName, selectedFile);

            if (error) {
                alert("Upload failed: " + error.message);
                setIsUploading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from("artwork")
                .getPublicUrl(fileName);

            setArtworkUrl(publicUrl);
            setIsUploading(false);
            generateMockup(publicUrl, productType);
        }
    };

    const generateMockup = async (url: string, type: string) => {
        // Mock Printful API Call
        console.log(`Generating mockup for ${type} with ${url}`);

        setTimeout(() => {
            setPreviewUrl(`https://placehold.co/400x400?text=${type}+Mockup`);
        }, 1000);
    };

    const handleProductTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setProductType(newType);
        if (artworkUrl) {
            generateMockup(artworkUrl, newType);
        }
    };

    const handlePublish = async () => {
        if (!artworkUrl) return;
        setIsPublishing(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("Please login first");
            router.push("/login");
            return;
        }

        const basePrice = productType === "t-shirt" ? 10 : 5;
        const finalPrice = basePrice * (1 + margin / 100);

        const { error } = await supabase.from("products").insert({
            user_id: user.id,
            title: `Custom ${productType}`,
            sku: `ZAP-${Date.now()}`,
            status: "active",
            price: parseFloat(finalPrice.toFixed(2)),
            image_url: previewUrl || artworkUrl,
            artwork_url: artworkUrl,
            margin_percent: margin,
        });

        if (error) {
            alert("Error publishing: " + error.message);
        } else {
            router.push("/dashboard/products");
        }
        setIsPublishing(false);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-3xl font-bold">Create Product</h1>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
                    <Upload className="h-5 w-5 text-purple-500" />
                    1. Upload Artwork
                </h3>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-white/5 p-8 transition-colors hover:border-purple-500/50 hover:bg-white/10">
                    <label className="flex cursor-pointer flex-col items-center gap-2">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">
                            {file ? file.name : "Click to upload PNG or SVG"}
                        </span>
                        <input
                            type="file"
                            accept="image/png, image/svg+xml"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
                {isUploading && <p className="mt-2 text-sm text-purple-400">Uploading...</p>}
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-lg font-medium">2. Choose Product</h3>
                <select
                    value={productType}
                    onChange={handleProductTypeChange}
                    className="w-full rounded-md border border-white/10 bg-[#0f172a] p-3 text-white focus:border-purple-500 focus:outline-none"
                >
                    <option value="t-shirt">T-Shirt (Base: $10)</option>
                    <option value="mug">Mug (Base: $5)</option>
                    <option value="hoodie">Hoodie (Base: $20)</option>
                </select>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    3. Set Margin
                </h3>
                <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={margin}
                        onChange={(e) => setMargin(parseInt(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-purple-500"
                    />
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Margin: {margin}%</span>
                        <span className="font-medium text-green-400">
                            Estimated Retail Price: ${((productType === "t-shirt" ? 10 : productType === "mug" ? 5 : 20) * (1 + margin / 100)).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-lg font-medium">Preview</h3>
                <div className="flex items-center justify-center rounded-lg bg-black/20 p-4">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Mockup Preview" className="max-h-[300px] max-w-full rounded-md object-contain" />
                    ) : (
                        <div className="flex h-[200px] w-full items-center justify-center text-gray-500">
                            No preview available
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handlePublish}
                disabled={!artworkUrl || isPublishing}
                className={`w-full rounded-md py-4 text-lg font-bold transition-colors ${!artworkUrl || isPublishing
                        ? "cursor-not-allowed bg-gray-600 text-gray-400"
                        : "cursor-pointer bg-purple-600 text-white hover:bg-purple-700"
                    }`}
            >
                {isPublishing ? "Publishing..." : "Publish Product"}
            </button>
        </div>
    );
}
