import { PrismaClient } from '@prisma/client';

// const prisma = () => {
//     return new PrismaClient();
// };

// declare const globalThis: {
//     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// 他の設定例：
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();
