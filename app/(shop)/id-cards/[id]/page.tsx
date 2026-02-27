import prisma from '@/lib/prisma';
import IdCardBulkOrderClient from './IdCardClient';
import { notFound } from 'next/navigation';

export default async function IdCardPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    let template;
    try {
        template = await (prisma as any).product.findUnique({
            where: { id: params.id }
        });
    } catch (error) {
        console.error("Failed to fetch ID Card template:", error);
    }

    if (!template || template.category !== "ID Card") {
        notFound();
    }

    return <IdCardBulkOrderClient template={template} />;
}
