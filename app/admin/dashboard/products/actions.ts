'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = formData.get('image') as string; // Taking URL for now
    const inStock = formData.get('inStock') === 'true';

    try {
        await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                image,
                inStock
            }
        });
        revalidatePath('/admin/dashboard/products');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to create product:', error);
        return { success: false, error: 'Failed to create product.' };
    }
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = formData.get('image') as string;
    const inStock = formData.get('inStock') === 'true';

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                category,
                image,
                inStock
            }
        });
        revalidatePath('/admin/dashboard/products');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to update product:', error);
        return { success: false, error: 'Failed to update product.' };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });
        revalidatePath('/admin/dashboard/products');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete product:', error);
        return { success: false, error: 'Failed to delete product.' };
    }
}
