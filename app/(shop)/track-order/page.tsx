'use client';

import React, { useState } from 'react';
import { Search, Package, MapPin, Clock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { getBulkOrderStatus } from './actions';

const TrackOrderPage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId) return;

        setIsLoading(true);
        setError('');
        setOrder(null);

        try {
            const res = await getBulkOrderStatus(trackingId);
            if (res.success) {
                setOrder(res.order);
            } else {
                setError(res.error || 'Order ID not found.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white h-[calc(100vh-150px)] overflow-hidden flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-md space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="text-center space-y-3">
                    <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-widest leading-none">Status Portal</h2>
                    <h1 className="text-4xl font-bold tracking-tighter text-zinc-900">Track bulk inquiry</h1>
                    <p className="text-zinc-500 text-[15px]">Enter your unique tracking ID provided during submission.</p>
                </div>

                <form onSubmit={handleTrack} className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                            placeholder="BO-XXXXXX"
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-lg font-mono tracking-wider focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-200 transition-all outline-none uppercase"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 bg-black text-white rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98] transition-all font-bold text-sm shadow-xl shadow-black/10 disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Track Submission'}
                    </button>
                    {error && (
                        <div className="flex items-center gap-2 text-red-500 justify-center text-sm font-medium animate-in fade-in zoom-in">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}
                </form>

                {order && (
                    <div className="bg-zinc-50 rounded-[2.5rem] border border-zinc-100 p-8 space-y-8 animate-in fade-in zoom-in duration-500 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Current Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-sm font-bold text-zinc-900">{order.status}</span>
                                </div>
                            </div>
                            <Package className="text-zinc-200" size={32} />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-sm flex-shrink-0">
                                    <Clock size={16} className="text-zinc-400" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-semibold text-zinc-900 truncate">{order.institutionName}</p>
                                    <p className="text-[12px] text-zinc-400">Submitted on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="ml-5 h-8 border-l border-dashed border-zinc-200" />
                            <div className="flex items-start gap-4 opacity-50">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-sm flex-shrink-0">
                                    <MapPin size={16} className="text-zinc-300" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-semibold text-zinc-400">Verification & Logistics</p>
                                    <p className="text-[12px] text-zinc-300">Awaiting department approval</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrderPage;
