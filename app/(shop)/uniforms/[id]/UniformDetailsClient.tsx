'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Ruler, Check, ShieldCheck, Truck, ChevronLeft, Info } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function UniformDetailsClient({ uniform }: { uniform: any }) {
    const { addToCart } = useCart();
    const availableSizes = uniform.sizes ? uniform.sizes.split(',').map((s: string) => s.trim()) : ['S', 'M', 'L', 'XL'];
    const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0]);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            id: `${uniform.id}-${selectedSize}`,
            name: `${uniform.name} (${selectedSize})`,
            price: uniform.price,
            image: uniform.image || ''
        });

        toast.success(`Added to bag`, {
            position: 'bottom-center',
            style: { borderRadius: '12px', background: '#18181b', color: '#fff', fontSize: '12px' },
        });

        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 pb-20">
            {/* 1. Top Navigation Bar (Mobile Friendly) */}
            <div className="bg-white border-b border-zinc-100 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-6xl">
                    <Link href="/uniforms" className="flex items-center gap-1 text-zinc-500 hover:text-zinc-900 transition-colors">
                        <ChevronLeft size={18} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Back to Registry</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden md:block">Official Merchandise</span>
                        <ShieldCheck size={16} className="text-zinc-400" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-6 md:pt-10 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* 2. Image Section (Left - 5 Cols) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden aspect-[4/5] md:aspect-square flex items-center justify-center p-6 md:p-12 relative group">
                            <div className="absolute top-4 left-4">
                                <span className="bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded">
                                    {uniform.type || 'Official'}
                                </span>
                            </div>
                            {uniform.image ? (
                                <img
                                    src={uniform.image}
                                    alt={uniform.name}
                                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <ShoppingBag size={64} className="text-zinc-100" />
                            )}
                        </div>
                    </div>

                    {/* 3. Product Info Section (Middle - 4 Cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="space-y-2 border-b border-zinc-100 pb-6">
                            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 tracking-tight leading-tight">
                                {uniform.name}
                            </h1>
                            <div className="flex items-center gap-2">
                                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">SKU: HSGA-2024-{(uniform.id % 1000).toString().padStart(3, '0')}</p>
                                <span className="text-zinc-200">•</span>
                                <span className="text-emerald-600 text-[11px] font-bold uppercase">In Stock</span>
                            </div>
                        </div>

                        {/* Price Area */}
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-zinc-900 tracking-tighter">₹{uniform.price.toLocaleString()}</span>
                                <span className="text-sm text-zinc-400 line-through">₹{(uniform.price * 1.2).toLocaleString()}</span>
                            </div>
                            <p className="text-[11px] text-zinc-500 font-medium">Inclusive of all taxes & state logistics.</p>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                                    <Ruler size={14} className="text-zinc-400" /> Size Selection
                                </h3>
                                <button className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 underline underline-offset-4">Guide</button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {availableSizes.map((size: string) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-10 rounded-lg text-xs font-bold transition-all border ${selectedSize === size
                                            ? 'bg-zinc-900 border-zinc-900 text-white shadow-md'
                                            : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-900'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description / Bullet Points (Amazon Style) */}
                        <div className="space-y-4 pt-6 border-t border-zinc-100">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900">About this item</h3>
                            <ul className="space-y-3">
                                {[uniform.description, uniform.content, uniform.detailedDescription].filter(Boolean).map((text, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-2 flex-shrink-0" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 4. Checkout Card (Right - 3 Cols - Sticky) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white border border-zinc-200 rounded-2xl p-6 sticky top-20 shadow-sm">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <Truck size={18} className="text-emerald-600" />
                                    <div>
                                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-tighter">Complimentary Delivery</p>
                                        <p className="text-[10px] text-emerald-600 font-medium">Expected in 3-5 business days</p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdding || !uniform.inStock}
                                        className={`w-full h-12 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isAdding
                                            ? 'bg-zinc-100 text-zinc-400'
                                            : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-200 active:scale-[0.98]'
                                            }`}
                                    >
                                        {isAdding ? <><Check size={16} /> Added</> : 'Add to Bag'}
                                    </button>

                                    <Link
                                        href="/bulk-order"
                                        className="w-full h-12 rounded-xl border border-zinc-200 bg-white font-bold text-sm text-zinc-900 hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        Bulk Order Request
                                    </Link>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-zinc-100">
                                    <div className="flex items-start gap-2 text-[10px] text-zinc-400">
                                        <Info size={14} className="mt-0.5 flex-shrink-0" />
                                        <p className="leading-normal font-medium italic">
                                            Prices are strictly regulated by the Telangana State Scouts and Guides Association.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}