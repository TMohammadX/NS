"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, DollarSign, Settings } from "lucide-react";

interface Payout {
    id: string;
    amount: number;
    status: string;
    created_at: string;
}

export default function BillingPage() {
    const supabase = createClient();
    const router = useRouter();

    const [balance, setBalance] = useState(0);
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [loading, setLoading] = useState(true);
    const [requesting, setRequesting] = useState(false);
    const [taxId, setTaxId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }

            // Mock fetching balance
            const { data: orders } = await supabase
                .from("orders")
                .select("total")
                .eq("user_id", user.id)
                .eq("status", "paid")
                .is("payout_id", null);

            const currentBalance = orders?.reduce((acc, curr) => acc + (curr.total || 0), 0) || 0;
            setBalance(currentBalance);

            // Fetch Payout History
            const { data: payoutHistory } = await supabase
                .from("payouts")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            setPayouts(payoutHistory || []);
            setLoading(false);
        };

        fetchData();
    }, [supabase, router]);

    const handleRequestPayout = async () => {
        if (balance < 20) return;
        setRequesting(true);

        // Mock Stripe Connect Payout Request
        console.log("Requesting payout via Stripe Connect...");

        setTimeout(async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Create Payout Record
            const { error } = await supabase.from("payouts").insert({
                user_id: user.id,
                amount: balance,
                status: "processing",
            });

            if (error) {
                alert("Error requesting payout: " + error.message);
            } else {
                alert("Payout requested successfully!");
                setBalance(0);
                // Refresh payouts
                const { data: newPayouts } = await supabase
                    .from("payouts")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });
                setPayouts(newPayouts || []);
            }
            setRequesting(false);
        }, 1500);
    };

    const handleSaveTax = () => {
        alert(`Tax ID ${taxId} saved!`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Billing & Payouts</h1>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Current Balance Card */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-300">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        Current Balance
                    </h3>
                    <p className="my-4 text-4xl font-bold text-white">${balance.toFixed(2)}</p>
                    <button
                        onClick={handleRequestPayout}
                        disabled={balance < 20 || requesting}
                        className={`w-full rounded-md py-2 text-sm font-medium transition-colors ${balance < 20 || requesting
                                ? "cursor-not-allowed bg-gray-600 text-gray-400"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                    >
                        {requesting ? "Processing..." : "Request Payout"}
                    </button>
                    {balance < 20 && <p className="mt-2 text-xs text-gray-500">Minimum payout: $20.00</p>}
                </div>

                {/* Tax Settings Card */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <h3 className="flex items-center gap-2 text-lg font-medium text-gray-300">
                        <Settings className="h-5 w-5 text-gray-400" />
                        Tax Settings
                    </h3>
                    <div className="my-4">
                        <label className="mb-2 block text-sm font-medium text-gray-400">Tax ID / VAT Number</label>
                        <input
                            type="text"
                            value={taxId}
                            onChange={(e) => setTaxId(e.target.value)}
                            placeholder="Enter Tax ID"
                            className="w-full rounded-md border border-white/10 bg-[#0f172a] p-2 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={handleSaveTax}
                        className="w-full rounded-md bg-white/10 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                    >
                        Save Settings
                    </button>
                </div>
            </div>

            {/* Payout History */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
                    <CreditCard className="h-5 w-5 text-purple-500" />
                    Payout History
                </h3>
                {loading ? (
                    <p className="text-gray-400">Loading history...</p>
                ) : (
                    <div className="overflow-hidden rounded-lg border border-white/10">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="px-6 py-4 font-medium text-gray-400">Date</th>
                                    <th className="px-6 py-4 font-medium text-gray-400">Amount</th>
                                    <th className="px-6 py-4 font-medium text-gray-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {payouts.length > 0 ? (
                                    payouts.map((payout) => (
                                        <tr key={payout.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 text-gray-300">{new Date(payout.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 font-medium text-white">${payout.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${payout.status === "paid"
                                                            ? "bg-green-500/10 text-green-400"
                                                            : payout.status === "processing"
                                                                ? "bg-yellow-500/10 text-yellow-400"
                                                                : "bg-red-500/10 text-red-400"
                                                        }`}
                                                >
                                                    {payout.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                            No payouts yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
