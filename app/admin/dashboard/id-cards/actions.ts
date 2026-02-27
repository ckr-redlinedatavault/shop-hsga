'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getIdCardOrders() {
    try {
        const orders = await (prisma as any).idCardOrder.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { success: true, orders };
    } catch (error) {
        console.error('Failed to fetch ID card orders:', error);
        return { success: false, error: 'Failed to fetch orders' };
    }
}

export async function updateIdCardOrderStatus(orderId: string, newStatus: string) {
    try {
        await (prisma as any).idCardOrder.update({
            where: { id: orderId },
            data: { status: newStatus },
        });

        revalidatePath('/admin/dashboard/id-cards');
        revalidatePath('/track-order');
        return { success: true };
    } catch (error) {
        console.error('Failed to update ID Card order status:', error);
        return { success: false, error: 'Failed to update status' };
    }
}

export async function createIdCardTemplate(data: {
    name: string;
    description: string;
    price: number;
    image: string;
    type: string;
}) {
    try {
        await (prisma as any).product.create({
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price as any),
                image: data.image,
                category: 'ID Card',
                type: data.type,
                inStock: true,
            }
        });
        revalidatePath('/admin/dashboard/id-cards');
        revalidatePath('/id-cards');
        return { success: true };
    } catch (error) {
        console.error('Failed to create ID Card template:', error);
        return { success: false, error: 'Failed to create template' };
    }
}
