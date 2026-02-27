'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <nav className="w-full bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-[0_2px_15px_-10px_rgba(0,0,0,0.08)]">
            <div className="container mx-auto px-6 md:px-10 h-20 flex items-center justify-between">

                {/* Left: Logo + Text Lockup */}
                <div className="flex-1 flex items-center">
                    <Link href="/" className="flex items-center gap-4 group transition-opacity hover:opacity-90">
                        {/* External Logo Image */}
                        <img
                            src="https://res.cloudinary.com/dsqqrpzfl/image/upload/v1770199908/1769454781522_pgepvr.png"
                            alt="Hsga Logo"
                            className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            // If the image fails to load, the text still looks great
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />

                        {/* Subtle Vertical Hairline - Very light to avoid the "line" look */}
                        <div className="h-10 w-px bg-zinc-200" />

                        {/* Brand Text - Normal Casing */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-[14px] leading-tight tracking-tight text-zinc-900">
                                <span className="font-bold">Hindustan Scouts and Guides Association</span>
                            </h1>
                            <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest leading-none mt-1">
                                Telangana State • Official Store
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Center: Navigation - High-end Spacing */}
                <div className="hidden lg:flex items-center gap-10 h-full">
                    <Link href="/uniforms" className="h-full flex items-center text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors group">
                        <span className="relative">
                            Uniforms
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-zinc-900 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </span>
                    </Link>

                    {/* Accessories Mega Menu */}
                    <div className="h-full flex items-center relative group/mega cursor-pointer">
                        <Link href="/coming-soon" className="text-[13px] font-medium text-zinc-500 group-hover/mega:text-zinc-900 transition-colors relative">
                            Accessories
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-zinc-900 transition-all duration-300 group-hover/mega:w-full group-hover/mega:left-0" />
                        </Link>

                        {/* Dropdown Menu */}
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[280px] bg-white border border-zinc-200/50 shadow-2xl rounded-2xl opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible transition-all duration-500 translate-y-4 group-hover/mega:translate-y-0 z-50 overflow-hidden flex flex-col cursor-default pointer-events-none group-hover/mega:pointer-events-auto p-3">
                            <ul className="flex flex-col">
                                {['Badges & Stickers', 'Belts & Lanyards', 'Caps & Headwear', 'Scarves & Woggles', 'Whistles & Ropes'].map((link) => (
                                    <li key={link}>
                                        <Link href="/coming-soon" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-zinc-50 transition-colors group/item">
                                            <span className="text-[13px] font-medium text-zinc-600 group-hover/item:text-zinc-900 transition-colors">
                                                {link}
                                            </span>
                                            <span className="text-[9px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full uppercase tracking-widest group-hover/item:bg-zinc-200 group-hover/item:text-zinc-600 transition-colors">
                                                Coming Soon
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Link href="/id-cards" className="h-full flex items-center text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors group">
                        <span className="relative">
                            ID Cards
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-zinc-900 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </span>
                    </Link>
                    <Link href="/about" className="h-full flex items-center text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors group">
                        <span className="relative">
                            About
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-zinc-900 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </span>
                    </Link>
                </div>

                {/* Right: Actions - Clean Icons */}
                <div className="flex-1 flex items-center justify-end gap-1 md:gap-4">
                    {/* Bulk Order CTA */}
                    <Link
                        href="/bulk-order"
                        className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-[13px] font-bold transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
                    >
                        Bulk Order
                    </Link>

                    <button className="p-2.5 text-zinc-400 hover:text-zinc-900 transition-colors" aria-label="Search">
                        <Search size={19} strokeWidth={1.3} />
                    </button>



                    <Link
                        href="/cart"
                        className="group relative p-2.5 text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                        <ShoppingBag size={19} strokeWidth={1.3} />
                        {cartCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-black text-white text-[9px] font-bold flex items-center justify-center rounded-full px-1 border border-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        className="lg:hidden p-2 text-zinc-600 ml-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} strokeWidth={1.3} /> : <Menu size={24} strokeWidth={1.3} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="lg:hidden bg-white fixed inset-x-0 top-20 h-screen animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col p-10 gap-8">
                        {['Uniforms', 'Accessories', 'ID Cards', 'About'].map((item) => {
                            const href = item === 'Accessories' ? '/coming-soon' : `/${item.toLowerCase().replace(' ', '-')}`;
                            return (
                                <Link
                                    key={item}
                                    href={href}
                                    className="text-3xl font-light text-zinc-900 tracking-tight"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            );
                        })}

                        {/* Mobile Bulk Order */}
                        <Link
                            href="/bulk-order"
                            className="w-full py-4 bg-black text-white rounded-2xl flex items-center justify-center text-[15px] font-bold shadow-lg shadow-black/10"
                            onClick={() => setIsOpen(false)}
                        >
                            Bulk Order
                        </Link>

                        <div className="pt-12 flex flex-col gap-4 border-t border-zinc-50">

                            <span className="text-zinc-300 text-[10px] uppercase tracking-widest">Hyd, Telangana</span>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;