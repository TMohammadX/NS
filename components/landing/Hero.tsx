import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300 mb-8 backdrop-blur-sm">
                        <Zap className="mr-2 h-4 w-4 text-yellow-400" />
                        <span className="animate-pulse">The Future of POD is Here</span>
                    </div>

                    <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
                        The most efficient way to launch <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">Print-On-Demand</span> products.
                    </h1>

                    <p className="max-w-2xl text-xl text-gray-300 mb-10">
                        Go from design concept to SEO-ready listing in one seamless dashboard. Stop juggling tools and start scaling your business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Link
                            href="#"
                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Start Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="inline-flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800/50 px-8 py-4 text-lg font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            See How It Works
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400 mb-16">
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            One-Click AI Design
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Instant Mockups
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            SEO-Optimized Copy
                        </div>
                    </div>

                    <div className="relative w-full max-w-5xl mx-auto rounded-xl border border-gray-700/50 bg-gray-800/30 p-2 shadow-2xl backdrop-blur-sm lg:p-4">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-teal-600 opacity-20 blur-lg transition duration-1000 group-hover:opacity-100"></div>
                        <div className="relative overflow-hidden rounded-lg bg-gray-900 shadow-inner">
                            <Image
                                src="/app-mockup.png"
                                alt="ZapPOD Interface"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-900/20 blur-[120px]"></div>
            </div>
        </section>
    );
}
