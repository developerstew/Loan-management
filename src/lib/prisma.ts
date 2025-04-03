import { PrismaClient } from '@prisma/client';
import { log } from './logger';

function validateDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  try {
    new URL(url);
  } catch (e) {
    throw new Error(
      `Invalid DATABASE_URL: ${e instanceof Error ? e.message : 'Unknown error'}`,
    );
  }
  return url;
}

const prismaClientSingleton = () => {
  try {
    const dbUrl = validateDatabaseUrl();
    log.info('Initializing Prisma Client', {
      nodeEnv: process.env.NODE_ENV,
      dbUrlLength: dbUrl.length,
      dbUrlProtocol: new URL(dbUrl).protocol,
      hasDirectUrl: !!process.env.DIRECT_URL,
    });

    const client = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'pretty',
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    // Test the connection
    client
      .$connect()
      .then(() => log.info('Successfully connected to database'))
      .catch((error) => log.error('Failed to connect to database', error));

    return client;
  } catch (error) {
    log.error('Failed to initialize Prisma Client', error);
    throw error;
  }
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export { prisma };
