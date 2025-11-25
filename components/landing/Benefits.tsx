import { Zap, TrendingUp, Search, Palette } from "lucide-react";

const benefits = [
    {
        title: "Speed",
        description: "Cut listing creation time by 80%. Launch more products in less time.",
        icon: Zap,
    },
    {
        title: "Quality",
        description: "Generate highly marketable, unique designs that stand out in crowded marketplaces.",
        icon: Palette,
    },
    {
        title: "SEO Boost",
        description: "AI-generated titles and descriptions optimized for Etsy and Shopify search algorithms.",
        icon: Search,
    },
    {
        title: "Simplicity",
        description: "Zero design skills required. Perfect for beginners and pros alike.",
        icon: TrendingUp,
    },
];

export default function Benefits() {
    return (
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                            Stop Juggling Tools. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Start Scaling.</span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-8">
                            ZapPOD replaces your complex stack of design software, mockup generators, and keyword tools with one powerful dashboard.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {benefits.map((benefit) => (
                                <div key={benefit.title} className="flex flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-teal-400 ring-1 ring-white/10">
                                                <benefit.icon className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 pl-13">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 opacity-20 blur-lg"></div>
                        <div className="relative rounded-xl bg-gray-800/80 border border-gray-700 p-8 backdrop-blur-sm">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-gray-500">Traditional Workflow vs. ZapPOD</div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-400">Traditional Workflow</span>
                                            <span className="text-gray-400">45 mins/listing</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-gray-600 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white font-medium">ZapPOD Workflow</span>
                                            <span className="text-teal-400 font-medium">5 mins/listing</span>
                                        </div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full w-[15%] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 text-center">
                                    <div className="inline-block rounded-lg bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-400 border border-teal-500/20">
                                        9x Faster Production Speed
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
