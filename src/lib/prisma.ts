import { PrismaClient } from '@prisma/client';

// PrismaClient es adjuntado al objeto global de Node.js en desarrollo para prevenir
// demasiadas instancias del cliente Prisma en desarrollo

declare global {
  // Allow PrismaClient to be added to the global object
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// Extend Prisma models with additional types
export type UserWithPassword = {
  password?: string | null;
}; 