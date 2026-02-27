'use client';

import React, { useState } from 'react';
import { createIdCardTemplate } from '../actions';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, LayoutTemplate, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function AddIdCardTemplatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        type: 'Official Template',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price) {
            toast.error('Name and Price are required.');
            return;
        }

        setIsSubmitting(true);
        toast.loading('Creating template...', { id: 'createTemplate' });

        const result = await createIdCardTemplate({
            ...formData,
            price: parseFloat(formData.price) || 0
        });

        if (result.success) {
            toast.success('Template created successfully!', { id: 'createTemplate' });
            router.push('/admin/dashboard/id-cards');
        } else {
            toast.error(result.error || 'Failed to create template', { id: 'createTemplate' });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-12">
            <Link href="/admin/dashboard/id-cards" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
                <ArrowLeft size={16} /> Back to ID Cards
            </Link>

            <div className="bg-white border text-zinc-900 border-zinc-200/60 rounded-3xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 border-b border-zinc-100 bg-zinc-50/50 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-zinc-200 flex items-center justify-center shadow-sm">
                        <LayoutTemplate size={24} className="text-zinc-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">New Master Template</h1>
                        <p className="text-sm text-zinc-500 font-medium">Create a new standardized blueprint for bulk requests.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-1 md:col-span-2">
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Template Blueprint Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Official Student Standard"
                                    required
                                    className="w-full h-12 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-zinc-900"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Type / Variant</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    placeholder="e.g. Official Theme"
                                    className="w-full h-12 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-zinc-900"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Base Rate (Per Card)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="50"
                                    required
                                    min="0"
                                    className="w-full h-12 px-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-zinc-900"
                                />
                            </div>

                            <div className="space-y-2 col-span-1 md:col-span-2">
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Details about the ID card material, size and scope..."
                                    rows={3}
                                    className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-zinc-900 resize-none"
                                />
                            </div>

                            <div className="space-y-2 col-span-1 md:col-span-2">
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Reference Image URL</label>
                                <div className="relative">
                                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full h-12 pl-11 pr-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-zinc-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`h-12 px-8 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isSubmitting
                                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                                    : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10 hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                        >
                            {isSubmitting ? 'Finalizing Protocol...' : <><Check size={18} /> Finalize Template</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
