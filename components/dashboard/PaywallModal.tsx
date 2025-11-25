"use client";

import { Lock, CreditCard } from "lucide-react";
import Link from "next/link";

interface PaywallModalProps {
    trialEndDate: string;
}

export default function PaywallModal({ trialEndDate }: PaywallModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md mx-4 bg-gray-900 border-2 border-red-500/50 rounded-2xl shadow-2xl p-8">
                {/* Lock Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Your Free Trial Has Expired
                    </h2>
                    <p className="text-gray-400 mb-2">
                        Your 7-day trial ended on{" "}
                        <span className="text-white font-medium">
                            {new Date(trialEndDate).toLocaleDateString()}
                        </span>
                    </p>
                    <p className="text-gray-400">
                        Subscribe to continue creating unlimited AI-powered POD designs.
                    </p>
                </div>

                {/* Pricing */}
                <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-white">$29</span>
                        <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-center text-sm text-gray-400">
                        Pro Plan - Unlimited Designs
                    </p>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-500 text-xs">✓</span>
                        </div>
                        Unlimited AI Design Generation
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-500 text-xs">✓</span>
                        </div>
                        SEO-Optimized Listing Copy
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-500 text-xs">✓</span>
                        </div>
                        High-Resolution Exports
                    </li>
                </ul>

                {/* CTA Button */}
                <Link
                    href="/payment"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-purple-500/25"
                >
                    <CreditCard className="w-5 h-5" />
                    Subscribe Now
                </Link>

                <p className="text-center text-xs text-gray-500 mt-4">
                    Cancel anytime. No questions asked.
                </p>
            </div>
        </div>
    );
}
