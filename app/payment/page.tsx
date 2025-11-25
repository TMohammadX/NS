"use client";

import { useState } from "react";
import { Check, Loader2, Zap } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe-actions";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Replace with your actual Stripe Price IDs
const PLANS = {
    PRO: "price_1SUatCEqqqL58C7CKnfUFRpE", // Replace with real Price ID
    SCALE: "price_1SUatCEqqqL58C7CKnfUFRpE", // Replace with real Price ID
};

export default function PaymentPage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleSubscribe = async (priceId: string, planName: string) => {
        setIsLoading(planName);
        try {
            await createCheckoutSession(priceId);
        } catch (error) {
            console.error("Subscription error:", error);
            alert("Failed to start subscription. Please try again.");
            setIsLoading(null);
        }
    };

    const handleFreePlan = async () => {
        setIsLoading("free");
        // Update profile to 'free' status if not already
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            // In a real app, you might want to verify this server-side or just redirect
            // Since the default is 'free', we can just redirect to dashboard
            // But let's ensure the profile exists via the trigger
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white py-20 px-4">
            <div className="max-w-5xl mx-auto text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-6">
                    <Zap className="w-8 h-8 text-purple-500" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Start with a 7-day free trial on paid plans. Cancel anytime.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Starter Plan */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-2">Starter</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-gray-400">/mo</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">Perfect for hobbyists just getting started.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-gray-500" /> 5 AI Designs/mo
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-gray-500" /> Standard Mockups
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-gray-500" /> Personal Use
                        </li>
                    </ul>
                    <button
                        onClick={handleFreePlan}
                        disabled={!!isLoading}
                        className="w-full py-3 px-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                    >
                        {isLoading === "free" ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Continue with Free"}
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="relative bg-gray-900 border border-purple-500/50 rounded-2xl p-8 flex flex-col shadow-2xl shadow-purple-500/10 scale-105 z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Most Popular
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-2 text-purple-400">Pro</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$29</span>
                            <span className="text-gray-400">/mo</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">For serious sellers scaling their business.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-purple-500" /> Unlimited AI Designs
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-purple-500" /> High-Res Mockups
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-purple-500" /> SEO Copy Generator
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-purple-500" /> Commercial Rights
                        </li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe(PLANS.PRO, "pro")}
                        disabled={!!isLoading}
                        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all font-bold shadow-lg shadow-purple-500/25 disabled:opacity-50"
                    >
                        {isLoading === "pro" ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Start 7-Day Free Trial"}
                    </button>
                </div>

                {/* Scale Plan */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-2">Scale</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$79</span>
                            <span className="text-gray-400">/mo</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">For agencies and power users.</p>
                    </div>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-teal-500" /> Everything in Pro
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-teal-500" /> 3 User Accounts
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-teal-500" /> API Access
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-teal-500" /> Priority Support
                        </li>
                    </ul>
                    <button
                        onClick={() => handleSubscribe(PLANS.SCALE, "scale")}
                        disabled={!!isLoading}
                        className="w-full py-3 px-4 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
                    >
                        {isLoading === "scale" ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Start 7-Day Free Trial"}
                    </button>
                </div>
            </div>
        </div>
    );
}
