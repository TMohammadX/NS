"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Package, PlusCircle, ShoppingCart, CreditCard } from "lucide-react";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Create Product", href: "/dashboard/create", icon: PlusCircle },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-white/10 bg-[#0f172a] text-white">
            <div className="flex h-16 items-center px-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-purple-500" />
                    <span className="text-xl font-bold">ZapPOD</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-purple-500/10 text-purple-400"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-white/10 p-4">
                <p className="text-xs text-gray-500">© 2024 ZapPOD Inc.</p>
            </div>
        </div>
    );
}
