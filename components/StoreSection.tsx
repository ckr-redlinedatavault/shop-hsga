import React from 'react';
import prisma from "@/lib/prisma";
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

export default async function StoreSection() {
    let products: any[] = [];
    try {
        products = await prisma.product.findMany({
            where: {
                inStock: true,
                category: { not: 'Uniform' }
            },
            take: 4,
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        console.error("Failed to fetch store products", e);
    }

    if (products.length === 0) return null;

    return (
        <section className="bg-zinc-50/30 py-12 md:py-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6">
                    <div className="space-y-4 max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                            Official Store
                        </h2>
                        <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                            Browse the official collection of Hindustan Scouts and Guides Association gear. Authentic apparel and equipment designed for the elite.
                        </p>
                    </div>
                    <Link
                        href="/uniforms"
                        className="group flex items-center gap-3 pl-5 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 bg-white text-zinc-900 rounded-full font-bold text-xs md:text-sm shadow-sm hover:shadow-md border border-zinc-200/80 hover:border-zinc-300 transition-all w-max"
                    >
                        Explore all
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-black rounded-full flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                            <svg
                                className="w-3 h-3 md:w-3.5 md:h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group bg-white p-3 md:p-4 rounded-[2rem] md:rounded-[2.8rem] border border-zinc-200/80 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-zinc-300">
                            {/* Image Container */}
                            <div className="relative aspect-square overflow-hidden rounded-[1.6rem] md:rounded-[2.2rem] bg-[#f0f4f0] flex items-center justify-center p-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="mt-6 px-1 space-y-5">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-zinc-900 tracking-tight leading-none capitalize">
                                            {product.name.toLowerCase()}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            <span className="px-3 py-1 bg-zinc-100 text-zinc-400 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Links & Price - Aligned to right */}
                                    <div className="flex flex-col items-end gap-1.5">
                                        <Link
                                            href={`/product/${product.id}`}
                                            className="flex items-center gap-0.5 text-xs font-bold text-zinc-900 border-b-2 border-zinc-900 pb-0.5 hover:opacity-70 transition-all whitespace-nowrap"
                                        >
                                            Order Now
                                            <MoveUpRight size={10} className="mb-0.5" />
                                        </Link>
                                        {/* Price placed under Order Now */}
                                        <span className="text-[17px] font-bold text-zinc-900 tracking-tight">₹{product.price}</span>
                                    </div>
                                </div>

                                {/* Add to Bag Button */}
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
