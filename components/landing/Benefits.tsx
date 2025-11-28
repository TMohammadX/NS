import { Zap, TrendingUp, Search, Palette, ArrowRight, BarChart3, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

const benefits = [
    {
        title: "Lightning Fast Creation",
        description: "Cut listing creation time by 80%. Launch more products in less time with our streamlined workflow.",
        icon: Zap,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
    },
    {
        title: "AI-Powered Quality",
        description: "Generate highly marketable, unique designs that stand out in crowded marketplaces.",
        icon: Palette,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        colSpan: "col-span-1",
    },
    {
        title: "SEO Optimization",
        description: "AI-generated titles and descriptions optimized for Etsy and Shopify search algorithms.",
        icon: Search,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        colSpan: "col-span-1",
    },
    {
        title: "Zero Experience Needed",
        description: "No design skills? No problem. Perfect for beginners and pros alike.",
        icon: TrendingUp,
        color: "text-teal-400",
        bg: "bg-teal-500/10",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
    },
];

export default function Benefits() {
    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[100px]"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-900/10 blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                        Stop Juggling Tools. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Start Scaling Your Empire.</span>
                    </h2>
                    <p className="text-lg text-gray-400">
                        ZapPOD replaces your complex stack of design software, mockup generators, and keyword tools with one powerful dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {/* Main Feature Card (Large) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl border border-gray-800 bg-gray-800/40 p-8 backdrop-blur-sm relative overflow-hidden group hover:border-gray-700 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BarChart3 className="w-64 h-64 text-white" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="mb-8">
                                <div className="inline-flex items-center rounded-lg bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-400 mb-6 border border-teal-500/20">
                                    <Clock className="mr-2 h-4 w-4" />
                                    9x Faster Production
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Reclaim Your Time</h3>
                                <p className="text-gray-400 text-lg max-w-md">
                                    Traditional workflows take 45 minutes per listing. ZapPOD takes 5.
                                    Imagine what you could do with that extra time.
                                </p>
                            </div>

                            {/* Comparison Chart */}
                            <div className="space-y-6 bg-gray-900/50 p-6 rounded-2xl border border-gray-700/50">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Traditional Workflow</span>
                                        <span className="text-gray-400">45 mins</span>
                                    </div>
                                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-gray-600 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white font-medium">ZapPOD Workflow</span>
                                        <span className="text-teal-400 font-bold">5 mins</span>
                                    </div>
                                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full w-[11%] bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)] animate-shine"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Smaller Feature Cards */}
                    {benefits.map((benefit, index) => (
                        <div
                            key={benefit.title}
                            className={`rounded-3xl border border-gray-800 bg-gray-800/40 p-8 backdrop-blur-sm hover:bg-gray-800/60 transition-all hover:-translate-y-1 hover:shadow-xl group ${benefit.colSpan}`}
                        >
                            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bg} ${benefit.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <benefit.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <Link href="#" className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium transition-colors group">
                        Explore all features
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

