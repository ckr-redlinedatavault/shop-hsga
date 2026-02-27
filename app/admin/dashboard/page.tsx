import React from 'react';
import {
    TrendingUp,
    Users,
    CreditCard,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    ShoppingBag,
    School
} from 'lucide-react';
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
    // Fetch real metrics
    let bulkOrderCount = 0;
    let customerCount = 0;
    let recentBulkOrders: any[] = [];

    try {
        [bulkOrderCount, customerCount, recentBulkOrders] = await Promise.all([
            prisma.bulkOrder.count(),
            prisma.user.count(),
            prisma.bulkOrder.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' }
            })
        ]);
    } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
    }

    const stats = [
        { label: 'Total Revenue', value: '₹0', icon: CreditCard, trend: '0%', isUp: true },
        { label: 'Bulk Orders', value: bulkOrderCount.toString(), icon: School, trend: 'Live', isUp: true },
        { label: 'Total Customers', value: customerCount.toString(), icon: Users, trend: 'Live', isUp: true },
        { label: 'Inventory Items', value: '0', icon: Package, trend: '0', isUp: false },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Header */}
            <div>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">System Overview</h2>
                <p className="text-zinc-500 mt-1">Monitor your store performance and manage operations.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center">
                                <stat.icon className="text-zinc-900" size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest leading-none">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-zinc-900 mt-2">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts/Table Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bulk Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
                    <div className="p-8 flex items-center justify-between border-b border-zinc-50">
                        <h3 className="text-xl font-bold text-zinc-900">Recent Bulk Inquiries</h3>
                        <button className="text-sm font-semibold text-zinc-400 hover:text-zinc-900 transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-zinc-50/50">
                                    <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Tracking ID</th>
                                    <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Institution</th>
                                    <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Quantity</th>
                                    <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {recentBulkOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-12 text-center text-zinc-400 text-sm italic">
                                            No recent bulk orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    recentBulkOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-zinc-50/30 transition-colors">
                                            <td className="px-8 py-6 text-sm font-mono font-bold text-zinc-900">{order.trackingId}</td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-bold text-zinc-900">{order.institutionName}</p>
                                                <p className="text-xs text-zinc-400 font-medium truncate max-w-[150px]">{order.category}</p>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-bold text-zinc-900">{order.quantity}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'PENDING' ? 'bg-amber-50 text-amber-600' :
                                                        order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600' :
                                                            order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' :
                                                                'bg-rose-50 text-rose-600'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Activity/Updates */}
                <div className="space-y-8">
                    <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-zinc-200 relative overflow-hidden group border border-zinc-800">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold">System Status</h3>
                            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">All core services are operational. Institutional portal is receiving requests.</p>
                            <div className="mt-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">Connected</span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <TrendingUp size={80} strokeWidth={1} />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                        <h3 className="text-lg font-bold text-zinc-900">Upcoming Events</h3>
                        <div className="mt-6 space-y-6">
                            <p className="text-sm font-medium text-zinc-400 italic">No upcoming events scheduled.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
