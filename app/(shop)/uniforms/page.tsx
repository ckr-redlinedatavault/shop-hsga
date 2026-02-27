import React from 'react';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { ShoppingBag, Star, Ruler, Layers, MoveUpRight, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Official Uniforms | HSGA Store',
    description: 'Browse the official collection of Hindustan Scouts and Guides Association uniforms and gear.',
};

export default async function UniformsPage() {
    let uniforms: any[] = [];
    try {
        uniforms = await (prisma as any).product.findMany({
            where: {
                category: 'Uniform',
                inStock: true
            },
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error('Failed to fetch uniforms:', error);
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header Banner - Reduced Height */}
            <section className="relative w-full bg-zinc-900 overflow-hidden h-[30vh] md:h-[40vh] min-h-[250px] flex flex-col justify-center pb-0">
                <div className="absolute inset-0">
                    {/* Dark gradient base mapping over any image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-black/40 z-10" />
                    <img
                        src="https://placehold.co/1920x400/18181b/3f3f46?text=Official+Uniforms+Banner"
                        alt="Scout Uniforms Background"
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                    />
                </div>

                <div className="container relative z-20 mx-auto px-6 md:px-12 mt-4">
                    <div className="max-w-xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 shadow-sm">
                            <Zap size={12} className="text-[#ff5e00]" />
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] leading-none">Official Registry</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
                            State Uniforms
                        </h1>
                        <p className="text-zinc-300 text-sm md:text-lg leading-relaxed font-medium max-w-xl">
                            The highest standard of identity. Premium fabrics, precision stitching, and the verified mark of the Hindustan Scouts & Guides Association.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Uniforms Catalog */}
            <section className="py-16 md:py-24 bg-zinc-50">
                <div className="container mx-auto px-4 md:px-6">
                    {uniforms.length === 0 ? (
                        <div className="max-w-md mx-auto py-24 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-zinc-100">
                                <ShoppingBag size={24} className="text-zinc-300" />
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-900">No uniforms available</h2>
                            <p className="text-zinc-500 mt-2 text-sm">Please check back later or contact state administration.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                            {uniforms.map((uniform) => (
                                <Link href={`/uniforms/${uniform.id}`} key={uniform.id} className="group bg-white p-3 md:p-4 rounded-[2rem] md:rounded-[2.8rem] border border-zinc-200/80 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-zinc-300 flex flex-col block">

                                    {/* Image Container - Matches StoreSection exactly */}
                                    <div className="relative aspect-square overflow-hidden rounded-[1.6rem] md:rounded-[2.2rem] bg-[#f0f4f0] flex items-center justify-center p-4">
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-zinc-900 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                                                {uniform.type || 'Standard'}
                                            </span>
                                        </div>
                                        {uniform.image ? (
                                            <img
                                                src={uniform.image}
                                                alt={uniform.name}
                                                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                <ShoppingBag size={32} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section - Matches StoreSection style */}
                                    <div className="mt-6 px-1 space-y-5 flex-grow flex flex-col justify-between">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1 pr-2">
                                                <h3 className="text-lg font-bold text-zinc-900 tracking-tight leading-none capitalize line-clamp-2">
                                                    {uniform.name.toLowerCase()}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <span className="px-3 py-1 bg-zinc-100 text-zinc-400 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                                        {uniform.sizes ? `${uniform.sizes.split(',').length} Sizes` : 'Multi-size'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price & Action Link */}
                                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                <div className="flex items-center gap-0.5 text-[10px] font-bold text-zinc-900 uppercase tracking-wider border-b-2 border-zinc-900 pb-0.5 group-hover:opacity-70 transition-all">
                                                    View
                                                    <MoveUpRight size={10} className="mb-0.5" />
                                                </div>
                                                <span className="text-[17px] font-bold text-zinc-900 tracking-tight">₹{uniform.price}</span>
                                            </div>
                                        </div>

                                        {/* Fake Select Size Button matching AddToCart style */}
                                        <div className="w-full py-4 bg-black text-white rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98] transition-all font-bold text-xs shadow-xl shadow-black/10 mt-4 group-hover:bg-zinc-800">
                                            <span>Select Size</span>
                                            <MoveUpRight size={14} />
                                        </div>
                                    </div>

                                </Link>
                            ))}</div>
                    )}
                </div>
            </section>
        </div>
    );
}
