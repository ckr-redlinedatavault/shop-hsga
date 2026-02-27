'use client';

import React, { useState } from 'react';
import {
    Plus,
    Pencil,
    Trash2,
    X,
    Loader2,
    Package,
    Image as ImageIcon,
    Tag,
    IndianRupee
} from 'lucide-react';
import { createProduct, updateProduct, deleteProduct } from './actions';

interface Product {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    category: string;
    inStock: boolean;
}

const ProductManager = ({ initialProducts }: { initialProducts: Product[] }) => {
    const [products, setProducts] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        let res;
        if (editingProduct) {
            res = await updateProduct(editingProduct.id, formData);
        } else {
            res = await createProduct(formData);
        }

        if (res.success) {
            window.location.reload(); // Simplest way to refresh the RSC data
        } else {
            alert(res.error);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const res = await deleteProduct(id);
        if (res.success) {
            setProducts(products.filter(p => p.id !== id));
        } else {
            alert(res.error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Store Catalog</h2>
                    <p className="text-zinc-500 mt-1">Manage your official merchandise and supplies.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10"
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <div className="col-span-full py-24 text-center bg-zinc-50 rounded-[2.5rem] border border-dashed border-zinc-200">
                        <Package size={48} className="mx-auto text-zinc-300 mb-4" />
                        <p className="text-zinc-500 font-medium">No products in the catalog yet.</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                            <div className="aspect-square bg-zinc-50 relative overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                        <ImageIcon size={64} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <button
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setIsModalOpen(true);
                                        }}
                                        className="p-2 bg-white/90 backdrop-blur rounded-xl text-zinc-900 shadow-lg hover:bg-white transition-colors"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 bg-white/90 backdrop-blur rounded-xl text-red-500 shadow-lg hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                                        {product.category}
                                    </span>
                                    {!product.inStock && (
                                        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900 truncate">{product.name}</h3>
                                    <p className="text-2xl font-black text-zinc-900 mt-1">₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-zinc-900">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors text-zinc-400">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Product Name</label>
                                    <div className="relative">
                                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                        <input
                                            name="name"
                                            defaultValue={editingProduct?.name}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                            placeholder="Official HSGA Uniform"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                        <input
                                            name="price"
                                            type="number"
                                            defaultValue={editingProduct?.price}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                            placeholder="1200"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Category</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                        <select
                                            name="category"
                                            defaultValue={editingProduct?.category}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none appearance-none"
                                        >
                                            <option value="Uniform">Uniform</option>
                                            <option value="Badges">Badges</option>
                                            <option value="Accessories">Accessories</option>
                                            <option value="Footwear">Footwear</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                        <input
                                            name="image"
                                            defaultValue={editingProduct?.image || ''}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none"
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 col-span-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Description</label>
                                    <textarea
                                        name="description"
                                        defaultValue={editingProduct?.description || ''}
                                        rows={3}
                                        className="w-full p-4 bg-zinc-50 border border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-zinc-100 transition-all outline-none resize-none"
                                        placeholder="Product details and specifications..."
                                    />
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="inStock"
                                        id="inStock"
                                        value="true"
                                        defaultChecked={editingProduct ? editingProduct.inStock : true}
                                        className="w-4 h-4 rounded border-zinc-200 text-zinc-900 focus:ring-zinc-900"
                                    />
                                    <label htmlFor="inStock" className="text-sm font-medium text-zinc-600">Product is in stock</label>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 shadow-xl shadow-black/10"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : (editingProduct ? 'Save Changes' : 'Create Product')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManager;
