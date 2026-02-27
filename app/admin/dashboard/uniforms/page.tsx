import prisma from "@/lib/prisma";
import React from "react";
import UniformManager from "./UniformManager";

export default async function AdminUniformsPage() {
    let uniforms: any[] = [];
    try {
        uniforms = await (prisma as any).product.findMany({
            where: { category: "Uniform" },
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        console.error("Failed to fetch uniforms", e);
    }

    return (
        <div className="animate-in fade-in duration-700">
            <UniformManager initialUniforms={uniforms} />
        </div>
    );
}
