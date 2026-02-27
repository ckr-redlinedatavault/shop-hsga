'use server';

import prisma from "@/lib/prisma";

export async function getBulkOrderStatus(trackingId: string) {
    if (!trackingId) {
        return { success: false, error: 'Tracking ID is required.' };
    }

    try {
        let order = await (prisma as any).bulkOrder.findUnique({
            where: { trackingId }
        });

        if (!order) {
            order = await (prisma as any).idCardOrder.findUnique({
                where: { trackingId }
            });
        }

        if (!order) {
            return { success: false, error: 'No order found with this tracking ID.' };
        }

        return { success: true, order };
    } catch (error) {
        console.error('Failed to fetch order status:', error);
        return { success: false, error: 'Database error. Please try again later.' };
    }
}
