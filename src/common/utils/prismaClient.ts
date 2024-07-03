import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export default prisma;

// export * from '@prisma/client';

// let globalForPrisma = globalThis as unknown as { prisma: PrismaClient};

// export const prisma = globalForPrisma.prisma || new PrismaClient({
//     log:
//         process.env.NODE_ENV === 'development'
//             ? ['query', 'error', 'warn']
//             : ['error'],
// });

// if (process.env.NODE_ENV !== 'production') globalForPrisma = prisma;