import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import UniformDetailsClient from './UniformDetailsClient';

export default async function UniformPage({ params }: { params: any }) {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;

    let uniform;
    try {
        uniform = await (prisma as any).product.findUnique({
            where: { id: id }
        });
    } catch (e) {
        console.error("Failed to fetch uniform", e);
    }

    if (!uniform || uniform.category !== 'Uniform') {
        notFound();
    }

    return <UniformDetailsClient uniform={uniform} />;
}
