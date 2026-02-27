import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default async function IdCardsPage() {
    let templates: any[] = [];
    try {
        templates = await (prisma as any).product.findMany({
            where: { category: "ID Card" },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Failed to fetch ID Card templates:", error);
    }

    return (
        <div className="min-h-[85vh] bg-zinc-50 pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">
                        ID Card Templates
                    </h1>
                    <p className="text-zinc-500 font-medium max-w-2xl text-lg">
                        Select an official Hindustan Scouts and Guides Association printed ID Card template for your institution to start your bulk customization order.
                    </p>
                </div>

                {templates.length === 0 ? (
                    <div className="bg-white p-12 rounded-[2rem] border border-zinc-200 text-center flex flex-col items-center">
                        <ShieldCheck size={48} className="text-zinc-200 mb-4" />
                        <h3 className="text-lg font-bold text-zinc-900 mb-1">No Templates Found</h3>
                        <p className="text-sm text-zinc-500 font-medium max-w-md">The admin hasn't added any ID Card templates yet. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <Link key={template.id} href={`/id-cards/${template.id}`} className="group block bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:border-zinc-300 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="aspect-[4/3] bg-[#f0f4f0] p-8 flex items-center justify-center relative border-b border-zinc-100">
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/80 backdrop-blur-md text-zinc-900 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm border border-black/5">
                                            {template.type || 'Official Template'}
                                        </span>
                                    </div>
                                    {template.image ? (
                                        <img src={template.image} alt={template.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-20 h-28 bg-white border border-dashed border-zinc-300 rounded flex flex-col items-center justify-center shadow-sm">
                                            <span className="text-[10px] font-bold uppercase text-zinc-400">ID Card</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3 className="text-base font-bold text-zinc-900 leading-snug">{template.name}</h3>
                                        <div className="flex-shrink-0 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-lg">
                                            <span className="text-[12px] font-black text-zinc-900">₹{template.price}</span>
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-zinc-500 font-medium line-clamp-2 min-h-[36px]">
                                        {template.description || "Official highly durable printed PVC ID Card."}
                                    </p>

                                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-50">
                                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-black transition-colors">
                                            Bulk Order <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
