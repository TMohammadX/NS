import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, Plus } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch Orders for Revenue Calculation
  const { data: orders } = await supabase
    .from("orders")
    .select("total, created_at, status")
    .eq("user_id", user.id);

  // Calculate Revenue
  const today = new Date().toISOString().split("T")[0];
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  const revenueToday = orders
    ?.filter((o) => o.created_at.startsWith(today) && o.status === "paid")
    .reduce((acc, curr) => acc + (curr.total || 0), 0) || 0;

  const revenueMTD = orders
    ?.filter((o) => o.created_at >= startOfMonth && o.status === "paid")
    .reduce((acc, curr) => acc + (curr.total || 0), 0) || 0;

  // Fetch Top 3 SKUs
  const { data: orderItems } = await supabase
    .from("order_items")
    .select("sku, product_name, quantity")
    .eq("user_id", user.id);

  const skuCounts: Record<string, number> = {};
  orderItems?.forEach((item) => {
    skuCounts[item.sku] = (skuCounts[item.sku] || 0) + item.quantity;
  });

  const topSkus = Object.entries(skuCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([sku]) => sku);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/create">
          <button className="flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" />
            Create Product
          </button>
        </Link>
      </div>

      {/* Alert Banner */}
      <div className="flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-yellow-200">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <p>
          <span className="font-semibold">Alert:</span> Welcome to ZapPOD! Complete your billing setup to receive payouts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm font-medium text-gray-400">Revenue Today</h3>
          <p className="mt-2 text-3xl font-bold">${revenueToday.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h3 className="text-sm font-medium text-gray-400">Revenue MTD</h3>
          <p className="mt-2 text-3xl font-bold">${revenueMTD.toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-lg font-medium">Top 3 SKUs</h3>
        {topSkus.length > 0 ? (
          <ul className="space-y-3">
            {topSkus.map((sku, index) => (
              <li key={sku} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-300">
                  {index + 1}. {sku}
                </span>
                <span className="text-sm text-gray-500">{skuCounts[sku]} sold</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No sales yet.</p>
        )}
      </div>
    </div>
  );
}
