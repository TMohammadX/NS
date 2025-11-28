"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent border-transparent"}`}>

      {/* Gradient Line (Only visible when not scrolled for subtle effect, or we can hide it. Let's hide it when scrolled to keep it clean) */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-0 hover:opacity-100"}`}></div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 h-20 flex items-center relative z-10">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors border border-purple-500/20">
              <Zap className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-purple-100 transition-colors">ZapPOD</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 ml-12">
          {["Features", "How it Works", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')} `}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-teal-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block hover:underline underline-offset-4 decoration-purple-500/50"
          >
            Log in
          </Link>
          <Link
            href="/auth/sign-up"
            className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden group"
          >
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
        </div>
      </div>
    </header>
  );
}
