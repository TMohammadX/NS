import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse-glow"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-600/20 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>
                </div>
            </div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all hover:bg-purple-500/20 hover:scale-105 cursor-default">
                        <Sparkles className="mr-2 h-4 w-4 text-yellow-400 animate-pulse" />
                        <span>The Future of Print-On-Demand</span>
                    </div>

                    {/* Headline */}
                    <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8 leading-tight">
                        Create & Sell <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 animate-gradient-x">
                            Custom Products with AI
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="max-w-2xl text-xl text-gray-300 mb-12 leading-relaxed">
                        Turn your ideas into profitable merchandise in seconds.
                        The world's first AI-powered Print-on-Demand platform.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 mb-20">
                        <Link
                            href="#"
                            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden"
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                            Start Creating
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-800/40 px-8 py-4 text-lg font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-800/60 hover:text-white hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            View Demo
                        </Link>
                    </div>

                    {/* Features Grid (Mini) */}
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-medium text-gray-400 mb-20">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                            No Design Skills Needed
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                            Automated Fulfillment
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.5)]"></div>
                            Global Shipping
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative w-full max-w-6xl mx-auto perspective-1000">
                        <div className="relative rounded-2xl border border-gray-700/50 bg-gray-900/50 p-2 shadow-2xl backdrop-blur-sm lg:p-4 animate-float">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 via-teal-500 to-indigo-600 opacity-30 blur-xl transition duration-1000 group-hover:opacity-50"></div>
                            <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-inner">
                                <Image
                                    src="/zappod_dashboard_hero_v2.png"
                                    alt="ZapPOD Dashboard Interface"
                                    width={1400}
                                    height={900}
                                    className="w-full h-auto max-h-[500px] object-contain"
                                    priority
                                />
                                {/* Overlay Gradient for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

