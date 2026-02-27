import prisma from "@/lib/prisma";
import React from "react";
import ProductManager from "./ProductManager";

export default async function AdminProductsPage() {
    let products: any[] = [];
    try {
        products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        console.error("Failed to fetch products", e);
    }

    return (
        <div className="animate-in fade-in duration-700">
            <ProductManager initialProducts={products} />
        </div>
    );
}
