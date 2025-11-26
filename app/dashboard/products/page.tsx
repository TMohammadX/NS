import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus, Filter } from "lucide-react";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { status?: string };
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    let query = supabase.from("products").select("*").eq("user_id", user.id);

    if (searchParams.status) {
        query = query.eq("status", searchParams.status);
    }

    const { data: products } = await query;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link href="/dashboard/create">
                    <button className="flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </button>
                </Link>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-gray-400">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filter by Status:</span>
                </div>
                <form className="flex items-center gap-2">
                    <select
                        name="status"
                        defaultValue={searchParams.status || ""}
                        className="rounded-md border border-white/10 bg-[#0f172a] px-3 py-1.5 text-sm text-white focus:border-purple-500 focus:outline-none"
                    >
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                    <button
                        type="submit"
                        className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                    >
                        Apply
                    </button>
                </form>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 font-medium text-gray-400">Image</th>
                            <th className="px-6 py-4 font-medium text-gray-400">Title</th>
                            <th className="px-6 py-4 font-medium text-gray-400">SKU</th>
                            <th className="px-6 py-4 font-medium text-gray-400">Status</th>
                            <th className="px-6 py-4 font-medium text-gray-400">Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.title}
                                                className="h-10 w-10 rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-white/10" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{product.title}</td>
                                    <td className="px-6 py-4 text-gray-400">{product.sku}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === "active"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : product.status === "draft"
                                                        ? "bg-gray-500/10 text-gray-400"
                                                        : "bg-red-500/10 text-red-400"
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white">${product.price}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
