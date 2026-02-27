'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitBulkOrder(formData: FormData) {
    const institutionId = formData.get('institutionId') as string;
    const institutionName = formData.get('institutionName') as string;
    const category = formData.get('category') as string;
    const contactPerson = formData.get('contactPerson') as string;
    const phone = formData.get('phone') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 0;
    const studentDetailsFile = formData.get('studentDetails') as File;
    const fileUrl = studentDetailsFile?.name || null;

    // Generate a unique tracking ID: BO-XXXXXX
    const trackingId = `BO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
        const order = await prisma.bulkOrder.create({
            data: {
                trackingId,
                institutionId,
                institutionName,
                category,
                contactPerson,
                phone,
                quantity,
                fileUrl, // Save file name as mock URL
                status: 'PENDING',
            }
        });

        revalidatePath('/admin/dashboard');
        return { success: true, trackingId: order.trackingId };
    } catch (error) {
        console.error('Failed to submit bulk order:', error);
        return { success: false, error: 'Database error. Please try again later.' };
    }
}
