import Link from "next/link";
import { Zap, Twitter, Instagram, Github, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] border-t border-gray-800 relative">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

            <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6 group">
                            <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                <Zap className="h-6 w-6 text-purple-500" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">ZapPOD</span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            The fastest way to launch print-on-demand products.
                            From idea to listing in seconds, powered by advanced AI.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:-translate-y-1">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:-translate-y-1">
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:-translate-y-1">
                                <Github className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Product</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Features</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Showcase</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">API Status</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Legal</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 flex items-center">
                        &copy; {new Date().getFullYear()} ZapPOD Inc. Made with <Heart className="h-3 w-3 text-red-500 mx-1 fill-current" /> in San Francisco.
                    </p>
                    <div className="flex items-center space-x-2">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-sm text-gray-400 font-medium">All Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

