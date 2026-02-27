'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

function generateTrackingId() {
    return 'HSGI-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Date.now().toString().slice(-4);
}

export async function submitIdCardOrder(data: any) {
    try {
        const trackingId = generateTrackingId();

        await (prisma as any).idCardOrder.create({
            data: {
                trackingId,
                templateId: data.templateId,
                templateName: data.templateName,
                institutionName: data.institutionName,
                contactPerson: data.contactPerson,
                phone: data.phone,
                email: data.email,
                quantity: data.quantity,
                fileUrl: data.fileUrl,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
            }
        });

        revalidatePath('/admin/dashboard');
        revalidatePath('/track-order');

        return { success: true, trackingId };
    } catch (e: any) {
        console.error("ID Card Order compilation failed:", e);
        return { success: false, error: e.message || 'Failed to submit order' };
    }
}
