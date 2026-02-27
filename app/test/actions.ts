'use server';

import prisma from '@/lib/prisma';

export async function createUser(email: string, name: string | null) {
    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message || 'Unknown error' };
    }
}
