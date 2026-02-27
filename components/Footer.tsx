import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white py-8 border-t border-zinc-100">
            <div className="container mx-auto px-6 md:px-10 lg:max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">

                {/* Brand & Copyright */}
                <div className="flex items-center gap-3">
                    <img
                        src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1770199908/1769454781522_pgepvr.png"
                        alt="HSGA Logo"
                        className="h-8 w-auto object-contain"
                    />
                    <p className="text-[11px] font-bold text-zinc-400">
                        &copy; {new Date().getFullYear()} HSGA Telangana State.
                    </p>
                </div>

                {/* Policy & Tracking Links */}
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link href="/track-order" className="text-[11px] font-bold text-zinc-500 hover:text-orange-500 uppercase tracking-widest transition-colors">
                        Track Application
                    </Link>
                    <Link href="/coming-soon" className="text-[11px] font-bold text-zinc-500 hover:text-orange-500 uppercase tracking-widest transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/coming-soon" className="text-[11px] font-bold text-zinc-500 hover:text-orange-500 uppercase tracking-widest transition-colors">
                        Returns Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
