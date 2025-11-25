"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import HistorySidebar from "@/components/dashboard/HistorySidebar";
import MockupStudio from "@/components/dashboard/MockupStudio";
import ControlPanel from "@/components/dashboard/ControlPanel";
import { Design, ListingResponse } from "@/types/dashboard";
import { LogoutButton } from "@/components/logout-button";
import { LogOut } from "lucide-react";
import PaywallModal from "@/components/dashboard/PaywallModal";
import { useMemo } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  // State
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesignId, setSelectedDesignId] = useState<string | undefined>(undefined);

  // Editor State
  const [designPrompt, setDesignPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | undefined>(undefined);
  const [mockupText, setMockupText] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  // Auth Check & Load Data
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);
      loadDesigns(user.id);
      loadProfile(user.id);
    };
    checkUser();
  }, [router, supabase]);

  // Trial Status Calculation
  const trialStatus = useMemo(() => {
    if (!profile) return { isExpired: false, daysRemaining: 0, isSubscribed: false };

    const isSubscribed = profile.subscription_status === 'active';
    const isTrialing = profile.subscription_status === 'trialing';

    if (isSubscribed) {
      return { isExpired: false, daysRemaining: null, isSubscribed: true };
    }

    if (!profile.trial_ends_at || !isTrialing) {
      return { isExpired: true, daysRemaining: 0, isSubscribed: false };
    }

    const now = new Date();
    const trialEnd = new Date(profile.trial_ends_at);
    const isExpired = now > trialEnd;
    const daysRemaining = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    return { isExpired, daysRemaining, isSubscribed: false };
  }, [profile]);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  const loadDesigns = async (userId: string) => {
    const { data, error } = await supabase
      .from("pod_designs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setDesigns(data as Design[]);
    }
  };

  const handleSelectDesign = (design: Design) => {
    setSelectedDesignId(design.id);
    setDesignPrompt(design.design_prompt || "");
    setGeneratedImage(design.generated_image_base64 || undefined);
    setMockupText(design.mockup_text || "");
    setProductTitle(design.product_title || "");
    setProductDescription(design.product_description || "");
  };

  const handleSaveDesign = async () => {
    if (!user) return;
    setIsSaving(true);

    const designData = {
      user_id: user.id,
      design_prompt: designPrompt,
      generated_image_base64: generatedImage,
      mockup_text: mockupText,
      product_title: productTitle,
      product_description: productDescription,
    };

    let error;

    if (selectedDesignId) {
      // Update existing
      const { error: updateError } = await supabase
        .from("pod_designs")
        .update(designData)
        .eq("id", selectedDesignId);
      error = updateError;
    } else {
      // Insert new
      const { error: insertError } = await supabase
        .from("pod_designs")
        .insert([designData]);
      error = insertError;
    }

    if (!error) {
      await loadDesigns(user.id);
      // If it was a new save, we might want to select the newest one, 
      // but for simplicity we just reload the list.
      if (!selectedDesignId) {
        // Ideally fetch the latest and select it, or just clear
      }
    } else {
      console.error("Error saving design:", error);
      alert("Failed to save design");
    }

    setIsSaving(false);
  };

  const handleDeleteDesign = async (id: string) => {
    if (!confirm("Are you sure you want to delete this design?")) return;

    const { error } = await supabase
      .from("pod_designs")
      .delete()
      .eq("id", id);

    if (!error) {
      setDesigns(designs.filter(d => d.id !== id));
      if (selectedDesignId === id) {
        handleClear();
      }
    } else {
      console.error("Error deleting design:", error);
    }
  };

  const handleClear = () => {
    setSelectedDesignId(undefined);
    setDesignPrompt("");
    setGeneratedImage(undefined);
    setMockupText("");
    setProductTitle("");
    setProductDescription("");
  };

  const handleListingGenerated = (listing: ListingResponse) => {
    if (trialStatus.isExpired) {
      alert("Your trial has expired. Please subscribe to continue using AI features.");
      return;
    }
    setProductTitle(listing.productTitle);
    setProductDescription(listing.productDescription);
  };

  const wrapGenerateDesign = (callback: (base64: string) => void) => {
    return (base64: string) => {
      if (trialStatus.isExpired) {
        alert("Your trial has expired. Please subscribe to continue using AI features.");
        return;
      }
      callback(base64);
    };
  };

  if (!user) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      {/* Paywall Modal */}
      {trialStatus.isExpired && profile?.trial_ends_at && (
        <PaywallModal trialEndDate={profile.trial_ends_at} />
      )}

      {/* Top Bar with Logout & Status */}
      <div className="fixed top-0 right-0 left-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center max-w-full mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <h1 className="text-lg font-bold text-white">ZapPOD</h1>
            </div>
            <span className="text-gray-500">|</span>
            <span className="text-sm text-gray-400">Dashboard</span>

            {/* Status Badge */}
            {profile && (
              <div className={`
                ml-2 px-3 py-1 rounded-full text-xs font-medium
                ${trialStatus.isSubscribed
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : trialStatus.isExpired
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}
              `}>
                {trialStatus.isSubscribed
                  ? '✓ PRO Subscriber'
                  : trialStatus.isExpired
                    ? '⚠ Trial Expired'
                    : `⏱ ${trialStatus.daysRemaining} days left`}
              </div>
            )}
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/auth/login");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row pt-[73px] h-screen">
        <HistorySidebar
          designs={designs}
          onSelect={handleSelectDesign}
          onDelete={handleDeleteDesign}
          selectedId={selectedDesignId}
        />

        <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
          <MockupStudio
            generatedImage={generatedImage}
            mockupText={mockupText}
            setMockupText={setMockupText}
          />

          <ControlPanel
            designPrompt={designPrompt}
            setDesignPrompt={setDesignPrompt}
            onDesignGenerated={wrapGenerateDesign(setGeneratedImage)}
            productTitle={productTitle}
            productDescription={productDescription}
            onListingGenerated={handleListingGenerated}
            onSave={handleSaveDesign}
            onClear={handleClear}
            isSaving={isSaving}
          />
        </main>
      </div>
    </div>
  );
}
