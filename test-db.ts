import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = "postgresql://postgres.pibkavptxptklluibzob:I4f0Xb9KzE2I4HkR@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function check() {
    const products = await (prisma as any).product.findMany();
    console.log("PRODUCTS:", products);
}

check();
