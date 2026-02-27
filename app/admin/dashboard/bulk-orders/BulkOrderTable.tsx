'use client';

import React, { useState } from "react";
import {
    Building2,
    ShoppingBag,
    Clock,
    FileText,
    CheckCircle2,
    XCircle,
    ExternalLink,
    MoreVertical,
    Loader2,
    Eye
} from "lucide-react";
import { updateBulkOrderStatus } from "./actions";

const BulkOrderTable = ({ initialOrders }: { initialOrders: any[] }) => {
    const [orders, setOrders] = useState(initialOrders);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        const res = await updateBulkOrderStatus(id, newStatus);
        if (res.success) {
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        }
        setUpdatingId(null);
    };

    const viewFile = (order: any) => {
        alert(`In a production environment, this would open: ${order.fileUrl || 'uploaded_list.pdf'}\n\nNote: Real file storage (S3/Cloudinary) needs to be configured to host actual PDFs.`);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-zinc-50/50">
                        <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Tracking ID</th>
                        <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Institution</th>
                        <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Quantity</th>
                        <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Files</th>
                        <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-8 py-24 text-center">
                                <div className="max-w-xs mx-auto space-y-3 opacity-20">
                                    <ShoppingBag size={48} className="mx-auto" strokeWidth={1} />
                                    <p className="text-sm font-medium">No institutional orders yet</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-zinc-50/30 transition-colors group">
                                <td className="px-8 py-6 text-sm font-mono font-bold text-zinc-900">{order.trackingId}</td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-bold text-zinc-900">{order.institutionName}</p>
                                    <p className="text-xs text-zinc-400 font-medium">{order.category.replace('-', ' ')}</p>
                                </td>
                                <td className="px-8 py-6 text-sm font-bold text-zinc-900">{order.quantity}</td>
                                <td className="px-8 py-6">
                                    <button
                                        onClick={() => viewFile(order)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 rounded-lg text-xs font-bold text-zinc-600 transition-all"
                                    >
                                        <FileText size={14} />
                                        <span>View PDF</span>
                                    </button>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="relative inline-block w-full min-w-[140px]">
                                        {updatingId === order.id ? (
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <Loader2 size={14} className="animate-spin" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Updating...</span>
                                            </div>
                                        ) : (
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                className={`w-full appearance-none px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none transition-all border border-transparent ${order.status === 'PENDING' ? 'bg-amber-50 text-amber-600 hover:border-amber-200' :
                                                        order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600 hover:border-blue-200' :
                                                            order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 hover:border-emerald-200' :
                                                                'bg-rose-50 text-rose-600 hover:border-rose-200'
                                                    }`}
                                            >
                                                <option value="PENDING">Pending</option>
                                                <option value="PROCESSING">Processing</option>
                                                <option value="COMPLETED">Completed</option>
                                                <option value="CANCELLED">Cancelled</option>
                                            </select>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2 text-zinc-300 hover:text-zinc-900 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BulkOrderTable;
