import Link from "next/link";
import { Zap, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] border-t border-gray-800">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <Zap className="h-6 w-6 text-purple-500" />
                            <span className="text-xl font-bold text-white">ZapPOD</span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-4">
                            The fastest way to launch print-on-demand products. From idea to listing in seconds.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Showcase</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API Status</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} ZapPOD Inc. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-400">All Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
