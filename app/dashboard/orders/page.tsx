"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Download, Filter } from "lucide-react";

interface Order {
    id: string;
    created_at: string;
    customer_email: string;
    total: number;
    status: string;
}

export default function OrdersPage() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const statusFilter = searchParams.get("status") || "";

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }

            let query = supabase
                .from("orders")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (statusFilter) {
                query = query.eq("status", statusFilter);
            }

            const { data, error } = await query;
            if (error) {
                console.error("Error fetching orders:", error);
            } else {
                setOrders(data || []);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [supabase, router, statusFilter]);

    const handleExportCSV = () => {
        if (orders.length === 0) return;

        const headers = ["Order ID", "Date", "Customer", "Total", "Status"];
        const csvContent = [
            headers.join(","),
            ...orders.map((order) =>
                [
                    order.id,
                    new Date(order.created_at).toLocaleDateString(),
                    order.customer_email,
                    order.total.toFixed(2),
                    order.status,
                ].join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "orders_export.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
            params.set("status", e.target.value);
        } else {
            params.delete("status");
        }
        router.push(`/dashboard/orders?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Orders</h1>
                <button
                    onClick={handleExportCSV}
                    disabled={orders.length === 0}
                    className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${orders.length === 0
                            ? "cursor-not-allowed bg-gray-600 text-gray-400"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-gray-400">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filter by Status:</span>
                </div>
                <select
                    value={statusFilter}
                    onChange={handleFilterChange}
                    className="rounded-md border border-white/10 bg-[#0f172a] px-3 py-1.5 text-sm text-white focus:border-purple-500 focus:outline-none"
                >
                    <option value="">All</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {loading ? (
                <p className="text-gray-400">Loading orders...</p>
            ) : (
                <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-4 font-medium text-gray-400">Order ID</th>
                                <th className="px-6 py-4 font-medium text-gray-400">Date</th>
                                <th className="px-6 py-4 font-medium text-gray-400">Customer</th>
                                <th className="px-6 py-4 font-medium text-gray-400">Total</th>
                                <th className="px-6 py-4 font-medium text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-gray-300">{order.id.slice(0, 8)}...</td>
                                        <td className="px-6 py-4 text-gray-300">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-white">{order.customer_email}</td>
                                        <td className="px-6 py-4 font-medium text-white">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.status === "paid"
                                                        ? "bg-green-500/10 text-green-400"
                                                        : order.status === "pending"
                                                            ? "bg-yellow-500/10 text-yellow-400"
                                                            : order.status === "shipped"
                                                                ? "bg-blue-500/10 text-blue-400"
                                                                : "bg-red-500/10 text-red-400"
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
