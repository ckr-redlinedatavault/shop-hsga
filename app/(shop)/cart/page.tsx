'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 md:px-6 py-10 lg:py-16">

                {/* 1. Refined Navigation */}
                <div className="max-w-6xl mx-auto mb-12">
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 text-zinc-400">
                        <Link href="/" className="hover:text-zinc-900 transition-colors">Store</Link>
                        <span>/</span>
                        <span className="text-zinc-900">Bag</span>
                    </nav>

                    <div className="flex items-end justify-between border-b border-zinc-100 pb-6">
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tighter">
                                Your Bag
                            </h1>
                            <p className="text-zinc-400 text-xs md:text-sm font-medium">
                                {cartCount} Official Registry {cartCount === 1 ? 'Item' : 'Items'}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Secure Session</span>
                            </div>
                        </div>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div className="max-w-md mx-auto py-24 text-center">
                        <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={24} className="text-zinc-300" />
                        </div>
                        <h2 className="text-xl font-semibold text-zinc-900">Your bag is empty</h2>
                        <p className="text-zinc-500 mt-2 text-sm">Add premium HSGA gear to start.</p>
                        <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-8 decoration-zinc-200 hover:decoration-zinc-900 transition-all">
                            Browse Collection <ArrowRight size={14} />
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* 2. Minimalist Item List */}
                        <div className="lg:col-span-7">
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="bg-zinc-50 border border-zinc-100 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex gap-4 md:gap-8 group transition-all hover:bg-zinc-100/50 hover:border-zinc-200">

                                        {/* Compact Image Container */}
                                        <div className="relative w-24 h-32 md:w-32 md:h-40 bg-zinc-900 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-800 shadow-inner">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover mix-blend-luminosity opacity-90 transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                                    <ShoppingBag size={20} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details - Vertically Aligned */}
                                        <div className="flex-1 flex flex-col justify-between py-0.5">
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                    <h3 className="text-sm md:text-base font-bold text-zinc-900 tracking-tight capitalize leading-tight">
                                                        {item.name.toLowerCase()}
                                                    </h3>
                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
                                                        Standard Issue • TS-01
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-zinc-300 hover:text-rose-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} strokeWidth={1.5} />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4 md:mt-0">
                                                {/* Smaller Precision Controls */}
                                                <div className="flex items-center bg-zinc-50 rounded-lg p-0.5 border border-zinc-100">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md text-zinc-400 transition-all disabled:opacity-20"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={12} strokeWidth={3} />
                                                    </button>
                                                    <span className="w-8 text-center text-[11px] font-bold text-zinc-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md text-zinc-400 transition-all"
                                                    >
                                                        <Plus size={12} strokeWidth={3} />
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm md:text-lg font-bold text-zinc-900 tracking-tighter">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Receipt-Style Summary */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-8 space-y-6">
                                <div className="bg-zinc-900 rounded-[2rem] p-6 md:p-8 border border-zinc-800 text-white shadow-2xl shadow-black/10">
                                    <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Order Details</h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span className="text-zinc-400">Subtotal</span>
                                            <span className="text-white">₹{cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs font-medium">
                                            <span className="text-zinc-400">Logistics</span>
                                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] tracking-tighter border border-emerald-500/20">FREE</span>
                                        </div>
                                        <div className="pt-4 border-t border-zinc-800">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Payable</span>
                                                <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter line-clamp-1">
                                                    ₹{cartTotal.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-4">
                                        <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Notice</p>
                                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                                            Currently, we are only accepting <span className="text-white font-bold">Bulk Orders</span> through our institutional procurement portal. Individual checkout is disabled.
                                        </p>
                                    </div>

                                    <Link
                                        href="/bulk-order"
                                        className="w-full mt-2 py-4 bg-white text-zinc-900 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/10"
                                    >
                                        Proceed to Bulk Order
                                        <ArrowRight size={16} />
                                    </Link>

                                    {/* Security & Badge */}
                                    <div className="mt-8 pt-6 border-t border-zinc-800 flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-700">
                                            <ShieldCheck size={14} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white uppercase tracking-tight">State Verified</p>
                                            <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed font-medium">
                                                HSGA official procurement channel. Secure encrypted checkout.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/"
                                    className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-[11px] font-bold uppercase tracking-widest"
                                >
                                    <ArrowLeft size={12} />
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}