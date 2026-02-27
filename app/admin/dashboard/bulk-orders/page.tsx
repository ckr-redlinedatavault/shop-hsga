import prisma from "@/lib/prisma";
import React from "react";
import { ShoppingBag } from "lucide-react";
import BulkOrderTable from "./BulkOrderTable";

export default async function AdminBulkOrdersPage() {
    let orders: any[] = [];
    try {
        orders = await prisma.bulkOrder.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        console.error("Failed to fetch bulk orders", e);
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Institutional Orders</h2>
                    <p className="text-zinc-500 mt-1">Manage bulk procurement requests and track their fulfillment status.</p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-white border border-zinc-100 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Total Requests</p>
                        <p className="text-xl font-bold text-zinc-900">{orders.length}</p>
                    </div>
                    <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-sm">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Completed</p>
                        <p className="text-xl font-bold text-emerald-700">{orders.filter(o => o.status === 'COMPLETED').length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-zinc-50">
                    <h3 className="text-xl font-bold text-zinc-900">Incoming Requests</h3>
                </div>
                <BulkOrderTable initialOrders={orders} />
            </div>
        </div>
    );
}
