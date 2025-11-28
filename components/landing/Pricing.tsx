import { Check, X, Sparkles } from "lucide-react";
import Link from "next/link";

const tiers = [
    {
        name: "Starter",
        price: "0",
        description: "Perfect for trying out ZapPOD.",
        features: [
            "5 AI Design Generations/mo",
            "Standard Quality Mockups",
            "Basic SEO Listing Copy",
            "Personal Use License",
            "Community Support",
        ],
        notIncluded: [
            "High-Res Exports",
        ],
        cta: "Start for Free",
        popular: false,
        gradient: "from-gray-700 to-gray-600",
        border: "border-gray-800",
        bg: "bg-gray-900/40",
    },
    {
        name: "Pro",
        price: "29",
        description: "Everything you need to scale.",
        features: [
            "Unlimited AI Design Generations",
            "Unlimited High-Res Mockups",
            "SEO-Optimized Listing Copy",
            "Commercial Usage Rights",
            "Priority Email Support",
            "Cancel Anytime",
        ],
        notIncluded: [],
        cta: "Start Free Trial",
        popular: true,
        gradient: "from-purple-600 to-teal-600",
        border: "border-purple-500/50",
        bg: "bg-gray-800/60",
    },
    {
        name: "Scale",
        price: "79",
        description: "For power sellers and teams.",
        features: [
            "Everything in Pro",
            "Multiple User Accounts (up to 3)",
            "API Access",
            "Bulk Generation Tools",
            "Dedicated Account Manager",
            "Early Access to New Features",
        ],
        notIncluded: [],
        cta: "Contact Sales",
        popular: false,
        gradient: "from-blue-600 to-indigo-600",
        border: "border-gray-800",
        bg: "bg-gray-900/40",
    },
];

export default function Pricing() {
    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-900/20 rounded-full blur-[128px]"></div>
            </div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Choose the plan that fits your growth stage. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative rounded-3xl border ${tier.border} ${tier.bg} p-8 backdrop-blur-sm flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${tier.popular ? 'md:-mt-4 md:mb-4 shadow-xl shadow-purple-900/20 z-10' : 'z-0'}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 p-[1px] shadow-lg">
                                    <div className="rounded-full bg-gray-900 px-4 py-1.5">
                                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3 text-purple-400" />
                                            Most Popular
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline mb-4">
                                    <span className="text-5xl font-bold text-white tracking-tight">${tier.price}</span>
                                    <span className="text-gray-400 ml-2">/month</span>
                                </div>
                                <p className="text-sm text-gray-400">{tier.description}</p>
                            </div>

                            <div className="flex-1 mb-8">
                                <ul className="space-y-4">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center mr-3 mt-0.5">
                                                <Check className="h-3.5 w-3.5 text-teal-400" />
                                            </div>
                                            <span className="text-sm text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                    {tier.notIncluded.map((feature) => (
                                        <li key={feature} className="flex items-start opacity-40">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700/50 flex items-center justify-center mr-3 mt-0.5">
                                                <X className="h-3.5 w-3.5 text-gray-500" />
                                            </div>
                                            <span className="text-sm text-gray-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="#"
                                className={`block w-full rounded-xl bg-gradient-to-r ${tier.gradient} px-6 py-4 text-center text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

