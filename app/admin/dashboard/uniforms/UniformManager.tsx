'use client';

import React, { useState } from 'react';
import {
    Plus, Pencil, Trash2, X, Loader2, Image as ImageIcon, IndianRupee, Tag,
    Text, AlignLeft, Layers, Ruler
} from 'lucide-react';
import { createUniform, updateUniform, deleteUniform } from './actions';

interface Uniform {
    id: string;
    name: string;
    description: string | null;
    detailedDescription: string | null;
    price: number;
    type: string | null;
    image: string | null;
    content: string | null;
    sizes: string | null;
    inStock: boolean;
}

const UniformManager = ({ initialUniforms }: { initialUniforms: Uniform[] }) => {
    const [uniforms, setUniforms] = useState<Uniform[]>(initialUniforms);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUniform, setEditingUniform] = useState<Uniform | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Default sizes options
    const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL', 'Custom'];

    // For managing selected sizes securely
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const handleAddClick = () => {
        setEditingUniform(null);
        setSelectedSizes([]);
        setIsModalOpen(true);
    };

    const handleEditClick = (uniform: Uniform) => {
        setEditingUniform(uniform);
        setSelectedSizes(uniform.sizes ? uniform.sizes.split(',').map(s => s.trim()) : []);
        setIsModalOpen(true);
    };

    const handleSizeToggle = (size: string) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter(s => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        // Ensure sizes are passed explicitly
        formData.set('sizes', selectedSizes.join(', '));

        let res;
        if (editingUniform) {
            res = await updateUniform(editingUniform.id, formData);
        } else {
            res = await createUniform(formData);
        }

        if (res.success) {
            window.location.reload();
        } else {
            alert(res.error);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this uniform?')) return;

        const res = await deleteUniform(id);
        if (res.success) {
            setUniforms(uniforms.filter(u => u.id !== id));
        } else {
            alert(res.error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Uniform Collection</h2>
                    <p className="text-zinc-500 mt-1">Manage official HSGA state uniforms.</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                >
                    <Plus size={18} />
                    Add Uniform
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uniforms.length === 0 ? (
                    <div className="col-span-full py-24 text-center bg-zinc-50 rounded-[2.5rem] border border-dashed border-zinc-200">
                        <Tag size={48} className="mx-auto text-zinc-300 mb-4" />
                        <p className="text-zinc-500 font-medium">No uniforms in the catalog yet.</p>
                    </div>
                ) : (
                    uniforms.map((uniform) => (
                        <div key={uniform.id} className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                            <div className="aspect-square bg-zinc-50 relative overflow-hidden">
                                {uniform.image ? (
                                    <img
                                        src={uniform.image}
                                        alt={uniform.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                        <ImageIcon size={64} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <button
                                        onClick={() => handleEditClick(uniform)}
                                        className="p-2 bg-white/90 backdrop-blur rounded-xl text-zinc-900 shadow-lg hover:bg-white transition-colors"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(uniform.id)}
                                        className="p-2 bg-white/90 backdrop-blur rounded-xl text-red-500 shadow-lg hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                        {uniform.type || 'Standard Uniform'}
                                    </span>
                                    {!uniform.inStock && (
                                        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900 truncate">{uniform.name}</h3>
                                    <p className="text-2xl font-black text-zinc-900 mt-1">₹{uniform.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
                        <div className="p-6 md:p-8 border-b border-zinc-50 flex items-center justify-between shrink-0">
                            <h3 className="text-xl font-bold text-zinc-900">
                                {editingUniform ? 'Edit Uniform' : 'Add New Uniform'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors text-zinc-400">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="overflow-y-auto w-full">
                            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Uniform Name</label>
                                        <div className="relative">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                            <input
                                                name="name"
                                                defaultValue={editingUniform?.name}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                                placeholder="e.g. Scouter Summer Uniform"
                                            />
                                        </div>
                                    </div>
                                    {/* Price */}
                                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                            <input
                                                name="price"
                                                type="number"
                                                defaultValue={editingUniform?.price}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                                placeholder="1500"
                                            />
                                        </div>
                                    </div>
                                    {/* Type */}
                                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Uniform Type</label>
                                        <div className="relative">
                                            <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                            <input
                                                name="type"
                                                defaultValue={editingUniform?.type || ''}
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                                placeholder="e.g. Rover / Ranger"
                                            />
                                        </div>
                                    </div>
                                    {/* Image URL */}
                                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Image URL</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                            <input
                                                name="image"
                                                defaultValue={editingUniform?.image || ''}
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                                placeholder="https://.../uniform.png"
                                            />
                                        </div>
                                    </div>

                                    {/* Description (Short) */}
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Short Description</label>
                                        <div className="relative">
                                            <Text className="absolute left-4 top-4 text-zinc-400" size={16} />
                                            <textarea
                                                name="description"
                                                defaultValue={editingUniform?.description || ''}
                                                rows={2}
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none resize-none"
                                                placeholder="Brief overview shown on catalog card..."
                                            />
                                        </div>
                                    </div>

                                    {/* Detailed Description */}
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Detailed Description</label>
                                        <textarea
                                            name="detailedDescription"
                                            defaultValue={editingUniform?.detailedDescription || ''}
                                            rows={4}
                                            className="w-full p-4 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none resize-none"
                                            placeholder="Full detailed specifications, fabric, care instructions..."
                                        />
                                    </div>

                                    {/* Content (What it has) */}
                                    <div className="space-y-1.5 col-span-2">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Contents Included</label>
                                        <div className="relative">
                                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                            <input
                                                name="content"
                                                defaultValue={editingUniform?.content || ''}
                                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                                placeholder="e.g. Shirt, Trousers, Belt, Lanyard"
                                            />
                                        </div>
                                    </div>

                                    {/* Sizes */}
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                            <Ruler size={14} /> Available Sizes
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {sizeOptions.map(size => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => handleSizeToggle(size)}
                                                    className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all ${selectedSizes.includes(size)
                                                            ? 'bg-zinc-900 border-zinc-900 text-white'
                                                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-400'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="col-span-2 flex items-center gap-2 mt-2">
                                        <input
                                            type="checkbox"
                                            name="inStock"
                                            id="inStock"
                                            value="true"
                                            defaultChecked={editingUniform ? editingUniform.inStock : true}
                                            className="w-4 h-4 rounded border-zinc-200 text-zinc-900 focus:ring-zinc-900"
                                        />
                                        <label htmlFor="inStock" className="text-sm font-medium text-zinc-600">Product is in stock</label>
                                    </div>
                                </div>
                                <div className="pt-4 sticky bottom-0 bg-white border-t border-zinc-50 mt-4 py-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 shadow-xl shadow-black/10"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : (editingUniform ? 'Save Changes' : 'Publish Uniform')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UniformManager;
