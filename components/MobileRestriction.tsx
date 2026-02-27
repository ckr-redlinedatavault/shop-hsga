'use client';

import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, AlertCircle, ShieldAlert } from 'lucide-react';

const MobileRestriction = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            // Check width or userAgent
            const width = window.innerWidth;
            const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (width < 1024 || mobileAgent) {
                setIsMobile(true);
                // Prevent scrolling on the background
                document.body.style.overflow = 'hidden';
            } else {
                setIsMobile(false);
                document.body.style.overflow = 'auto';
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (!isMobile) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-zinc-950 flex items-center justify-center p-6 lg:hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Window Container */}
            <div className="relative w-full max-w-[90%] md:max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500">
                {/* Header Style Bar */}
                <div className="bg-zinc-50 px-8 py-4 border-b border-zinc-100 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    </div>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">System Alert</span>
                </div>

                <div className="p-8 md:p-10 flex flex-col items-center text-center space-y-8">
                    {/* Icon Status */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full" />
                        <div className="relative w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                            <ShieldAlert size={28} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                            Access Restricted
                        </h2>
                        <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                                "This page is not opened in Mobile website."
                            </p>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed px-4">
                            Institutional procurement and bulk order management is exclusively available on the <span className="text-zinc-900 font-bold">Desktop Website</span>.
                        </p>
                    </div>

                    <div className="w-full space-y-4 pt-4 border-t border-zinc-100/80">
                        <div className="flex items-center justify-center gap-3">
                            <Monitor size={18} className="text-zinc-900" />
                            <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">Open on PC/Laptop</span>
                        </div>
                        <p className="text-[9px] text-zinc-300 uppercase tracking-[0.2em] font-medium">
                            Official HSGA Telangana Portal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileRestriction;
