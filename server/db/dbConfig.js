import { PrismaClient } from "@prisma/client";

const connectPrisma = new PrismaClient({
    log: ["query","error"],
});

export default connectPrisma;