'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string | null;
    };
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full py-4 bg-black text-white rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98] transition-all font-bold text-xs shadow-xl shadow-black/10 mt-4"
        >
            <ShoppingBag size={16} strokeWidth={2.5} />
            <span>Add to Bag</span>
        </button>
    );
};

export default AddToCartButton;
