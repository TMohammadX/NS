import Link from "next/link";
import { Zap } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold text-white">ZapPOD</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block"
          >
            Log in
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
