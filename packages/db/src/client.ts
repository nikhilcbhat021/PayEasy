import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// export const prismaClient: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()
export const prismaClient = new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prismaClient