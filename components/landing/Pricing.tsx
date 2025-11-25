import { Check, X } from "lucide-react";
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
            "Commercial License",
            "Priority Support",
        ],
        cta: "Start for Free",
        popular: false,
        gradient: "from-gray-700 to-gray-600",
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
    },
];

export default function Pricing() {
    return (
        <section className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Choose the plan that fits your growth stage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative rounded-2xl border ${tier.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/10' : 'border-gray-800'} bg-gray-800/50 p-8 backdrop-blur-sm flex flex-col`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 px-4 py-1 text-sm font-bold text-white shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                                    <span className="text-gray-400 ml-2">/month</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{feature}</span>
                                    </li>
                                ))}
                                {tier.notIncluded.map((feature) => (
                                    <li key={feature} className="flex items-start opacity-50">
                                        <X className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                                        <span className="text-sm text-gray-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="#"
                                className={`block w-full rounded-lg bg-gradient-to-r ${tier.gradient} px-6 py-3 text-center text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900`}
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
