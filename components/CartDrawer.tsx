'use client';

import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed inset-y-0 right-0 z-[9999] w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Header - High-end Alignment */}
                    <div className="px-8 py-8 flex items-center justify-between border-b border-zinc-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/10">
                                <ShoppingBag size={22} strokeWidth={2} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 tracking-tight leading-none">Your Bag</h2>
                                <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-widest mt-1.5">
                                    {cartCount} {cartCount === 1 ? 'Item' : 'Items'} Added
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-zinc-50 rounded-2xl transition-all text-zinc-400 hover:text-zinc-900 hover:rotate-90"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Items Container */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-zinc-50 rounded-[2rem] flex items-center justify-center mb-6">
                                    <ShoppingBag size={40} className="text-zinc-200" />
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900">Empty Bag</h3>
                                <p className="text-zinc-400 text-sm max-w-[200px] mx-auto mt-2 leading-relaxed">
                                    Start adding official gear to your registry.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="mt-8 px-10 py-4 bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                                >
                                    Explore Store
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        {/* Item Image - Soft BG */}
                                        <div className="w-24 h-24 bg-[#f4f7f4] rounded-[1.8rem] overflow-hidden flex-shrink-0 border border-zinc-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ShoppingBag size={24} className="text-zinc-200" />
                                            )}
                                        </div>

                                        {/* Item Info - Clean Alignment */}
                                        <div className="flex-1 py-1 flex flex-col justify-between">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-zinc-900 leading-tight text-[15px] capitalize">
                                                        {item.name.toLowerCase()}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-zinc-300 hover:text-rose-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-[11px] text-zinc-400 font-medium tracking-wide">Premium Standard Variant</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Controls - Pill Look */}
                                                <div className="flex items-center bg-zinc-50 rounded-xl px-2 py-1.5 border border-zinc-100">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1.5 hover:bg-white hover:text-black rounded-lg text-zinc-400 transition-all shadow-sm shadow-transparent hover:shadow-black/5"
                                                    >
                                                        <Minus size={12} strokeWidth={3} />
                                                    </button>
                                                    <span className="w-8 text-center text-[13px] font-bold text-zinc-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1.5 hover:bg-white hover:text-black rounded-lg text-zinc-400 transition-all shadow-sm shadow-transparent hover:shadow-black/5"
                                                    >
                                                        <Plus size={12} strokeWidth={3} />
                                                    </button>
                                                </div>
                                                <p className="font-bold text-zinc-900 text-base">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer - Solid Layout */}
                    {cart.length > 0 && (
                        <div className="p-8 bg-white border-t border-zinc-50 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-[0.2em] mb-1">Subtotal</p>
                                    <p className="text-center text-[9px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                                        Free Delivery
                                    </p>
                                </div>
                                <p className="text-3xl font-bold text-zinc-900 tracking-tighter">₹{cartTotal}</p>
                            </div>

                            <Link href="/bulk-order" onClick={onClose} className="w-full py-5 bg-black text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/20">
                                Bulk Order Request
                                <ArrowRight size={18} />
                            </Link>

                            <div className="flex items-center justify-center gap-2 pt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                                <p className="text-[10px] text-zinc-400 uppercase font-medium tracking-[0.15em]">
                                    Encrypted & Secure Payment
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f4f4f5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #e4e4e7;
        }
      `}</style>
        </>
    );
};

export default CartDrawer;
