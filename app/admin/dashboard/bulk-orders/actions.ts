'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBulkOrderStatus(id: string, status: string) {
    if (!id || !status) {
        return { success: false, error: 'ID and status are required.' };
    }

    try {
        await prisma.bulkOrder.update({
            where: { id },
            data: { status }
        });

        revalidatePath('/admin/dashboard/bulk-orders');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Failed to update order status:', error);
        return { success: false, error: 'Failed to update status.' };
    }
}
