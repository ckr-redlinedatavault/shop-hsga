'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUniform(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const detailedDescription = formData.get('detailedDescription') as string | null;
    const price = parseFloat(formData.get('price') as string);
    const category = "Uniform";
    const type = formData.get('type') as string | null;
    const image = formData.get('image') as string;
    const content = formData.get('content') as string | null;
    const sizes = formData.get('sizes') as string | null;
    const inStock = formData.get('inStock') === 'true';

    try {
        await (prisma as any).product.create({
            data: {
                name,
                description,
                detailedDescription,
                price,
                category,
                type,
                image,
                content,
                sizes,
                inStock
            }
        });
        revalidatePath('/admin/dashboard/uniforms');
        revalidatePath('/uniforms');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to create uniform:', error);
        return { success: false, error: 'Failed to create uniform.' };
    }
}

export async function updateUniform(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const detailedDescription = formData.get('detailedDescription') as string | null;
    const price = parseFloat(formData.get('price') as string);
    const type = formData.get('type') as string | null;
    const image = formData.get('image') as string;
    const content = formData.get('content') as string | null;
    const sizes = formData.get('sizes') as string | null;
    const inStock = formData.get('inStock') === 'true';

    try {
        await (prisma as any).product.update({
            where: { id },
            data: {
                name,
                description,
                detailedDescription,
                price,
                type,
                image,
                content,
                sizes,
                inStock
            }
        });
        revalidatePath('/admin/dashboard/uniforms');
        revalidatePath('/uniforms');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to update uniform:', error);
        return { success: false, error: 'Failed to update uniform.' };
    }
}

export async function deleteUniform(id: string) {
    try {
        await (prisma as any).product.delete({
            where: { id }
        });
        revalidatePath('/admin/dashboard/uniforms');
        revalidatePath('/uniforms');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete uniform:', error);
        return { success: false, error: 'Failed to delete uniform.' };
    }
}
