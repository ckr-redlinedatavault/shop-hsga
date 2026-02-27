'use client';

import React, { useState, useEffect } from 'react';
import { Package, Search, ChevronDown, CheckCircle2, Clock, MapPin, X, ExternalLink, Printer } from 'lucide-react';
import { getIdCardOrders, updateIdCardOrderStatus } from './actions';
import { toast } from 'react-hot-toast';

export default function AdminIdCardsPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        const res = await getIdCardOrders();
        if (res.success && res.orders) {
            setOrders(res.orders);
        } else {
            toast.error(res.error || 'Failed to load orders');
        }
        setIsLoading(false);
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        toast.loading('Updating status...', { id: 'statusUpdate' });
        const res = await updateIdCardOrderStatus(orderId, newStatus);

        if (res.success) {
            toast.success(`Status updated to ${newStatus}`, { id: 'statusUpdate' });
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
            fetchOrders();
        } else {
            toast.error(res.error || 'Failed to update status', { id: 'statusUpdate' });
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'PROCESSING': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'PRINTING': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'SHIPPED': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'DELIVERED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            default: return 'bg-zinc-50 text-zinc-700 border-zinc-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">ID Card Requests</h1>
                    <p className="text-sm text-zinc-500 font-medium">Manage and process bulk ID card orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => window.location.href = '/admin/dashboard/id-cards/add'}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-900 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-[1.02]"
                    >
                        <Package size={14} /> New Template
                    </button>
                    <div className="flex bg-white border border-zinc-200 rounded-xl p-1 shadow-sm">
                        {['ALL', 'PENDING', 'PRINTING', 'DELIVERED'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${statusFilter === status
                                        ? 'bg-zinc-900 text-white shadow-md'
                                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white border text-zinc-900 border-zinc-200/60 rounded-3xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by Tracking ID, Institution..."
                            value={searchTerm}
                            onChange={(e: any) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50/50 text-[10px] uppercase tracking-widest text-zinc-400 border-b border-zinc-100">
                                <th className="p-4 font-bold">Protocol Tracking ID</th>
                                <th className="p-4 font-bold">Institution</th>
                                <th className="p-4 font-bold">Items</th>
                                <th className="p-4 font-bold">Status</th>
                                <th className="p-4 font-bold">Date</th>
                                <th className="p-4 font-bold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-zinc-400 font-medium animate-pulse">
                                        Loading ID Card Orders...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-zinc-400 font-medium">
                                        No ID orders found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <td className="p-4">
                                            <span className="font-mono text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-1 rounded">
                                                {order.trackingId}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-zinc-900">{order.institutionName}</p>
                                            <p className="text-[11px] text-zinc-500">{order.contactPerson}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-zinc-900">{order.quantity}</span>
                                            <span className="text-zinc-500 text-xs ml-1">Cards</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${getStatusStyle(order.status)}`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-zinc-500 text-xs font-medium">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                                                View Intel &rarr;
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="px-8 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50 sticky top-0">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                                    HQ Print Protocol <span className="font-mono bg-zinc-200 px-2 py-0.5 rounded text-xs">{selectedOrder.trackingId}</span>
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 bg-white border border-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto space-y-8 flex-grow">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Institution Intel</h3>
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900">{selectedOrder.institutionName}</p>
                                        <p className="text-xs text-zinc-500 mt-1">{selectedOrder.contactPerson}</p>
                                        <p className="text-xs text-zinc-500">{selectedOrder.email}</p>
                                        <p className="text-xs text-zinc-500">{selectedOrder.phone}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Delivery Sector</h3>
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900">{selectedOrder.city}, {selectedOrder.state}</p>
                                        <p className="text-xs text-zinc-500 mt-1">{selectedOrder.address}</p>
                                        <p className="text-xs text-zinc-500 font-mono mt-1">PIN: {selectedOrder.pincode}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Print Configuration</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-zinc-200 rounded-xl flex items-center justify-center">
                                            <Printer size={20} className="text-zinc-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-900">{selectedOrder.templateName}</p>
                                            <p className="text-xs text-zinc-500">Master Template Selected</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-zinc-900">{selectedOrder.quantity}</p>
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ID Cards Required</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Override Status Protocol</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                    {['PENDING', 'PROCESSING', 'PRINTING', 'SHIPPED', 'DELIVERED'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                                            className={`py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all ${selectedOrder.status === status
                                                    ? 'bg-zinc-900 text-white shadow-lg'
                                                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
