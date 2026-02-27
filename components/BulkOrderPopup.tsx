'use client';

import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import Link from 'next/link';

const BulkOrderPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already seen the popup in this session
        const hasSeenPopup = sessionStorage.getItem('hasSeenBulkOrderPopup');

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000); // Show after 1 second
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenBulkOrderPopup', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-500"
                onClick={closePopup}
            />

            {/* Popup Content */}
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
                {/* Close Button */}
                <button
                    onClick={closePopup}
                    className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-zinc-900 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 md:p-10">
                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
                            <ShoppingBag size={28} />
                        </div>

                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full">
                                <Info size={12} className="text-orange-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Important Update</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
                                Institutional Orders Only
                            </h2>
                            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                                Our retail checkout is currently paused. We are exclusively processing <span className="font-bold text-zinc-900">Bulk Procurement Requests</span> for institutions and groups.
                            </p>
                        </div>

                        <div className="w-full grid grid-cols-1 gap-4 pt-4">
                            <Link
                                href="/bulk-order"
                                onClick={closePopup}
                                className="w-full py-4 bg-black text-white rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-sm shadow-xl shadow-black/10"
                            >
                                Go to Bulk Order
                                <ArrowRight size={18} />
                            </Link>
                            <button
                                onClick={closePopup}
                                className="w-full py-4 bg-zinc-50 text-zinc-600 rounded-2xl hover:bg-zinc-100 transition-all font-bold text-sm"
                            >
                                Continue Browsing
                            </button>
                        </div>

                        <div className="pt-6 border-t border-zinc-100 w-full flex items-center justify-center gap-4">
                            <div className="flex items-center gap-1.5 opacity-50">
                                <ShieldCheck size={14} className="text-zinc-900" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Official Store</span>
                            </div>
                            <div className="w-1 h-1 bg-zinc-200 rounded-full" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Telangana State</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkOrderPopup;
